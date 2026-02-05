import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertConsultationSchema, type InsertConsultation } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { apiRequest } from "@/lib/queryClient";

export function ConsultationForm() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertConsultation>({
    resolver: zodResolver(insertConsultationSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      revenue: "",
      challenge: "",
      phone: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertConsultation) => {
      const response = await apiRequest("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/consultations"] });
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "We'll contact you within 24 hours to schedule your consultation.",
      });
    },
    onError: (error) => {
      console.error("Consultation submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertConsultation) => {
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-check text-green-600 text-2xl"></i>
        </div>
        <h3 className="font-display text-xl mb-2 text-black">Consultation Booked!</h3>
        <p className="text-gray-600 mb-4">
          We'll contact you within 24 hours to schedule your free consultation.
        </p>
        <p className="text-sm text-gray-500">
          Check your email for confirmation details.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-black mb-6">{t('formTitle')}</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">{t('fullName')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('fullName')} {...field} />
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
                <FormLabel className="text-black">{t('businessEmail')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t('businessEmail')} {...field} />
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
                <FormLabel className="text-black">{t('companyName')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('companyName')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="revenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">{t('annualRevenue')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectRange')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={t('revenue100k500k')}>{t('revenue100k500k')}</SelectItem>
                    <SelectItem value={t('revenue500k1m')}>{t('revenue500k1m')}</SelectItem>
                    <SelectItem value={t('revenue1m5m')}>{t('revenue1m5m')}</SelectItem>
                    <SelectItem value={t('revenue5m10m')}>{t('revenue5m10m')}</SelectItem>
                    <SelectItem value={t('revenue10mPlus')}>{t('revenue10mPlus')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="challenge"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">{t('biggestChallenge')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t('challengePlaceholder')}
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">{t('phone')} (Optional)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={mutation.isPending}
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            {mutation.isPending ? t('loading') : t('bookMyConsultation')}
          </Button>
          
          <p className="text-sm text-gray-600 text-center">
            {t('noSalesPressure')}
          </p>
        </form>
      </Form>
    </div>
  );
}