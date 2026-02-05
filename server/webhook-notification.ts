import { Consultation } from '@shared/schema';

// Service de notification webhook simple
export async function sendWebhookNotification(consultation: Consultation): Promise<boolean> {
  try {
    // Option 1: Notification par webhook vers un service externe
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `🚀 Nouveau Lead - ${consultation.name} de ${consultation.company}`,
          lead: {
            name: consultation.name,
            email: consultation.email,
            company: consultation.company,
            phone: consultation.phone,
            score: consultation.leadScore,
            timestamp: consultation.createdAt
          }
        })
      });
      
      if (response.ok) {
        console.log('Webhook notification sent successfully');
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error sending webhook notification:', error);
    return false;
  }
}

// Service de notification console détaillée
export async function sendDetailedConsoleNotification(consultation: Consultation): Promise<boolean> {
  try {
    const separator = '='.repeat(60);
    const timestamp = new Date(consultation.createdAt).toLocaleString('fr-FR');
    
    console.log(`\n${separator}`);
    console.log('🚀 NOUVEAU LEAD DÉTECTÉ - MINECORE GROUP');
    console.log(`${separator}`);
    console.log(`📧 Email de notification à envoyer à: hello@minecoregroup.com`);
    console.log(`⏰ Reçu le: ${timestamp}`);
    console.log(`${separator}`);
    console.log('📋 INFORMATIONS DU LEAD:');
    console.log(`   👤 Nom: ${consultation.name}`);
    console.log(`   🏢 Entreprise: ${consultation.company}`);
    console.log(`   📧 Email: ${consultation.email}`);
    console.log(`   📞 Téléphone: ${consultation.phone || 'Non fourni'}`);
    console.log(`   🎯 Score: ${consultation.leadScore || 'Non calculé'}`);
    console.log(`   💼 Poste: ${consultation.jobTitle || 'Non fourni'}`);
    console.log(`${separator}`);
    console.log('🏭 INFORMATIONS ENTREPRISE:');
    console.log(`   🏭 Industrie: ${consultation.industry || 'Non fournie'}`);
    console.log(`   💰 Revenus: ${consultation.revenue || 'Non fournis'}`);
    console.log(`   👥 Taille: ${consultation.companySize || 'Non fournie'}`);
    console.log(`   📈 Croissance: ${consultation.growth || 'Non fournie'}`);
    console.log(`${separator}`);
    console.log('🎯 OBJECTIFS & DÉFIS:');
    console.log(`   🎯 Objectifs: ${consultation.automationGoals || 'Non fournis'}`);
    console.log(`   ⚠️  Défis: ${consultation.currentChallenges || 'Non fournis'}`);
    console.log(`   ⚠️  Plus gros défi: ${consultation.biggestChallenge || 'Non fourni'}`);
    console.log(`${separator}`);
    console.log('💰 BUDGET & TIMELINE:');
    console.log(`   💰 Budget: ${consultation.budget || 'Non fourni'}`);
    console.log(`   ⏱️  Timeline: ${consultation.timeline || 'Non fournie'}`);
    console.log(`   🚨 Urgence: ${consultation.urgency || 'Non fournie'}`);
    console.log(`${separator}`);
    console.log('📊 QUALIFICATION:');
    console.log(`   👤 Décideur: ${consultation.decisionMaker || 'Non fourni'}`);
    console.log(`   🔧 Outils actuels: ${consultation.currentTools || 'Non fournis'}`);
    console.log(`   👥 Taille équipe: ${consultation.teamSize || 'Non fournie'}`);
    console.log(`   ⏰ Temps manuel: ${consultation.timeSpentManualTasks || 'Non fourni'}`);
    console.log(`   🔄 Expérience automation: ${consultation.previousAutomation || 'Non fournie'}`);
    console.log(`${separator}`);
    console.log('🎯 ACTIONS RECOMMANDÉES:');
    console.log('   1. Contacter dans les 24 heures');
    console.log('   2. Envoyer un email de suivi personnalisé');
    console.log('   3. Planifier un appel de découverte');
    console.log(`   4. Préparer une proposition basée sur: ${consultation.automationGoals || 'les objectifs exprimés'}`);
    console.log(`${separator}`);
    console.log('💡 LIENS RAPIDES:');
    console.log(`   📧 Envoyer email: mailto:${consultation.email}`);
    if (consultation.phone) {
      console.log(`   📞 Appeler: tel:${consultation.phone}`);
    }
    console.log(`   🏢 Entreprise: ${consultation.company}`);
    console.log(`${separator}\n`);
    
    return true;
  } catch (error) {
    console.error('Error sending detailed console notification:', error);
    return false;
  }
}

// Service de notification email simple sans authentification
export async function sendSimpleEmailLog(consultation: Consultation): Promise<boolean> {
  try {
    const emailTemplate = `
SUJET: 🚀 Nouveau Lead - ${consultation.name} (${consultation.company})

DE: Système Minecore Group
À: hello@minecoregroup.com
DATE: ${new Date(consultation.createdAt).toLocaleString('fr-FR')}

---

🎯 NOUVEAU LEAD DÉTECTÉ

Nom: ${consultation.name}
Entreprise: ${consultation.company}
Email: ${consultation.email}
Téléphone: ${consultation.phone || 'Non fourni'}
Score: ${consultation.leadScore || 'Non calculé'}

INFORMATIONS ENTREPRISE:
- Industrie: ${consultation.industry || 'Non fournie'}
- Revenus: ${consultation.revenue || 'Non fournis'}
- Taille: ${consultation.companySize || 'Non fournie'}
- Croissance: ${consultation.growth || 'Non fournie'}

OBJECTIFS & DÉFIS:
- Objectifs d'automatisation: ${consultation.automationGoals || 'Non fournis'}
- Défis actuels: ${consultation.currentChallenges || 'Non fournis'}
- Plus gros défi: ${consultation.biggestChallenge || 'Non fourni'}

BUDGET & TIMELINE:
- Budget: ${consultation.budget || 'Non fourni'}
- Timeline: ${consultation.timeline || 'Non fournie'}
- Urgence: ${consultation.urgency || 'Non fournie'}

QUALIFICATION:
- Décideur: ${consultation.decisionMaker || 'Non fourni'}
- Outils actuels: ${consultation.currentTools || 'Non fournis'}
- Taille équipe: ${consultation.teamSize || 'Non fournie'}
- Temps tâches manuelles: ${consultation.timeSpentManualTasks || 'Non fourni'}

ACTIONS RECOMMANDÉES:
1. Contacter dans les 24 heures
2. Envoyer email de suivi personnalisé
3. Planifier appel de découverte

LIENS RAPIDES:
- Email: mailto:${consultation.email}
${consultation.phone ? `- Téléphone: tel:${consultation.phone}` : ''}

---
Généré automatiquement par le système Minecore Group
`;

    console.log('\n📧 EMAIL À ENVOYER:');
    console.log(emailTemplate);
    
    return true;
  } catch (error) {
    console.error('Error generating email log:', error);
    return false;
  }
}