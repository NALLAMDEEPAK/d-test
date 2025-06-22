import { Injectable, BadRequestException } from '@nestjs/common';
import { google } from 'googleapis';
import { User } from '../user/interfaces/user.interface';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  async sendInviteEmail(user: User, emailData: SendEmailDto) {
    try {
      if (!user.accessToken) {
        throw new BadRequestException('User access token not available');
      }

      // Set up OAuth2 client
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({
        access_token: user.accessToken,
        refresh_token: user.refreshToken,
      });

      // Create Gmail API instance
      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

      // Create email content
      const emailContent = this.createEmailContent(
        user.email,
        emailData.to,
        emailData.subject,
        emailData.body,
        emailData.interviewDetails
      );

      // Send email
      const result = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: emailContent,
        },
      });

      return {
        success: true,
        message: 'Interview invitation sent successfully',
        messageId: result.data.id,
        sentTo: emailData.to,
      };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new BadRequestException(
        `Failed to send email: ${error.message || 'Unknown error'}`
      );
    }
  }

  private createEmailContent(
    from: string,
    to: string,
    subject: string,
    body: string,
    interviewDetails?: any
  ): string {
    const emailBody = this.generateEmailBody(body, interviewDetails);
    
    const email = [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      'Content-Type: text/html; charset=utf-8',
      '',
      emailBody,
    ].join('\n');

    return Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
  }

  private generateEmailBody(customBody: string, interviewDetails?: any): string {
    const baseTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4f46e5; margin: 0; font-size: 28px;">🚀 CodePro</h1>
            <p style="color: #6b7280; margin: 5px 0 0 0;">Mock Interview Platform</p>
          </div>
          
          <h2 style="color: #1f2937; margin-bottom: 20px;">You're Invited to a Mock Interview!</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${customBody}
          </div>
          
          ${interviewDetails ? this.generateInterviewDetailsHtml(interviewDetails) : ''}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
               style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
              Join CodePro Platform
            </a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This invitation was sent through CodePro Mock Interview Platform
            </p>
          </div>
        </div>
      </div>
    `;

    return baseTemplate;
  }

  private generateInterviewDetailsHtml(details: any): string {
    if (!details) return '';

    return `
      <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
        <h3 style="color: #1e40af; margin: 0 0 15px 0;">📅 Interview Details</h3>
        ${details.date ? `<p style="margin: 5px 0;"><strong>Date:</strong> ${details.date}</p>` : ''}
        ${details.time ? `<p style="margin: 5px 0;"><strong>Time:</strong> ${details.time}</p>` : ''}
        ${details.duration ? `<p style="margin: 5px 0;"><strong>Duration:</strong> ${details.duration} minutes</p>` : ''}
        ${details.topics ? `<p style="margin: 5px 0;"><strong>Topics:</strong> ${details.topics}</p>` : ''}
        ${details.description ? `<p style="margin: 15px 0 5px 0;"><strong>Description:</strong></p><p style="margin: 5px 0;">${details.description}</p>` : ''}
      </div>
    `;
  }
}