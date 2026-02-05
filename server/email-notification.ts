import nodemailer from 'nodemailer';
import { Consultation } from '@shared/schema';
import { sendEmail } from './sendgrid';

// Configuration email simple avec Gmail
const NOTIFICATION_EMAIL = 'hello@minecoregroup.com';

export async function sendSimpleLeadNotification(consultation: Consultation): Promise<boolean> {
  try {
    // Vérifier les variables d'environnement
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (!gmailUser || !gmailPassword) {
      console.error('Missing Gmail credentials: GMAIL_USER or GMAIL_APP_PASSWORD');
      return false;
    }
    
    console.log(`Attempting to send email from: ${gmailUser.substring(0, 3)}*** to: ${NOTIFICATION_EMAIL}`);
    
    // Tester d'abord avec différentes configurations
    const configs = [
      {
        name: 'Gmail Service',
        config: {
          service: 'gmail',
          auth: { user: gmailUser, pass: gmailPassword }
        }
      },
      {
        name: 'Gmail SMTP TLS',
        config: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: { user: gmailUser, pass: gmailPassword },
          tls: { rejectUnauthorized: false }
        }
      },
      {
        name: 'Gmail SMTP SSL',
        config: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: { user: gmailUser, pass: gmailPassword }
        }
      }
    ];
    
    let transporter = null;
    let workingConfig = null;
    
    // Tester chaque configuration
    for (const { name, config } of configs) {
      try {
        console.log(`Testing ${name}...`);
        const testTransporter = nodemailer.createTransport(config);
        await testTransporter.verify();
        console.log(`✅ ${name} works!`);
        transporter = testTransporter;
        workingConfig = name;
        break;
      } catch (error) {
        console.log(`❌ ${name} failed: ${error.message}`);
      }
    }
    
    if (!transporter) {
      console.error('All Gmail configurations failed, trying SendGrid fallback...');
      
      // Fallback: essayer SendGrid si configuré
      try {
        const sendGridResult = await sendEmail({
          to: NOTIFICATION_EMAIL,
          from: 'noreply@minecoregroup.com',
          subject: `🚀 Nouveau Lead - ${consultation.name} (${consultation.company})`,
          html: emailHtml.replace('${consultation.', '${consultation.').replace('${new Date(consultation.createdAt)', '${new Date(consultation.createdAt)')
        });
        
        if (sendGridResult) {
          console.log('✅ SendGrid email sent successfully!');
          return true;
        }
      } catch (error) {
        console.error('SendGrid fallback also failed:', error);
      }
      
      return false;
    }
    
    console.log(`Using working configuration: ${workingConfig}`);

    // Contenu de l'email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1e40af; color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 24px;">🎯 Nouveau Lead - Minecore Group</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Un nouveau prospect vient de soumettre une demande de consultation</p>
        </div>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #1f2937; margin: 0 0 15px 0;">Informations du Lead</h2>
          <p><strong>Nom:</strong> ${consultation.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${consultation.email}">${consultation.email}</a></p>
          <p><strong>Entreprise:</strong> ${consultation.company}</p>
          ${consultation.phone ? `<p><strong>Téléphone:</strong> <a href="tel:${consultation.phone}">${consultation.phone}</a></p>` : ''}
          <p><strong>Score du Lead:</strong> <span style="background: #10b981; color: white; padding: 2px 8px; border-radius: 4px;">${consultation.leadScore}</span></p>
          <p><strong>Soumis le:</strong> ${new Date(consultation.createdAt).toLocaleDateString('fr-FR')} à ${new Date(consultation.createdAt).toLocaleTimeString('fr-FR')}</p>
        </div>

        ${consultation.industry || consultation.revenue || consultation.companySize ? `
        <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">Informations Entreprise</h3>
          ${consultation.industry ? `<p><strong>Industrie:</strong> ${consultation.industry}</p>` : ''}
          ${consultation.revenue ? `<p><strong>Revenus:</strong> ${consultation.revenue}</p>` : ''}
          ${consultation.companySize ? `<p><strong>Taille:</strong> ${consultation.companySize}</p>` : ''}
        </div>
        ` : ''}

        ${consultation.automationGoals ? `
        <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">Objectifs d'Automatisation</h3>
          <p>${consultation.automationGoals}</p>
        </div>
        ` : ''}

        ${consultation.currentChallenges ? `
        <div style="background: #fef2f2; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">Défis Actuels</h3>
          <p>${consultation.currentChallenges}</p>
        </div>
        ` : ''}

        ${consultation.budget || consultation.timeline ? `
        <div style="background: #fefce8; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">Budget et Timeline</h3>
          ${consultation.budget ? `<p><strong>Budget:</strong> ${consultation.budget}</p>` : ''}
          ${consultation.timeline ? `<p><strong>Timeline:</strong> ${consultation.timeline}</p>` : ''}
        </div>
        ` : ''}

        <div style="background: #e5e7eb; padding: 15px; border-radius: 10px; text-align: center;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            <strong>Action recommandée:</strong> Contacter dans les 24 heures pour maximiser le taux de conversion
          </p>
        </div>
      </div>
    `;

    // Envoyer l'email
    const result = await transporter.sendMail({
      from: `"Minecore Group" <${gmailUser}>`,
      to: NOTIFICATION_EMAIL,
      subject: `🚀 Nouveau Lead - ${consultation.name} (${consultation.company})`,
      html: emailHtml
    });

    console.log(`Lead notification sent to ${NOTIFICATION_EMAIL}:`, result.messageId);
    return true;

  } catch (error) {
    console.error('Error sending email notification:', error);
    
    // Fallback: log détaillé pour diagnostic
    console.log('Lead notification (email failed):', {
      name: consultation.name,
      email: consultation.email,
      company: consultation.company,
      leadScore: consultation.leadScore,
      timestamp: new Date(consultation.createdAt).toISOString()
    });
    
    return false;
  }
}

// Version sans authentification (pour test)
export async function sendBasicLeadNotification(consultation: Consultation): Promise<boolean> {
  try {
    console.log('=== NOUVEAU LEAD DÉTECTÉ ===');
    console.log(`Nom: ${consultation.name}`);
    console.log(`Email: ${consultation.email}`);
    console.log(`Entreprise: ${consultation.company}`);
    console.log(`Score: ${consultation.leadScore}`);
    console.log(`Téléphone: ${consultation.phone || 'Non fourni'}`);
    console.log(`Industrie: ${consultation.industry || 'Non fournie'}`);
    console.log(`Revenus: ${consultation.revenue || 'Non fournis'}`);
    console.log(`Objectifs: ${consultation.automationGoals || 'Non fournis'}`);
    console.log(`Budget: ${consultation.budget || 'Non fourni'}`);
    console.log(`Timeline: ${consultation.timeline || 'Non fournie'}`);
    console.log(`Soumis le: ${new Date(consultation.createdAt).toLocaleString('fr-FR')}`);
    console.log('================================');
    
    return true;
  } catch (error) {
    console.error('Error logging lead notification:', error);
    return false;
  }
}