import { Resend } from 'resend';
import ContactFormEmail from '@/components/emails/ContactFormEmail';

// Lazy initialize Resend client
let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is required');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

export interface ContactNotificationData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Send a contact form notification email to the admin
 */
export async function sendContactNotification(
  data: ContactNotificationData
): Promise<EmailResult> {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.error('ADMIN_EMAIL environment variable is not set');
    return {
      success: false,
      error: 'Admin email not configured',
    };
  }

  try {
    const { data: result, error } = await getResend().emails.send({
      from: 'Jewish Obits <notifications@jewishobits.com>',
      to: adminEmail,
      replyTo: data.email,
      subject: `New Contact Form Submission: ${data.subject}`,
      react: ContactFormEmail({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        submittedAt: new Date(),
      }),
    });

    if (error) {
      console.error('Resend email error:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      id: result?.id,
    };
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
