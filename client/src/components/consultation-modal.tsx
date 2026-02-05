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
        className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-2xl"
        style={{ backgroundColor: '#ffffff', backdropFilter: 'none' }}
      >
        <DialogHeader className="pb-4 bg-white">
          <DialogTitle className="text-2xl font-display text-black">
            Book Your Free Consultation
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Complete our 3-step consultation form to receive a personalized automation strategy for your business.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 bg-white">
          <MultiStepConsultationForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}