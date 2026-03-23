import nodemailer from 'nodemailer';

export interface SendMagicLinkParams {
  to: string;
  link: string;
  expiresInMinutes: number;
  language?: string;
}

const SUPPORTED_LANGUAGES = ['en', 'fr', 'de', 'es', 'it', 'pt', 'nl', 'pl', 'ru', 'uk', 'zh', 'hi', 'ar', 'bn'] as const;
type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

const EMAIL_COPY: Record<SupportedLanguage, {
  subject: string;
  body: string;
  expires: string;
}> = {
  en: {
    subject: 'Your sign-in link',
    body: 'Click the link below to sign in to Eisenhower Board:',
    expires: 'This link expires in {minutes} minutes and can only be used once.',
  },
  fr: {
    subject: 'Votre lien de connexion',
    body: 'Cliquez sur le lien ci-dessous pour vous connecter à Eisenhower Board :',
    expires: 'Ce lien expire dans {minutes} minutes et ne peut être utilisé qu\u2019une seule fois.',
  },
  de: {
    subject: 'Ihr Anmeldelink',
    body: 'Klicken Sie auf den folgenden Link, um sich bei Eisenhower Board anzumelden:',
    expires: 'Dieser Link läuft in {minutes} Minuten ab und kann nur einmal verwendet werden.',
  },
  es: {
    subject: 'Tu enlace de inicio de sesión',
    body: 'Haz clic en el enlace de abajo para iniciar sesión en Eisenhower Board:',
    expires: 'Este enlace caduca en {minutes} minutos y solo puede usarse una vez.',
  },
  it: {
    subject: 'Il tuo link di accesso',
    body: 'Clicca sul link qui sotto per accedere a Eisenhower Board:',
    expires: 'Questo link scade tra {minutes} minuti e può essere usato una sola volta.',
  },
  pt: {
    subject: 'Seu link de login',
    body: 'Clique no link abaixo para entrar no Eisenhower Board:',
    expires: 'Este link expira em {minutes} minutos e só pode ser usado uma vez.',
  },
  nl: {
    subject: 'Uw aanmeldlink',
    body: 'Klik op de onderstaande link om in te loggen bij Eisenhower Board:',
    expires: 'Deze link verloopt over {minutes} minuten en kan slechts één keer worden gebruikt.',
  },
  pl: {
    subject: 'Twój link do logowania',
    body: 'Kliknij poniższy link, aby zalogować się do Eisenhower Board:',
    expires: 'Ten link wygasa za {minutes} minut i może być użyty tylko raz.',
  },
  ru: {
    subject: 'Ваша ссылка для входа',
    body: 'Нажмите на ссылку ниже, чтобы войти в Eisenhower Board:',
    expires: 'Эта ссылка истекает через {minutes} минут и может быть использована только один раз.',
  },
  uk: {
    subject: 'Ваше посилання для входу',
    body: 'Натисніть на посилання нижче, щоб увійти в Eisenhower Board:',
    expires: 'Це посилання дійсне {minutes} хвилин і може бути використане лише один раз.',
  },
  zh: {
    subject: '您的登录链接',
    body: '点击以下链接登录 Eisenhower Board：',
    expires: '此链接将在 {minutes} 分钟后过期，且只能使用一次。',
  },
  hi: {
    subject: 'आपका साइन-इन लिंक',
    body: 'Eisenhower Board में साइन इन करने के लिए नीचे दिए गए लिंक पर क्लिक करें:',
    expires: 'यह लिंक {minutes} मिनट में समाप्त हो जाएगा और केवल एक बार उपयोग किया जा सकता है।',
  },
  ar: {
    subject: 'رابط تسجيل الدخول الخاص بك',
    body: 'انقر على الرابط أدناه لتسجيل الدخول إلى Eisenhower Board:',
    expires: 'تنتهي صلاحية هذا الرابط خلال {minutes} دقيقة ولا يمكن استخدامه إلا مرة واحدة.',
  },
  bn: {
    subject: 'আপনার সাইন-ইন লিঙ্ক',
    body: 'Eisenhower Board-এ সাইন ইন করতে নিচের লিঙ্কে ক্লিক করুন:',
    expires: 'এই লিঙ্কটি {minutes} মিনিটে মেয়াদ শেষ হবে এবং শুধুমাত্র একবার ব্যবহার করা যাবে।',
  },
};

function resolveLanguage(lang?: string): SupportedLanguage {
  if (!lang) return 'en';
  const base = lang.toLowerCase().split('-')[0];
  if ((SUPPORTED_LANGUAGES as readonly string[]).includes(base)) {
    return base as SupportedLanguage;
  }
  return 'en';
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmail(params: SendMagicLinkParams) {
  const lang = resolveLanguage(params.language);
  const copy = EMAIL_COPY[lang];
  const expires = copy.expires.replace('{minutes}', String(params.expiresInMinutes));

  return {
    subject: copy.subject,
    text: [copy.body, params.link, '', expires].join('\n'),
    html: [
      `<p>${escapeHtml(copy.body)}</p>`,
      `<p><a href="${escapeHtml(params.link)}">${escapeHtml(params.link)}</a></p>`,
      `<p>${escapeHtml(expires)}</p>`,
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
