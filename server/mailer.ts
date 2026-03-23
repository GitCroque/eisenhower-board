import nodemailer from 'nodemailer';

export interface SendMagicLinkParams {
  to: string;
  link: string;
  expiresInMinutes: number;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmail(params: SendMagicLinkParams) {
  return {
    subject: 'Your Eisenhower Board sign-in link',
    text: [
      'Click the link below to sign in to Eisenhower Board:',
      params.link,
      '',
      `This link expires in ${params.expiresInMinutes} minutes and can only be used once.`,
    ].join('\n'),
    html: [
      '<p>Click the link below to sign in to Eisenhower Board:</p>',
      `<p><a href="${escapeHtml(params.link)}">${escapeHtml(params.link)}</a></p>`,
      `<p>This link expires in ${params.expiresInMinutes} minutes and can only be used once.</p>`,
    ].join(''),
  };
}

// --- Resend (HTTPS API) ---

function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.MAIL_FROM);
}

async function sendViaResend(params: SendMagicLinkParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY!;
  const from = process.env.MAIL_FROM!;
  const email = buildEmail(params);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [params.to],
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error ${res.status}: ${body}`);
  }
}

// --- SMTP (nodemailer) ---

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
}

function getSmtpConfig(): SmtpConfig {
  const host = process.env.SMTP_HOST || '';
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

function isSmtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!cachedTransporter) {
    const config = getSmtpConfig();
    cachedTransporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.pass },
      pool: true,
      maxConnections: 3,
    });
  }
  return cachedTransporter;
}

async function sendViaSmtp(params: SendMagicLinkParams): Promise<void> {
  const config = getSmtpConfig();
  const transporter = getTransporter();
  const email = buildEmail(params);

  await transporter.sendMail({
    from: config.from,
    to: params.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}

// --- Public API ---

export function isMailerConfigured(): boolean {
  return isResendConfigured() || isSmtpConfigured();
}

export async function sendMagicLinkEmail(params: SendMagicLinkParams): Promise<void> {
  if (isResendConfigured()) {
    await sendViaResend(params);
  } else if (isSmtpConfigured()) {
    await sendViaSmtp(params);
  } else {
    throw new Error('No email provider configured (set RESEND_API_KEY or SMTP_HOST)');
  }
}
