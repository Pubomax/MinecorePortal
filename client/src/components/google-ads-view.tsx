import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
    TrendingUp, DollarSign, MousePointerClick, Eye,
    Plus, RefreshCw, BarChart3, Target, Zap
} from "lucide-react";

interface CampaignMetrics {
    campaignId: string;
    campaignName: string;
    status: string;
    impressions: number;
    clicks: number;
    cost: number;
    conversions: number;
    ctr: number;
    cpc: number;
    conversionRate: number;
}

interface CampaignBrief {
    clientName: string;
    objective: string;
    budget: number;
    targetAudience: {
        location: string[];
        ageRange?: string;
        interests?: string[];
        keywords?: string[];
    };
    industry: string;
    timeline?: string;
}

export function GoogleAdsView() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [brief, setBrief] = useState<Partial<CampaignBrief>>({
        targetAudience: { location: [] }
    });

    const { data: campaigns, isLoading } = useQuery<CampaignMetrics[]>({
        queryKey: ["/api/google-ads/campaigns"],
        queryFn: async () => {
            const response = await fetch("/api/google-ads/campaigns");
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to fetch campaigns");
            }
            return response.json();
        },
        retry: false,
    });

    const createCampaignMutation = useMutation({
        mutationFn: async (campaignBrief: CampaignBrief) => {
            const response = await fetch("/api/google-ads/campaigns", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(campaignBrief),
            });
            if (!response.ok) throw new Error("Failed to create campaign");
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/google-ads/campaigns"] });
            toast({
                title: "Campagne créée",
                description: "La campagne a été créée avec succès (en pause pour révision)",
            });
            setShowCreateForm(false);
            setBrief({ targetAudience: { location: [] } });
        },
        onError: (error: Error) => {
            toast({
                title: "Erreur",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const optimizeCampaignMutation = useMutation({
        mutationFn: async (campaignId: string) => {
            const response = await fetch(`/api/google-ads/campaigns/${campaignId}/optimize`, {
                method: "POST",
            });
            if (!response.ok) throw new Error("Failed to optimize campaign");
            return response.json();
        },
        onSuccess: () => {
            toast({
                title: "Optimisé",
                description: "La campagne a été optimisée avec succès",
            });
        },
    });

    const totalMetrics = campaigns?.reduce(
        (acc, campaign) => ({
            impressions: acc.impressions + campaign.impressions,
            clicks: acc.clicks + campaign.clicks,
            cost: acc.cost + campaign.cost,
            conversions: acc.conversions + campaign.conversions,
        }),
        { impressions: 0, clicks: 0, cost: 0, conversions: 0 }
    );

    const avgCTR = totalMetrics && totalMetrics.impressions > 0
        ? (totalMetrics.clicks / totalMetrics.impressions) * 100
        : 0;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <RefreshCw className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Google Ads</h2>
                    <p className="text-slate-500">Gestion automatisée de vos campagnes publicitaires</p>
                </div>
                <Button onClick={() => setShowCreateForm(!showCreateForm)} className="h-11">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle Campagne
                </Button>
            </div>

            {/* Create Campaign Form */}
            {showCreateForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Créer une Campagne</CardTitle>
                        <CardDescription>Brief client → Campagne automatique</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Nom du Client</Label>
                                <Input
                                    value={brief.clientName || ""}
                                    onChange={(e) => setBrief({ ...brief, clientName: e.target.value })}
                                    placeholder="ABC Corporation"
                                />
                            </div>
                            <div>
                                <Label>Industrie</Label>
                                <Input
                                    value={brief.industry || ""}
                                    onChange={(e) => setBrief({ ...brief, industry: e.target.value })}
                                    placeholder="Immobilier, Tech, Santé..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Objectif</Label>
                                <Input
                                    value={brief.objective || ""}
                                    onChange={(e) => setBrief({ ...brief, objective: e.target.value })}
                                    placeholder="leads, sales, traffic..."
                                />
                            </div>
                            <div>
                                <Label>Budget Mensuel ($)</Label>
                                <Input
                                    type="number"
                                    value={brief.budget || ""}
                                    onChange={(e) => setBrief({ ...brief, budget: parseFloat(e.target.value) })}
                                    placeholder="2000"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Localisation (séparées par virgule)</Label>
                            <Input
                                value={brief.targetAudience?.location.join(", ") || ""}
                                onChange={(e) => setBrief({
                                    ...brief,
                                    targetAudience: {
                                        ...brief.targetAudience,
                                        location: e.target.value.split(",").map(l => l.trim()).filter(Boolean),
                                        keywords: brief.targetAudience?.keywords || []
                                    }
                                })}
                                placeholder="Montréal, Québec, Laval"
                            />
                        </div>

                        <div>
                            <Label>Mots-clés (séparés par virgule)</Label>
                            <Textarea
                                value={brief.targetAudience?.keywords?.join(", ") || ""}
                                onChange={(e) => setBrief({
                                    ...brief,
                                    targetAudience: {
                                        ...brief.targetAudience,
                                        keywords: e.target.value.split(",").map(k => k.trim())
                                    }
                                })}
                                placeholder="courtier immobilier, maison à vendre..."
                            />
                        </div>

                        <div className="flex gap-3 justify-end">
                            <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                                Annuler
                            </Button>
                            <Button
                                onClick={() => createCampaignMutation.mutate(brief as CampaignBrief)}
                                disabled={!brief.clientName || !brief.budget || createCampaignMutation.isPending}
                            >
                                {createCampaignMutation.isPending ? "Création..." : "Créer la Campagne"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Stats Overview */}
            {totalMetrics && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard
                        title="Impressions"
                        value={totalMetrics.impressions.toLocaleString()}
                        icon={Eye}
                        color="blue"
                    />
                    <StatCard
                        title="Clics"
                        value={totalMetrics.clicks.toLocaleString()}
                        icon={MousePointerClick}
                        color="green"
                    />
                    <StatCard
                        title="Coût Total"
                        value={`${totalMetrics.cost.toFixed(2)}$`}
                        icon={DollarSign}
                        color="orange"
                    />
                    <StatCard
                        title="CTR Moyen"
                        value={`${avgCTR.toFixed(2)}%`}
                        icon={TrendingUp}
                        color="purple"
                    />
                </div>
            )}

            {/* Campaigns List */}
            <div className="grid grid-cols-1 gap-4">
                {campaigns?.map((campaign) => (
                    <Card key={campaign.campaignId} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{campaign.campaignName}</CardTitle>
                                    <Badge variant={campaign.status === "ENABLED" ? "default" : "secondary"}>
                                        {campaign.status}
                                    </Badge>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => optimizeCampaignMutation.mutate(campaign.campaignId)}
                                    disabled={optimizeCampaignMutation.isPending}
                                >
                                    <Zap className="w-4 h-4 mr-2" />
                                    Optimiser
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-4 gap-4 text-sm">
                                <div>
                                    <div className="text-slate-500">Impressions</div>
                                    <div className="font-bold text-lg">{campaign.impressions.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-slate-500">Clics</div>
                                    <div className="font-bold text-lg">{campaign.clicks.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-slate-500">CTR</div>
                                    <div className="font-bold text-lg">{(campaign.ctr * 100).toFixed(2)}%</div>
                                </div>
                                <div>
                                    <div className="text-slate-500">CPC</div>
                                    <div className="font-bold text-lg">${campaign.cpc.toFixed(2)}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {campaigns?.length === 0 && (
                    <Card className="py-20 border-dashed">
                        <CardContent className="text-center text-slate-400">
                            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p className="font-medium text-xl">Aucune campagne Google Ads</p>
                            <p className="text-sm mt-2">Créez votre première campagne pour commencer</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: "blue" | "green" | "orange" | "purple" }) {
    const colors: Record<"blue" | "green" | "orange" | "purple", string> = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        orange: "bg-orange-50 text-orange-600",
        purple: "bg-purple-50 text-purple-600",
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500">{title}</p>
                        <p className="text-2xl font-bold mt-1">{value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
