import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MultiStepConsultationForm } from "@/components/multi-step-consultation-form";
import { useLanguage } from "@/hooks/use-language";

interface ConsultationModalProps {
  triggerText?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ConsultationModal({ 
  triggerText, 
  variant = "default", 
  size = "default",
  className = ""
}: ConsultationModalProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          {triggerText || t('bookConsultation')}
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="max-h-[90vh] max-w-5xl overflow-y-auto rounded-[32px] border border-[rgba(16,24,40,0.08)] bg-[#fffaf3]/95 shadow-[0_40px_100px_rgba(15,23,42,0.22)]"
        style={{ backgroundColor: 'rgba(255, 250, 243, 0.95)', backdropFilter: 'blur(18px)' }}
      >
        <DialogHeader className="rounded-[24px] border border-[rgba(16,24,40,0.08)] bg-white/70 p-5">
          <DialogTitle className="text-2xl font-display text-slate-950">
            {t('consultationModalTitle')}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {t('consultationModalDesc')}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 rounded-[28px] border border-[rgba(16,24,40,0.08)] bg-white/85 p-2">
          <MultiStepConsultationForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
