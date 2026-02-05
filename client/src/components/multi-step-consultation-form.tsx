import { useState } from "react";
declare const gtag: any;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertConsultationSchema, type InsertConsultation } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { apiRequest } from "@/lib/queryClient";
import { calculateLeadScore } from "@/lib/lead-scoring";

export function MultiStepConsultationForm() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertConsultation>({
    resolver: zodResolver(insertConsultationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
      companySize: "",
      industry: "",
      revenue: "",
      growth: "",
      currentTools: "",
      teamSize: "",
      biggestChallenge: "",
      timeSpentManualTasks: "",
      automationGoals: "",
      budget: "",
      timeline: "",
      decisionMaker: "",
      previousAutomation: "",
      urgency: "",
      additionalInfo: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertConsultation) => {
      const response = await apiRequest("POST", "/api/consultations", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/consultations"] });
      setIsSubmitted(true);

      // Google Ads conversion tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
          'send_to': 'AW-17032394525',
          'value': 1,
          'currency': 'USD'
        });
        gtag('event', 'submit_lead_form', {
          'currency': 'USD',
          'value': 1
        });
      }

      toast({
        title: t('applicationSubmitted'),
        description: t('thankYouApplication'),
      });
    },
    onError: (error) => {
      console.error("Consultation submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const validateStep = async () => {
    const fields = getStepFields(currentStep);
    const result = await form.trigger(fields);
    return result;
  };

  const getStepFields = (step: number): (keyof InsertConsultation)[] => {
    switch (step) {
      case 1:
        return ["name", "email", "company", "jobTitle", "companySize", "industry"];
      case 2:
        return ["revenue", "growth", "currentTools", "teamSize", "biggestChallenge", "timeSpentManualTasks"];
      case 3:
        return ["automationGoals", "budget", "timeline", "decisionMaker", "previousAutomation", "urgency"];
      default:
        return [];
    }
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (!isValid) {
      // Show validation errors
      const fields = getStepFields(currentStep);
      fields.forEach(field => {
        form.trigger(field);
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: InsertConsultation) => {
    // Prevent submission if not on step 3
    if (currentStep !== 3) {
      console.log('Form submission blocked: must complete all 3 steps');
      return false;
    }

    // Validate all required step 3 fields
    const step3Fields = ['automationGoals', 'budget', 'timeline', 'decisionMaker', 'previousAutomation', 'urgency'];
    const missingFields = step3Fields.filter(field => !data[field as keyof InsertConsultation]);

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return false;
    }

    const leadScore = calculateLeadScore(data);

    // Capture UTM Source if available
    const utmSource = sessionStorage.getItem('utm_source');
    const source = utmSource ? `Google Ads (${utmSource})` : "Website Form";

    const dataWithScore = {
      ...data,
      leadScore,
      source
    };
    mutation.mutate(dataWithScore);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-check text-green-600 text-3xl"></i>
        </div>
        <h3 className="font-display text-2xl mb-4 text-black">{t('applicationSubmitted')}</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {t('thankYouApplication')}
        </p>
        <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
          <h4 className="font-semibold mb-2">{t('whatHappensNext')}</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• {t('qualificationReview')}</li>
            <li>• {t('consultScheduling')}</li>
            <li>• {t('customAutoStrategy')}</li>
          </ul>
        </div>
      </div>
    );
  }

  const progress = (currentStep / 3) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{t('step')} {currentStep} {t('of')} 3</span>
          <span>{Math.round(progress)}% {t('complete')}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Headers */}
      <div className="text-center mb-8">
        {currentStep === 1 && (
          <div>
            <h3 className="font-display text-2xl mb-2 text-black">{t('companyInformation')}</h3>
            <p className="text-gray-600">{t('tellUsAboutBusiness')}</p>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h3 className="font-display text-2xl mb-2 text-black">{t('currentOperations')}</h3>
            <p className="text-gray-600">{t('helpUnderstandOperations')}</p>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h3 className="font-display text-2xl mb-2 text-black">{t('automationGoalsHeader')}</h3>
            <p className="text-gray-600">{t('defineObjectives')}</p>
          </div>
        )}
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            // Block form submission if not on step 3
            if (currentStep !== 3) {
              e.preventDefault();
              console.log('Form submission prevented: not on final step');
              return false;
            }
            form.handleSubmit(onSubmit)(e);
          }}
          className="space-y-6"
          onKeyDown={(e) => {
            // Prevent form submission on Enter key unless on step 3
            if (e.key === 'Enter' && currentStep !== 3) {
              e.preventDefault();
            }
          }}
        >
          {/* Step 1: Company Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">{t('fullName')} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t('yourFullName')} {...field} value={field.value ?? ""} />
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
                      <FormLabel className="text-black">{t('businessEmail')} *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@company.com" {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">{t('phoneNumber')}</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+1 (555) 123-4567" {...field} value={field.value ?? ""} />
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
                      <FormLabel className="text-black">{t('companyName')} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t('yourCompany')} {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">{t('jobTitle')} *</FormLabel>
                    <FormControl>
                      <Input placeholder={t('jobTitlePlaceholder')} {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">{t('companySize')} *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectCompanySize')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="solo">{t('optionSolo')}</SelectItem>
                          <SelectItem value="2-5">{t('option2_5')}</SelectItem>
                          <SelectItem value="6-20">{t('option6_20')}</SelectItem>
                          <SelectItem value="21-50">{t('option21_50')}</SelectItem>
                          <SelectItem value="51-200">{t('option51_200')}</SelectItem>
                          <SelectItem value="200+">{t('option200Plus')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">{t('industry')} *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectIndustry')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ecommerce">{t('optionEcommerce')}</SelectItem>
                          <SelectItem value="saas">{t('optionSaas')}</SelectItem>
                          <SelectItem value="professional-services">{t('optionProfessionalServices')}</SelectItem>
                          <SelectItem value="healthcare">{t('optionHealthcare')}</SelectItem>
                          <SelectItem value="finance">{t('optionFinance')}</SelectItem>
                          <SelectItem value="real-estate">{t('optionRealEstate')}</SelectItem>
                          <SelectItem value="manufacturing">{t('optionManufacturing')}</SelectItem>
                          <SelectItem value="retail">{t('optionRetail')}</SelectItem>
                          <SelectItem value="education">{t('optionEducation')}</SelectItem>
                          <SelectItem value="other">{t('optionOther')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 2: Current Operations */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="revenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">{t('annualRevenueLabel')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectRevenueRange')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="under-100k">{t('optionUnder100k')}</SelectItem>
                          <SelectItem value="100k-500k">{t('option100k500k')}</SelectItem>
                          <SelectItem value="500k-1m">{t('option500k1m')}</SelectItem>
                          <SelectItem value="1m-5m">{t('option1m5m')}</SelectItem>
                          <SelectItem value="5m-10m">{t('option5m10m')}</SelectItem>
                          <SelectItem value="10m+">{t('option10mPlus')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="growth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">{t('yoyGrowth')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectGrowthRate')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="declining">{t('optionDeclining')}</SelectItem>
                          <SelectItem value="0-10">{t('option0_10')}</SelectItem>
                          <SelectItem value="10-25">{t('option10_25')}</SelectItem>
                          <SelectItem value="25-50">{t('option25_50')}</SelectItem>
                          <SelectItem value="50-100">{t('option50_100')}</SelectItem>
                          <SelectItem value="100+">{t('option100Plus')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="currentTools"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">{t('currentToolsLabel')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectCurrentTools')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic-spreadsheets">{t('optionBasicSpreadsheets')}</SelectItem>
                        <SelectItem value="crm-basic">{t('optionCrmBasic')}</SelectItem>
                        <SelectItem value="project-management">{t('optionProjectManagement')}</SelectItem>
                        <SelectItem value="integrated-suite">{t('optionIntegratedSuite')}</SelectItem>
                        <SelectItem value="custom-solutions">{t('optionCustomSolutions')}</SelectItem>
                        <SelectItem value="minimal-tools">{t('optionMinimalTools')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="teamSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">{t('opsTeamSize')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectTeamSize')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="just-me">{t('optionJustMe')}</SelectItem>
                          <SelectItem value="2-3">{t('option2_3')}</SelectItem>
                          <SelectItem value="4-10">{t('option4_10')}</SelectItem>
                          <SelectItem value="11-25">{t('option11_25')}</SelectItem>
                          <SelectItem value="25+">{t('option25Plus')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeSpentManualTasks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">{t('timeManualTasks')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('hoursPerWeek')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-5">{t('option0_5hrs')}</SelectItem>
                          <SelectItem value="5-15">{t('option5_15hrs')}</SelectItem>
                          <SelectItem value="15-30">{t('option15_30hrs')}</SelectItem>
                          <SelectItem value="30-40">{t('option30_40hrs')}</SelectItem>
                          <SelectItem value="40+">{t('option40Plushrs')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="biggestChallenge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">{t('biggestOpsChallenge')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectBiggestChallenge')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="manual-data-entry">{t('optionManualDataEntry')}</SelectItem>
                        <SelectItem value="repetitive-tasks">{t('optionRepetitiveTasks')}</SelectItem>
                        <SelectItem value="customer-follow-up">{t('optionCustomerFollowUp')}</SelectItem>
                        <SelectItem value="inventory-management">{t('optionInventoryManagement')}</SelectItem>
                        <SelectItem value="reporting-analytics">{t('optionReportingAnalytics')}</SelectItem>
                        <SelectItem value="team-coordination">{t('optionTeamCoordination')}</SelectItem>
                        <SelectItem value="customer-service">{t('optionCustomerService')}</SelectItem>
                        <SelectItem value="scaling-operations">{t('optionScalingOperations')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 3: Automation Goals */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="automationGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">{t('primaryAutomationGoals')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectAutomationGoals')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="reduce-manual-work">{t('optionReduceManualWork')}</SelectItem>
                        <SelectItem value="improve-customer-experience">{t('optionImproveCustomerExperience')}</SelectItem>
                        <SelectItem value="increase-sales-efficiency">{t('optionIncreaseSalesEfficiency')}</SelectItem>
                        <SelectItem value="better-data-insights">{t('optionBetterDataInsights')}</SelectItem>
                        <SelectItem value="scale-without-hiring">{t('optionScaleWithoutHiring')}</SelectItem>
                        <SelectItem value="eliminate-errors">{t('optionEliminateErrors')}</SelectItem>
                        <SelectItem value="faster-response-times">{t('optionFasterResponseTimes')}</SelectItem>
                        <SelectItem value="integrate-systems">{t('optionIntegrateSystems')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">{t('monthlyBudgetRange')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectBudgetRange')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="under-1k">{t('optionUnder1k')}</SelectItem>
                          <SelectItem value="1k-2.5k">{t('option1k2_5k')}</SelectItem>
                          <SelectItem value="2.5k-5k">{t('option2_5k5k')}</SelectItem>
                          <SelectItem value="5k-10k">{t('option5k10k')}</SelectItem>
                          <SelectItem value="10k-25k">{t('option10k25k')}</SelectItem>
                          <SelectItem value="25k+">{t('option25kPlus')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">{t('implTimeline')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('startWhen')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="asap">{t('optionAsap')}</SelectItem>
                          <SelectItem value="1-3-months">{t('option1_3Months')}</SelectItem>
                          <SelectItem value="3-6-months">{t('option3_6Months')}</SelectItem>
                          <SelectItem value="6-12-months">{t('option6_12Months')}</SelectItem>
                          <SelectItem value="exploring">{t('optionExploring')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="decisionMaker"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">{t('decisionAuthority')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('yourRoleDecisions')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="final-decision">{t('optionFinalDecision')}</SelectItem>
                          <SelectItem value="recommend">{t('optionRecommend')}</SelectItem>
                          <SelectItem value="influence">{t('optionInfluence')}</SelectItem>
                          <SelectItem value="research">{t('optionResearchForOthers')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">{t('priorityLevel')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('howUrgent')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="critical">{t('optionCritical')}</SelectItem>
                          <SelectItem value="high">{t('optionHigh')}</SelectItem>
                          <SelectItem value="medium">{t('optionMedium')}</SelectItem>
                          <SelectItem value="low">{t('optionLow')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="previousAutomation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">{t('prevAutomationExp')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectExpLevel')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="complete-beginner">{t('optionCompleteBeginner')}</SelectItem>
                        <SelectItem value="basic-tools">{t('optionUsedBasicTools')}</SelectItem>
                        <SelectItem value="tried-failed">{t('optionTriedFailed')}</SelectItem>
                        <SelectItem value="partial-success">{t('optionPartialSuccess')}</SelectItem>
                        <SelectItem value="experienced">{t('optionExperienced')}</SelectItem>
                        <SelectItem value="diy-attempts">{t('optionDiyAttempts')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">{t('additionalInfoLabel')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('additionalInfoPlaceholder')}
                        className="min-h-[80px]"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-8"
            >
              {t('previous')}
            </Button>

            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="px-8 bg-black text-white hover:bg-gray-800"
              >
                {t('nextStep')}
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={mutation.isPending || currentStep !== 3}
                className="px-8 bg-black text-white hover:bg-gray-800"
                onClick={(e) => {
                  if (currentStep !== 3) {
                    e.preventDefault();
                    console.log('Submit button clicked but not on step 3');
                    return false;
                  }
                }}
              >
                {mutation.isPending ? t('submitting') : t('submitApplication')}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}