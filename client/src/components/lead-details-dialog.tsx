import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertConsultationSchema, type Consultation } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

interface LeadDetailsDialogProps {
    lead: Consultation | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function LeadDetailsDialog({ lead, open, onOpenChange }: LeadDetailsDialogProps) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<Consultation>({
        resolver: zodResolver(insertConsultationSchema),
        defaultValues: lead || {},
    });

    // Update form when lead changes
    useEffect(() => {
        if (lead) {
            form.reset(lead);
        }
    }, [lead, form]);

    const mutation = useMutation({
        mutationFn: async (data: Partial<Consultation>) => {
            // Remove createdAt/updatedAt/id from payload if present (though insertSchema cleans most)
            const res = await apiRequest("PUT", `/api/consultations/${lead?.id}`, data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/consultations"] });
            toast({ title: "Succès", description: "Le lead a été mis à jour." });
            setIsEditing(false);
            onOpenChange(false);
        },
        onError: (error) => {
            toast({
                title: "Erreur",
                description: "Impossible de mettre à jour le lead.",
                variant: "destructive"
            });
        }
    });

    function onSubmit(data: Consultation) {
        mutation.mutate(data);
    }

    if (!lead) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex justify-between items-center pr-8">
                        <span>{isEditing ? "Modifier le Lead" : lead.name}</span>
                        <div className="flex gap-2">
                            {!isEditing && (
                                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                    Modifier
                                </Button>
                            )}
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Informations Générales</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom</FormLabel>
                                            <FormControl>
                                                <Input disabled={!isEditing} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input disabled={!isEditing} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Entreprise</FormLabel>
                                            <FormControl>
                                                <Input disabled={!isEditing} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="jobTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Poste</FormLabel>
                                            <FormControl>
                                                <Input disabled={!isEditing} {...field} value={field.value || ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Opportunité</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Statut</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                disabled={!isEditing}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Sélectionner" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"].map(s => (
                                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="expectedRevenue"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Valeur Estimée ($)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    disabled={!isEditing}
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    onChange={e => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="serviceType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Service</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value || "CRM"}
                                                disabled={!isEditing}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {["CRM", "Chatbot", "Voicebot", "Automations"].map(s => (
                                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="region"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Région</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value || "Montreal"}
                                                disabled={!isEditing}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Region" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {["Montreal", "Laval", "Quebec", "International"].map(s => (
                                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>Annuler</Button>
                                <Button type="submit" disabled={mutation.isPending}>
                                    {mutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
                                </Button>
                            </div>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
