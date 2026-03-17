import { z } from "zod";

export const insertConsultationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("A valid email is required"),
  phone: z.string().optional(),
  company: z.string().min(1, "Company is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  companySize: z.string().min(1, "Company size is required"),
  industry: z.string().min(1, "Industry is required"),
  revenue: z.string().min(1, "Revenue range is required"),
  growth: z.string().min(1, "Growth rate is required"),
  currentTools: z.string().min(1, "Current tools are required"),
  teamSize: z.string().min(1, "Team size is required"),
  biggestChallenge: z.string().min(1, "Biggest challenge is required"),
  timeSpentManualTasks: z.string().min(1, "Manual task estimate is required"),
  automationGoals: z.string().min(1, "Automation goals are required"),
  budget: z.string().min(1, "Budget is required"),
  timeline: z.string().min(1, "Timeline is required"),
  decisionMaker: z.string().min(1, "Decision authority is required"),
  previousAutomation: z.string().min(1, "Previous automation experience is required"),
  urgency: z.string().min(1, "Priority level is required"),
  additionalInfo: z.string().optional(),
  status: z.string().optional(),
  expectedRevenue: z.number().optional(),
  actualRevenue: z.number().optional(),
  serviceType: z.string().optional(),
  region: z.string().optional(),
  source: z.string().optional(),
  leadScore: z.string().optional(),
});

export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
