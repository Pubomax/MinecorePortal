import nodemailer from 'nodemailer';

export async function testGmailConnection(): Promise<boolean> {
  try {
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    console.log('=== GMAIL CONNECTION TEST ===');
    console.log(`Gmail User: ${gmailUser ? gmailUser.substring(0, 5) + '***' : 'NOT SET'}`);
    console.log(`Gmail Password: ${gmailPassword ? gmailPassword.substring(0, 4) + '***' : 'NOT SET'}`);
    
    if (!gmailUser || !gmailPassword) {
      console.error('Missing Gmail credentials');
      return false;
    }
    
    // Test avec différentes configurations
    const configs = [
      {
        name: 'Gmail Service',
        config: {
          service: 'gmail',
          auth: { user: gmailUser, pass: gmailPassword }
        }
      },
      {
        name: 'Gmail SMTP with TLS',
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
    
    for (const { name, config } of configs) {
      console.log(`\nTesting ${name}...`);
      try {
        const transporter = nodemailer.createTransport(config);
        await transporter.verify();
        console.log(`✅ ${name} - Connection successful!`);
        
        // Essayer d'envoyer un email de test
        const testResult = await transporter.sendMail({
          from: gmailUser,
          to: 'hello@minecoregroup.com',
          subject: 'Test Gmail Connection - Minecore Group',
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2 style="color: #1e40af;">🎉 Gmail Connection Test Successful!</h2>
              <p>Ce test confirme que les emails peuvent être envoyés depuis <strong>${gmailUser}</strong></p>
              <p>Configuration utilisée: <strong>${name}</strong></p>
              <p>Timestamp: ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          `
        });
        
        console.log(`✅ Test email sent successfully! Message ID: ${testResult.messageId}`);
        console.log(`📧 Email sent to: hello@minecoregroup.com`);
        return true;
        
      } catch (error) {
        console.log(`❌ ${name} - Failed:`, error.message);
      }
    }
    
    console.log('\n=== ALL CONFIGURATIONS FAILED ===');
    return false;
    
  } catch (error) {
    console.error('Gmail test error:', error);
    return false;
  }
}

export async function sendTestLeadEmail(): Promise<boolean> {
  try {
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (!gmailUser || !gmailPassword) {
      return false;
    }
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPassword }
    });
    
    const result = await transporter.sendMail({
      from: `"Minecore Group System" <${gmailUser}>`,
      to: 'hello@minecoregroup.com',
      subject: '🚀 Test Lead Notification - Système Fonctionnel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1e40af; color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 24px;">🎯 Test Lead - Minecore Group</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Test de fonctionnement du système d'email</p>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin: 0 0 15px 0;">✅ Système Fonctionnel</h2>
            <p>Le système d'email fonctionne correctement avec les identifiants configurés.</p>
            <p><strong>Envoyé depuis:</strong> ${gmailUser}</p>
            <p><strong>Reçu à:</strong> hello@minecoregroup.com</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString('fr-FR')}</p>
          </div>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 10px;">
            <h3 style="color: #1f2937; margin: 0 0 10px 0;">Prochaines étapes</h3>
            <p>Maintenant que l'email fonctionne, tous les nouveaux leads vous seront automatiquement envoyés par email.</p>
          </div>
        </div>
      `
    });
    
    console.log(`✅ Test lead email sent! Message ID: ${result.messageId}`);
    return true;
    
  } catch (error) {
    console.error('Test lead email failed:', error);
    return false;
  }
}