import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable is not set. Email functionality will be disabled.");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn("SendGrid API key not configured. Email not sent.");
    return false;
  }

  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendConversationSummary(
  leadEmail: string,
  leadName: string,
  conversationSummary: string,
  messages: Array<{ content: string; sender: "user" | "bot"; timestamp: string }>
): Promise<boolean> {
  const fromEmail = "contact@minecore.group";
  const subject = `${leadName ? `${leadName}, ` : ''}Your Consultation Summary - Minecore Group`;
  
  const messageHistory = messages.map(msg => {
    const time = new Date(msg.timestamp).toLocaleTimeString();
    const sender = msg.sender === 'user' ? 'You' : 'Minecore Assistant';
    return `${time} - ${sender}: ${msg.content}`;
  }).join('\n');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #1a1a1a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">Minecore Group</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.8;">AI Automation Implementation Agency</p>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #333; margin-top: 0;">Hello ${leadName || 'there'}!</h2>
        
        <p style="color: #666; line-height: 1.6;">
          Thank you for chatting with our AI assistant. Based on our conversation, here's a summary of how we can help transform your business:
        </p>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Consultation Summary</h3>
          <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${conversationSummary}</p>
        </div>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Next Steps</h3>
          <ul style="color: #666; line-height: 1.6;">
            <li>📞 Schedule a free 30-minute consultation call</li>
            <li>🎯 Get a customized automation strategy for your business</li>
            <li>📊 Receive a detailed ROI projection</li>
            <li>🚀 Start your transformation journey with our expert team</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://calendly.com/minecore-group/consultation" 
             style="background-color: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Book Your Free Consultation
          </a>
        </div>
        
        <div style="background-color: #e5e7eb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #666; margin: 0; font-size: 14px;">
            <strong>Questions?</strong> Simply reply to this email or call us at +1 (514) 123-4567
          </p>
        </div>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">
          Minecore Group | AI Automation Implementation Agency<br>
          Montreal, QC | contact@minecore.group
        </p>
      </div>
    </div>
  `;

  const textContent = `
Hello ${leadName || 'there'}!

Thank you for chatting with our AI assistant. Based on our conversation, here's a summary of how we can help transform your business:

CONSULTATION SUMMARY:
${conversationSummary}

NEXT STEPS:
• Schedule a free 30-minute consultation call
• Get a customized automation strategy for your business  
• Receive a detailed ROI projection
• Start your transformation journey with our expert team

Book your free consultation: https://calendly.com/minecore-group/consultation

Questions? Simply reply to this email or call us at +1 (514) 123-4567

Best regards,
Minecore Group
AI Automation Implementation Agency
Montreal, QC | contact@minecore.group
  `;

  return await sendEmail({
    to: leadEmail,
    from: fromEmail,
    subject,
    html: htmlContent,
    text: textContent,
  });
}