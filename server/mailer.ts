import nodemailer from 'nodemailer';

export interface SendMagicLinkParams {
  to: string;
  link: string;
  expiresInMinutes: number;
}

interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
}

function getMailConfig(): MailConfig {
  const host = process.env.SMTP_HOST || 'smtp.fastmail.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = (process.env.SMTP_SECURE || 'true').toLowerCase() !== 'false';
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';
  const from = process.env.MAIL_FROM || user;

  if (!host || !user || !pass || !from || Number.isNaN(port)) {
    throw new Error('SMTP configuration is incomplete');
  }

  return { host, port, secure, user, pass, from };
}

export function isMailerConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendMagicLinkEmail(params: SendMagicLinkParams): Promise<void> {
  const config = getMailConfig();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: config.from,
    to: params.to,
    subject: 'Your Eisenhower Board sign-in link',
    text: [
      'Click the link below to sign in to Eisenhower Board:',
      params.link,
      '',
      `This link expires in ${params.expiresInMinutes} minutes and can only be used once.`,
    ].join('\n'),
    html: [
      '<p>Click the link below to sign in to Eisenhower Board:</p>',
      `<p><a href="${params.link}">${params.link}</a></p>`,
      `<p>This link expires in ${params.expiresInMinutes} minutes and can only be used once.</p>`,
    ].join(''),
  });
}
