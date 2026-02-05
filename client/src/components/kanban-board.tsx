import { useState, useMemo } from "react";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    defaultDropAnimationSideEffects,
    DropAnimation
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Consultation } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { DollarSign, MoreHorizontal, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KanbanBoardProps {
    leads: Consultation[];
    updateLeadStatus: (id: number, status: string) => void;
    onLeadClick?: (lead: Consultation) => void;
}

const PIPELINE_STAGES = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];

export function KanbanBoard({ leads, updateLeadStatus, onLeadClick }: KanbanBoardProps) {
    const [activeId, setActiveId] = useState<number | null>(null);

    // Group leads by status
    const columns = useMemo(() => {
        const cols: Record<string, Consultation[]> = {};
        PIPELINE_STAGES.forEach(stage => {
            cols[stage] = leads.filter(lead => lead.status === stage);
        });
        return cols;
    }, [leads]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Avoid accidental drags
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const onDragStart = (event: DragStartEvent) => {
        if (event.active.id) {
            setActiveId(event.active.id as number);
        }
    };

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const activeId = active.id as number;
        const overId = over?.id;

        if (!overId) {
            setActiveId(null);
            return;
        }

        // Find the lead being dragged
        const lead = leads.find(l => l.id === activeId);
        if (!lead) return;

        // Determine the new status
        let newStatus = lead.status;

        // Check if dropped on a column container
        if (PIPELINE_STAGES.includes(overId as string)) {
            newStatus = overId as string;
        }
        // Check if dropped on another card
        else {
            const overLead = leads.find(l => l.id === overId);
            if (overLead) {
                newStatus = overLead.status;
            }
        }

        if (lead.status !== newStatus) {
            updateLeadStatus(lead.id, newStatus);
        }

        setActiveId(null);
    };

    const dropAnimation: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    const activeLead = activeId ? leads.find(l => l.id === activeId) : null;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <div className="flex h-full gap-4 overflow-x-auto pb-4">
                {PIPELINE_STAGES.map((stage) => (
                    <KanbanColumn
                        key={stage}
                        id={stage}
                        title={stage}
                        count={columns[stage]?.length || 0}
                        leads={columns[stage] || []}
                        totalValue={columns[stage]?.reduce((sum, l) => sum + (l.expectedRevenue || 0), 0) || 0}
                        onLeadClick={onLeadClick}
                    />
                ))}
            </div>

            <DragOverlay dropAnimation={dropAnimation}>
                {activeLead ? <KanbanCard lead={activeLead} isOverlay /> : null}
            </DragOverlay>
        </DndContext>
    );
}

interface KanbanColumnProps {
    id: string;
    title: string;
    count: number;
    leads: Consultation[];
    totalValue: number;
    onLeadClick?: (lead: Consultation) => void;
}

function KanbanColumn({ id, title, count, leads, totalValue, onLeadClick }: KanbanColumnProps) {
    const { setNodeRef } = useSortable({
        id: id,
        data: {
            type: "Column",
        },
        disabled: true, // The column itself isn't draggable, just a drop target
    });

    return (
        <div
            ref={setNodeRef}
            className="flex h-full min-w-[300px] flex-col rounded-xl bg-gray-100/50 border border-gray-200"
        >
            <div className="p-4 border-b border-gray-200 bg-white/50 rounded-t-xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-sm text-gray-700 uppercase tracking-wider">
                        {title}
                    </h3>
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700 font-bold px-2 py-0.5 min-w-[1.5rem] justify-center">
                        {count}
                    </Badge>
                </div>
                <div className="text-xs font-semibold text-gray-500">
                    Total: ${totalValue.toLocaleString()}
                </div>
            </div>

            <ScrollArea className="flex-1 p-3">
                <SortableContext items={leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
                    <div className="flex flex-col gap-3">
                        {leads.map((lead) => (
                            <KanbanCard key={lead.id} lead={lead} onClick={() => onLeadClick?.(lead)} />
                        ))}
                    </div>
                </SortableContext>
            </ScrollArea>
        </div>
    );
}

interface KanbanCardProps {
    lead: Consultation;
    isOverlay?: boolean;
    onClick?: () => void;
}

function KanbanCard({ lead, isOverlay, onClick }: KanbanCardProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: lead.id,
        data: {
            type: "Lead",
            lead,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-30 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg h-[140px]"
            />
        );
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={onClick}
            className={cn(
                "cursor-grab active:cursor-grabbing hover:shadow-md transition-all shadow-sm bg-white border-gray-200",
                isOverlay && "rotate-2 scale-105 shadow-xl cursor-grabbing ring-2 ring-primary ring-opacity-50 z-50",
                lead.status === "Won" && "border-l-4 border-l-green-500",
                lead.status === "Lost" && "border-l-4 border-l-red-500",
                lead.status === "New" && "border-l-4 border-l-blue-500"
            )}
        >
            <CardContent className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <Avatar className="h-8 w-8 bg-gray-100 border border-gray-200">
                            <AvatarFallback className="text-xs font-bold text-gray-700">
                                {lead.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col truncate">
                            <span className="text-sm font-bold text-gray-900 truncate">
                                {lead.name}
                            </span>
                            <span className="text-xs text-gray-500 truncate">
                                {lead.company}
                            </span>
                        </div>
                    </div>
                    {lead.leadScore && (
                        <Badge variant="outline" className={cn(
                            "text-[10px] h-5 px-1.5",
                            lead.leadScore.startsWith('A') ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50"
                        )}>
                            {lead.leadScore}
                        </Badge>
                    )}
                </div>

                {/* Content */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 p-1.5 rounded">
                        <DollarSign className="w-3 h-3 text-green-600" />
                        <span className="font-semibold">{lead.expectedRevenue?.toLocaleString() ?? 0}$</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 p-1.5 rounded">
                        <Calendar className="w-3 h-3 text-blue-600" />
                        <span>{new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    </div>
                </div>

                {/* Footer info (Source/Type) */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400 font-medium truncate max-w-[60%]">
                        {lead.source}
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-900">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
