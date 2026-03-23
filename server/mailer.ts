import nodemailer from 'nodemailer';

export interface SendMagicLinkParams {
  to: string;
  link: string;
  expiresInMinutes: number;
  language?: string;
}

const SUPPORTED_LANGUAGES = ['en', 'fr', 'de', 'es', 'it', 'pt', 'nl', 'pl', 'ru', 'uk', 'zh', 'hi', 'ar', 'bn'] as const;
type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

const APP_NAME = 'Focus by Eisenhower';

const EMAIL_COPY: Record<SupportedLanguage, {
  subject: string;
  greeting: string;
  body: string;
  expires: string;
  ignore: string;
}> = {
  en: {
    subject: 'Your secure sign-in link',
    greeting: 'Hello,',
    body: `You requested to sign in to ${APP_NAME}. Click the link below to access your space:`,
    expires: 'This link expires in {minutes} minutes and can only be used once.',
    ignore: 'If you did not request this, please ignore this email.',
  },
  fr: {
    subject: 'Votre lien de connexion sécurisé',
    greeting: 'Bonjour,',
    body: `Vous avez demandé à vous connecter à ${APP_NAME}. Cliquez sur le lien ci-dessous pour accéder à votre espace :`,
    expires: 'Ce lien expire dans {minutes} minutes et ne peut être utilisé qu\u2019une seule fois.',
    ignore: 'Si vous n\u2019êtes pas à l\u2019origine de cette demande, ignorez cet email.',
  },
  de: {
    subject: 'Ihr sicherer Anmeldelink',
    greeting: 'Hallo,',
    body: `Sie haben eine Anmeldung bei ${APP_NAME} angefordert. Klicken Sie auf den folgenden Link, um auf Ihren Bereich zuzugreifen:`,
    expires: 'Dieser Link läuft in {minutes} Minuten ab und kann nur einmal verwendet werden.',
    ignore: 'Wenn Sie diese Anfrage nicht gestellt haben, ignorieren Sie bitte diese E-Mail.',
  },
  es: {
    subject: 'Tu enlace de acceso seguro',
    greeting: 'Hola,',
    body: `Has solicitado iniciar sesión en ${APP_NAME}. Haz clic en el enlace de abajo para acceder a tu espacio:`,
    expires: 'Este enlace caduca en {minutes} minutos y solo puede usarse una vez.',
    ignore: 'Si no has solicitado esto, ignora este correo.',
  },
  it: {
    subject: 'Il tuo link di accesso sicuro',
    greeting: 'Ciao,',
    body: `Hai richiesto l'accesso a ${APP_NAME}. Clicca sul link qui sotto per accedere al tuo spazio:`,
    expires: 'Questo link scade tra {minutes} minuti e può essere usato una sola volta.',
    ignore: 'Se non hai effettuato questa richiesta, ignora questa email.',
  },
  pt: {
    subject: 'Seu link de acesso seguro',
    greeting: 'Olá,',
    body: `Você solicitou acesso ao ${APP_NAME}. Clique no link abaixo para acessar seu espaço:`,
    expires: 'Este link expira em {minutes} minutos e só pode ser usado uma vez.',
    ignore: 'Se você não fez esta solicitação, ignore este email.',
  },
  nl: {
    subject: 'Uw beveiligde aanmeldlink',
    greeting: 'Hallo,',
    body: `U heeft aanmelding bij ${APP_NAME} aangevraagd. Klik op de onderstaande link om toegang te krijgen tot uw ruimte:`,
    expires: 'Deze link verloopt over {minutes} minuten en kan slechts één keer worden gebruikt.',
    ignore: 'Als u dit niet heeft aangevraagd, kunt u deze e-mail negeren.',
  },
  pl: {
    subject: 'Twój bezpieczny link do logowania',
    greeting: 'Cześć,',
    body: `Poprosiłeś o zalogowanie się do ${APP_NAME}. Kliknij poniższy link, aby uzyskać dostęp do swojej przestrzeni:`,
    expires: 'Ten link wygasa za {minutes} minut i może być użyty tylko raz.',
    ignore: 'Jeśli nie wysłałeś tego żądania, zignoruj tego e-maila.',
  },
  ru: {
    subject: 'Ваша безопасная ссылка для входа',
    greeting: 'Здравствуйте,',
    body: `Вы запросили вход в ${APP_NAME}. Нажмите на ссылку ниже, чтобы получить доступ к вашему пространству:`,
    expires: 'Эта ссылка истекает через {minutes} минут и может быть использована только один раз.',
    ignore: 'Если вы не отправляли этот запрос, проигнорируйте это письмо.',
  },
  uk: {
    subject: 'Ваше безпечне посилання для входу',
    greeting: 'Вітаємо,',
    body: `Ви запросили вхід до ${APP_NAME}. Натисніть на посилання нижче, щоб отримати доступ до вашого простору:`,
    expires: 'Це посилання дійсне {minutes} хвилин і може бути використане лише один раз.',
    ignore: 'Якщо ви не надсилали цей запит, проігноруйте цей лист.',
  },
  zh: {
    subject: '您的安全登录链接',
    greeting: '您好，',
    body: `您请求登录 ${APP_NAME}。请点击以下链接访问您的空间：`,
    expires: '此链接将在 {minutes} 分钟后过期，且只能使用一次。',
    ignore: '如果您没有发起此请求，请忽略此邮件。',
  },
  hi: {
    subject: 'आपका सुरक्षित साइन-इन लिंक',
    greeting: 'नमस्ते,',
    body: `आपने ${APP_NAME} में साइन इन करने का अनुरोध किया है। अपने स्पेस तक पहुँचने के लिए नीचे दिए गए लिंक पर क्लिक करें:`,
    expires: 'यह लिंक {minutes} मिनट में समाप्त हो जाएगा और केवल एक बार उपयोग किया जा सकता है।',
    ignore: 'यदि आपने यह अनुरोध नहीं किया है, तो कृपया इस ईमेल को अनदेखा करें।',
  },
  ar: {
    subject: 'رابط تسجيل الدخول الآمن الخاص بك',
    greeting: 'مرحبًا،',
    body: `لقد طلبت تسجيل الدخول إلى ${APP_NAME}. انقر على الرابط أدناه للوصول إلى مساحتك:`,
    expires: 'تنتهي صلاحية هذا الرابط خلال {minutes} دقيقة ولا يمكن استخدامه إلا مرة واحدة.',
    ignore: 'إذا لم تكن أنت من أرسل هذا الطلب، يرجى تجاهل هذا البريد الإلكتروني.',
  },
  bn: {
    subject: 'আপনার নিরাপদ সাইন-ইন লিঙ্ক',
    greeting: 'হ্যালো,',
    body: `আপনি ${APP_NAME}-এ সাইন ইন করার অনুরোধ করেছেন। আপনার স্পেসে প্রবেশ করতে নিচের লিঙ্কে ক্লিক করুন:`,
    expires: 'এই লিঙ্কটি {minutes} মিনিটে মেয়াদ শেষ হবে এবং শুধুমাত্র একবার ব্যবহার করা যাবে।',
    ignore: 'আপনি এই অনুরোধ না করলে, এই ইমেলটি উপেক্ষা করুন।',
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
    text: [copy.greeting, '', copy.body, '', params.link, '', expires, '', copy.ignore].join('\n'),
    html: [
      `<p>${escapeHtml(copy.greeting)}</p>`,
      `<p>${escapeHtml(copy.body)}</p>`,
      `<p><a href="${escapeHtml(params.link)}">${escapeHtml(params.link)}</a></p>`,
      `<p>${escapeHtml(expires)}</p>`,
      `<p style="color:#888;font-size:0.9em">${escapeHtml(copy.ignore)}</p>`,
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
