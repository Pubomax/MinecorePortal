import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
    LayoutDashboard,
    Users,
    Filter,
    MessageSquare,
    Settings,
    LogOut,
    TrendingUp,
    Target,
    Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CRMProps {
    children: ReactNode;
}

export default function CRMLayout({ children }: CRMProps) {
    const [location] = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin", id: "dashboard" },
        { icon: Filter, label: "Funnel & Leads", href: "/admin/leads", id: "leads" },
        { icon: MessageSquare, label: "Chatbot", href: "/admin/chatbot", id: "chatbot" },
        { icon: TrendingUp, label: "Gains", href: "/admin/revenue", id: "revenue" },
        { icon: Users, label: "Clients", href: "/admin/clients", id: "clients" },
        { icon: Settings, label: "Settings", href: "/admin/settings", id: "settings" },
    ];

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col transition-all duration-300 ease-in-out">
                <div className="p-6">
                    <Link href="/admin">
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-xl">
                                M
                            </div>
                            <div>
                                <h1 className="font-bold text-lg leading-tight">Minecore</h1>
                                <p className="text-xs text-slate-400">ERP & CRM v1.0</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 mt-6 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link key={item.id} href={item.href}>
                            <div className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors",
                                location === item.href
                                    ? "bg-primary text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}>
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </div>
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-slate-800">
                    <Link href="/">
                        <div className="flex items-center gap-3 text-slate-400 hover:text-white cursor-pointer transition-colors px-4 py-3">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Quitter CRM</span>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
                {children}
            </main>
        </div>
    );
}
