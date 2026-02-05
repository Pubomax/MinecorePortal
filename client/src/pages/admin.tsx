import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useState } from "react";
import { KanbanBoard } from "@/components/kanban-board";
import { CreateLeadDialog } from "@/components/create-lead-dialog";
import { LeadDetailsDialog } from "@/components/lead-details-dialog";
import { GoogleAdsView } from "@/components/google-ads-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Consultation, ChatbotLead } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import CRMLayout from "@/components/crm-layout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import {
  Users, DollarSign, TrendingUp, Filter, MessageSquare,
  MapPin, Target, Clock, AlertCircle, Plus, Search, Mail, Phone,
  ArrowUpRight, Calendar, Briefcase
} from "lucide-react";

const PIPELINE_STAGES = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1'];

export default function Admin() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [location] = useLocation();

  const { data: rawConsultations, isLoading: isConsultationsLoading } = useQuery<Consultation[]>({
    queryKey: ["/api/consultations"],
    queryFn: async () => {
      const response = await fetch("/api/consultations");
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    },
  });

  const { data: rawChatbotLeads, isLoading: isChatbotLoading } = useQuery<ChatbotLead[]>({
    queryKey: ["/api/chatbot/leads"],
    queryFn: async () => {
      const response = await fetch("/api/chatbot/leads");
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    },
  });

  const updateLeadMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Consultation> }) => {
      const response = await apiRequest("PUT", `/api/consultations/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/consultations"] });
      toast({ title: "Mis à jour", description: "Le lead a été mis à jour avec succès." });
    },
  });

  const consultations = rawConsultations || [];
  const chatbotLeads = rawChatbotLeads || [];
  const isLoading = isConsultationsLoading || isChatbotLoading;

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Clock className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <div className="text-xl font-medium">Chargement du CRM...</div>
        </div>
      </div>
    );
  }

  // Dashboard calculations
  const totalLeads = consultations.length + chatbotLeads.length;
  const expectedRevenue = consultations.reduce((acc, c) => acc + (c.expectedRevenue || 0), 0);
  const actualRevenue = consultations.reduce((acc, c) => acc + (c.actualRevenue || 0), 0);

  const revenueData = PIPELINE_STAGES.map(status => ({
    name: status,
    revenue: consultations
      .filter(c => c.status === status)
      .reduce((acc, c) => acc + (c.expectedRevenue || 0), 0)
  }));

  const regionData = Array.from(new Set(consultations.map(c => c.region || "Inconnu")))
    .map(region => ({
      name: region,
      value: consultations.filter(c => c.region === region).length
    }));

  // Route Rendering Logic
  const renderContent = () => {
    switch (location) {
      case "/admin/leads":
        return <LeadsView leads={consultations} updateLead={updateLeadMutation.mutate} />;
      case "/admin/chatbot":
        return <ChatbotView leads={chatbotLeads} />;
      case "/admin/google-ads":
        return <GoogleAdsView />;
      case "/admin/revenue":
        return <RevenueView leads={consultations} />;
      case "/admin/settings":
        return <SettingsView />;
      case "/admin/clients":
        return <LeadsView leads={consultations.filter(c => c.status === "Won")} updateLead={updateLeadMutation.mutate} title="Base Clients" />;
      default:
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 leading-tight">Tableau de Bord</h2>
                <p className="text-slate-500">Aperçu de la performance commerciale</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="h-11">Exporter Rapport</Button>
                <CreateLeadDialog />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Leads"
                value={totalLeads}
                subValue="+12% vs mois dernier"
                icon={Users}
                color="blue"
              />
              <StatCard
                title="Tunnel de Vente"
                value={`${consultations.filter(c => c.status !== "Lost" && c.status !== "Won").length} Actifs`}
                subValue="6 étapes configurées"
                icon={Target}
                color="orange"
              />
              <StatCard
                title="Valeur Pipeline"
                value={`${expectedRevenue.toLocaleString()}$`}
                subValue="Revenu potentiel estimé"
                icon={DollarSign}
                color="green"
              />
              <StatCard
                title="Chiffre d'Affaire"
                value={`${actualRevenue.toLocaleString()}$`}
                subValue="Facturation réglée"
                icon={TrendingUp}
                color="purple"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Valeur par Étape</CardTitle>
                  <CardDescription>Répartition du revenu potentiel</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={(val) => `${val}$`} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Leads par Région</CardTitle>
                  <CardDescription>Couverture géographique</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Leads */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">Dernières Demandes</CardTitle>
                  <CardDescription>Les 5 interactions les plus récentes</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/admin/leads")}>
                  Voir tout
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultations.slice(0, 5).map(lead => (
                    <div key={lead.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{lead.name}</div>
                          <div className="text-sm text-slate-500">{lead.company}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden md:block">
                          <div className="text-sm font-semibold text-slate-900">{lead.expectedRevenue?.toLocaleString()}$</div>
                          <div className="text-xs text-slate-500">{lead.region}</div>
                        </div>
                        <Badge variant="secondary" className="px-3 py-1">{lead.status}</Badge>
                        <Button size="icon" variant="ghost" className="rounded-full">
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return <CRMLayout>{renderContent()}</CRMLayout>;
}

function StatCard({ title, value, subValue, icon: Icon, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-3 rounded-xl", colors[color])}>
            <Icon className="w-6 h-6" />
          </div>
          <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider opacity-70">
            Mensuel
          </Badge>
        </div>
        <div className="text-3xl font-extrabold text-slate-900">{value}</div>
        <div className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-tighter">{title}</div>
        <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-green-500" />
          {subValue}
        </p>
      </CardContent>
    </Card>
  );
}

function LeadsView({ leads, updateLead, title = "Gestion des Leads" }: any) {
  const { toast } = useToast();
  const [selectedLead, setSelectedLead] = useState<Consultation | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
          <p className="text-slate-500">Pipeline de vente et prospection</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input className="pl-10 h-10 border-slate-200" placeholder="Rechercher un lead..." />
          </div>
          <CreateLeadDialog />
        </div>
      </div>

      <div className="flex-1 overflow-x-auto min-h-0">
        <KanbanBoard
          leads={leads}
          updateLeadStatus={(id, status) => {
            updateLead({ id, updates: { status } });
            toast({ title: "Pipeline mis à jour", description: `Lead déplacé vers ${status}` });
          }}
          onLeadClick={(lead) => {
            setSelectedLead(lead);
            setDetailsOpen(true);
          }}
        />
      </div>

      <LeadDetailsDialog
        lead={selectedLead}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}

function ChatbotView({ leads }: { leads: ChatbotLead[] }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/chatbot/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true }),
      });
      if (!response.ok) throw new Error("Failed to delete");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chatbot/leads"] });
      toast({
        title: "Supprimé",
        description: "Tous les leads chatbot ont été supprimés.",
      });
      setShowDeleteDialog(false);
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer les leads.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Leads Chatbot</h2>
          <p className="text-slate-500">Prospects capturés par l'IA en temps réel</p>
        </div>
        {leads.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            className="h-11"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Supprimer tout ({leads.length})
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <Card key={lead.id} className="shadow-sm border-slate-200 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <Badge variant="secondary" className="font-bold">Score: {lead.leadScore || "N/A"}</Badge>
              </div>
              <CardTitle className="mt-4">{lead.name || "Visiteur Anonyme"}</CardTitle>
              <CardDescription>{lead.email || "Aucun email capturé"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" /> {new Date(lead.createdAt).toLocaleDateString()}
                </div>
                <Button variant="outline" className="w-full mt-4 h-10 border-slate-200">
                  Voir conversation
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {leads.length === 0 && (
          <Card className="col-span-full py-20 border-dashed">
            <CardContent className="text-center text-slate-400">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="font-medium font-display text-xl">Aucune interaction chatbot encore</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                Confirmer la suppression
              </CardTitle>
              <CardDescription>
                Êtes-vous sûr de vouloir supprimer tous les {leads.length} leads chatbot ?
                Cette action est irréversible.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                disabled={deleteMutation.isPending}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Suppression..." : "Supprimer tout"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function RevenueView({ leads }: { leads: Consultation[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Analyse des Revenus</h2>
        <p className="text-slate-500">Suivi financier et performance par projet</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Détail des montants</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-bold text-slate-900">Client / Projet</th>
                <th className="pb-4 font-bold text-slate-900">Statut</th>
                <th className="pb-4 font-bold text-slate-900">Attendu</th>
                <th className="pb-4 font-bold text-slate-900">Réel</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="border-b border-slate-50 group hover:bg-slate-50/50 transition-colors">
                  <td className="py-4">
                    <div className="font-bold text-slate-900">{lead.name}</div>
                    <div className="text-xs text-slate-500">{lead.serviceType}</div>
                  </td>
                  <td className="py-4">
                    <Badge variant="outline">{lead.status}</Badge>
                  </td>
                  <td className="py-4 font-bold text-slate-900">{lead.expectedRevenue?.toLocaleString()}$</td>
                  <td className="py-4 font-bold text-green-600">{lead.actualRevenue?.toLocaleString()}$</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Paramètres CRM</h2>
        <p className="text-slate-500">Configuration du système et des intégrations</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Intégration Webhooks (n8n)</CardTitle>
            <CardDescription>Configurez vos déclencheurs d'automatisation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold">Base URL n8n</label>
              <Input placeholder="https://n8n.minecore.group" defaultValue="https://n8n.groupminecore.com" />
            </div>
            <Button>Enregistrer</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Équipe & Accès</CardTitle>
            <CardDescription>Gérer les utilisateurs du CRM</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-500 text-sm italic">Accès restreint à l'administrateur principal.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}