import type { Translations } from '../translations';

const ar: Translations = {
  title: 'مصفوفة أيزنهاور',
  subtitle: 'نظّم مهامك حسب الأولوية والإلحاح',

  quadrants: {
    urgentImportant: {
      title: 'عاجل ومهم',
      description: 'افعل فوراً',
    },
    notUrgentImportant: {
      title: 'مهم لكن غير عاجل',
      description: 'جدوِل',
    },
    urgentNotImportant: {
      title: 'عاجل لكن غير مهم',
      description: 'فوّض',
    },
    notUrgentNotImportant: {
      title: 'غير عاجل وغير مهم',
      description: 'احذف',
    },
  },

  axes: {
    important: 'مهم',
    notImportant: 'غير مهم',
    urgent: 'عاجل',
    notUrgent: 'غير عاجل',
  },

  tasks: {
    noTasks: 'لا توجد مهام',
    addTask: 'إضافة مهمة',
    enterTask: 'أدخل مهمة...',
    add: 'إضافة',
    cancel: 'إلغاء',
    editTask: 'تعديل المهمة',
    deleteTask: 'حذف المهمة',
    completeTask: 'إكمال المهمة',
  },

  theme: {
    toggle: 'تغيير المظهر',
  },

  dialogs: {
    deleteConfirmTitle: 'حذف المهمة؟',
    deleteConfirmDescription: 'لا يمكن التراجع عن هذا الإجراء.',
    confirm: 'حذف',
    cancel: 'إلغاء',
  },

  toasts: {
    taskAdded: 'تمت إضافة المهمة',
    taskDeleted: 'تم حذف المهمة',
    taskMoved: 'تم نقل المهمة',
    taskCompleted: 'تم إكمال المهمة',
    error: 'حدث خطأ',
  },

  errorBoundary: {
    title: 'حدث خطأ ما',
    description: 'حدث خطأ غير متوقع',
    retry: 'حاول مرة أخرى',
  },

  states: {
    loading: 'جارٍ التحميل...',
    error: 'خطأ',
    retry: 'إعادة المحاولة',
  },

  archive: {
    title: 'المهام المؤرشفة',
    noTasks: 'لا توجد مهام مؤرشفة',
    completedOn: 'اكتملت في',
    deleteForever: 'حذف نهائياً',
    backToMatrix: 'العودة إلى المصفوفة',
    openArchive: 'فتح الأرشيف',
  },

  accessibility: {
    selectLanguage: 'اختر اللغة',
    dismissNotification: 'إغلاق الإشعار',
  },

  auth: {
    signInTitle: 'تسجيل الدخول إلى Eisenhower Board',
    signInSubtitle: 'أدخل بريدك الإلكتروني وسنرسل لك رابط تسجيل دخول آمن.',
    emailLabel: 'البريد الإلكتروني',
    sendMagicLink: 'إرسال الرابط السحري',
    sendingLink: 'جارٍ إرسال الرابط...',
    checkInbox: 'تحقق من صندوق الوارد',
    checkInboxDescription: 'أرسلنا رابط تسجيل الدخول إلى',
    linkExpiresIn: 'تنتهي صلاحية الرابط خلال 15 دقيقة.',
    signOut: 'تسجيل الخروج',
    signedInAs: 'مسجل الدخول باسم',
  },

  landing: {
    description: 'مصفوفة أيزنهاور هي أداة إنتاجية تساعدك على تنظيم مهامك وترتيب أولوياتها عن طريق تصنيفها في أربعة أرباع حسب الإلحاح والأهمية. ركّز على ما يهم حقاً وتوقف عن إضاعة الوقت في المشتتات.',
    quadrantsTitle: 'أربعة أرباع لتنظيم أولوياتك',
  },
};

export default ar;
