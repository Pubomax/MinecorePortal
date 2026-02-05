import type { InsertConsultation } from "@shared/schema";

export function calculateLeadScore(data: InsertConsultation): string {
  let score = 0;
  let maxScore = 100;

  // Company Size Scoring (20 points)
  const companySizeScores: Record<string, number> = {
    "solo": 5,
    "2-5": 10,
    "6-20": 20,
    "21-50": 18,
    "51-200": 15,
    "200+": 10
  };
  score += companySizeScores[data.companySize] || 0;

  // Revenue Scoring (25 points)
  const revenueScores: Record<string, number> = {
    "under-100k": 5,
    "100k-500k": 15,
    "500k-1m": 25,
    "1m-5m": 25,
    "5m-10m": 20,
    "10m+": 15
  };
  score += revenueScores[data.revenue] || 0;

  // Growth Scoring (15 points)
  const growthScores: Record<string, number> = {
    "declining": 2,
    "0-10": 5,
    "10-25": 10,
    "25-50": 15,
    "50-100": 15,
    "100+": 12
  };
  score += growthScores[data.growth] || 0;

  // Budget Scoring (20 points)
  const budgetScores: Record<string, number> = {
    "under-1k": 5,
    "1k-2.5k": 10,
    "2.5k-5k": 15,
    "5k-10k": 20,
    "10k-25k": 20,
    "25k+": 18
  };
  score += budgetScores[data.budget] || 0;

  // Timeline Scoring (10 points)
  const timelineScores: Record<string, number> = {
    "asap": 10,
    "1-3-months": 8,
    "3-6-months": 6,
    "6-12-months": 4,
    "exploring": 2
  };
  score += timelineScores[data.timeline] || 0;

  // Decision Maker Scoring (10 points)
  const decisionScores: Record<string, number> = {
    "final-decision": 10,
    "recommend": 7,
    "influence": 5,
    "research": 2
  };
  score += decisionScores[data.decisionMaker] || 0;

  // Calculate percentage and assign grade
  const percentage = Math.round((score / maxScore) * 100);

  if (percentage >= 85) return "A+ (Hot Lead)";
  if (percentage >= 75) return "A (High Priority)";
  if (percentage >= 65) return "B+ (Good Prospect)";
  if (percentage >= 55) return "B (Qualified Lead)";
  if (percentage >= 45) return "C+ (Warm Lead)";
  if (percentage >= 35) return "C (Follow Up)";
  return "D (Low Priority)";
}