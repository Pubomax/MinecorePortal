import fs from 'fs';
const env = fs.readFileSync('.env', 'utf8');
const match = env.match(/DATABASE_URL=(.*)/);
if (match) process.env.DATABASE_URL = match[1].trim();

async function seed() {
    const { storage } = await import('./server/storage');
    await storage.createConsultation({
        name: 'Thierry Bijou',
        email: 'thierry@example.com',
        company: 'Minecore Demo',
        jobTitle: 'CEO',
        companySize: '1-10',
        industry: 'Technology',
        revenue: '$1M+',
        growth: '50%+',
        currentTools: 'None',
        teamSize: '5',
        biggestChallenge: 'Manual follow-ups',
        timeSpentManualTasks: '20h',
        automationGoals: 'CRM Setup',
        budget: '$5k+',
        timeline: 'ASAP',
        decisionMaker: 'Me',
        previousAutomation: 'None',
        urgency: 'High',
        additionalInfo: 'Seed data',
        serviceType: 'CRM',
        region: 'Montreal',
        source: 'Google Ads (Campaign_A)',
        expectedRevenue: 5000
    });
    console.log('Seed successful');
    process.exit(0);
}
seed();
