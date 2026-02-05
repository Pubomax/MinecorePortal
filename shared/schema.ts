import { pgTable, text, serial, timestamp, boolean, json, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  // Page 1 - Basic Info
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company").notNull(),
  jobTitle: text("job_title").notNull(),
  companySize: text("company_size").notNull(),
  industry: text("industry").notNull(),

  // Page 2 - Business Details
  revenue: text("revenue").notNull(),
  growth: text("growth").notNull(),
  currentTools: text("current_tools").notNull(),
  teamSize: text("team_size").notNull(),
  biggestChallenge: text("biggest_challenge").notNull(),
  timeSpentManualTasks: text("time_spent_manual_tasks").notNull(),

  // Page 3 - Automation Goals
  automationGoals: text("automation_goals").notNull(),
  budget: text("budget").notNull(),
  timeline: text("timeline").notNull(),
  decisionMaker: text("decision_maker").notNull(),
  previousAutomation: text("previous_automation").notNull(),
  urgency: text("urgency").notNull(),
  additionalInfo: text("additional_info"),

  // CRM Fields
  status: text("status").default("New").notNull(), // New, Contacted, Qualified, Proposal, Won, Lost
  expectedRevenue: integer("expected_revenue").default(0),
  actualRevenue: integer("actual_revenue").default(0),
  serviceType: text("service_type"), // Chatbot, Voicebot, CRM, Automations
  region: text("region"), // Montreal, Laval, West Island, etc.
  source: text("source").default("Website Form").notNull(), // Website Form, Chatbot, Google Ads

  // Meta
  leadScore: text("lead_score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  metaDescription: text("meta_description").notNull(),
  keywords: text("keywords").notNull(),
  author: text("author").notNull().default("Minecore Team"),
  readTime: text("read_time").notNull().default("5 min read"),
  category: text("category").notNull().default("Automation"),
  featured: boolean("featured").default(false).notNull(),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Chatbot leads and conversations
export const chatbotLeads = pgTable("chatbot_leads", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  budget: text("budget"),
  industry: text("industry"),
  serviceType: text("service_type"),
  leadScore: text("lead_score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  contacted: boolean("contacted").default(false).notNull(),
});

export const chatbotConversations = pgTable("chatbot_conversations", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  leadId: integer("lead_id").references(() => chatbotLeads.id),
  messages: json("messages").notNull().$type<Array<{
    content: string;
    sender: "user" | "bot";
    timestamp: string;
  }>>(),
  leadInfo: json("lead_info"),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertChatbotLeadSchema = createInsertSchema(chatbotLeads).omit({
  id: true,
  createdAt: true,
  contacted: true,
});

export const insertChatbotConversationSchema = createInsertSchema(chatbotConversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  leadId: true,
});

// Google Ads Accounts - Multi-client management
export const googleAdsAccounts = pgTable("google_ads_accounts", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  customerId: text("customer_id").notNull().unique(), // Google Ads Customer ID (e.g., "8156005600")
  industry: text("industry"),
  status: text("status").default("active").notNull(), // active, paused, archived
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertGoogleAdsAccountSchema = createInsertSchema(googleAdsAccounts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultations.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertChatbotLead = z.infer<typeof insertChatbotLeadSchema>;
export type ChatbotLead = typeof chatbotLeads.$inferSelect;
export type InsertChatbotConversation = z.infer<typeof insertChatbotConversationSchema>;
export type ChatbotConversation = typeof chatbotConversations.$inferSelect;
export type GoogleAdsAccount = typeof googleAdsAccounts.$inferSelect;
export type InsertGoogleAdsAccount = typeof googleAdsAccounts.$inferInsert;
