import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertConsultationSchema, type InsertConsultation } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DEMO_DEFAULTS = {
    jobTitle: "Contact",
    companySize: "Unknown",
    industry: "Unknown",
    revenue: "Unknown",
    growth: "Unknown",
    currentTools: "Unknown",
    teamSize: "Unknown",
    biggestChallenge: "Unknown",
    timeSpentManualTasks: "Unknown",
    automationGoals: "Unknown",
    budget: "Unknown",
    timeline: "Unknown",
    decisionMaker: "Unknown",
    previousAutomation: "Unknown",
    urgency: "Normal",
    source: "Manual Entry"
};

export function CreateLeadDialog({ className }: { className?: string }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const form = useForm<InsertConsultation>({
        resolver: zodResolver(insertConsultationSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            status: "New",
            expectedRevenue: 0,
            serviceType: "CRM",
            region: "Montreal",
            ...DEMO_DEFAULTS
        }
    });

    const mutation = useMutation({
        mutationFn: async (data: InsertConsultation) => {
            const res = await apiRequest("POST", "/api/consultations", data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/consultations"] });
            toast({ title: "Succès", description: "Le lead a été créé avec succès." });
            setOpen(false);
            form.reset();
        },
        onError: (error) => {
            toast({
                title: "Erreur",
                description: "Impossible de créer le lead. Vérifiez les champs.",
                variant: "destructive"
            });
        }
    });

    function onSubmit(data: InsertConsultation) {
        mutation.mutate(data);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={cn("h-10 bg-primary", className)}><Plus className="w-4 h-4 mr-2" /> Créer</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Nouveau Lead</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom complet</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Jean Dupont" {...field} />
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
                                        <Input placeholder="jean@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Entreprise</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Acme Inc." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="expectedRevenue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valeur Estimée ($)</FormLabel>
                                        <FormControl>
                                            <Input type="number"
                                                {...field}
                                                value={field.value ?? ''}
                                                onChange={e => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Statut</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selectionner" />
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
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="serviceType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Service</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value || "CRM"}>
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value || "Montreal"}>
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

                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? "Création..." : "Créer le Lead"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
