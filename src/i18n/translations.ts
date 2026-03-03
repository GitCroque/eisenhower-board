export type Language = 'en' | 'zh' | 'hi' | 'es' | 'fr' | 'ar' | 'bn' | 'de' | 'it' | 'pt' | 'nl' | 'pl' | 'ru' | 'uk';

export interface Translations {
  // Header
  title: string;
  subtitle: string;

  // Quadrants
  quadrants: {
    urgentImportant: {
      title: string;
      description: string;
    };
    notUrgentImportant: {
      title: string;
      description: string;
    };
    urgentNotImportant: {
      title: string;
      description: string;
    };
    notUrgentNotImportant: {
      title: string;
      description: string;
    };
  };

  // Axes
  axes: {
    important: string;
    notImportant: string;
    urgent: string;
    notUrgent: string;
  };

  // Tasks
  tasks: {
    noTasks: string;
    addTask: string;
    enterTask: string;
    add: string;
    cancel: string;
    editTask: string;
    deleteTask: string;
    completeTask: string;
  };

  // Theme
  theme: {
    toggle: string;
  };

  // Dialogs
  dialogs: {
    deleteConfirmTitle: string;
    deleteConfirmDescription: string;
    confirm: string;
    cancel: string;
  };

  // Toasts
  toasts: {
    taskAdded: string;
    taskDeleted: string;
    taskMoved: string;
    taskCompleted: string;
    error: string;
  };

  // Error Boundary
  errorBoundary: {
    title: string;
    description: string;
    retry: string;
  };

  // States
  states: {
    loading: string;
    error: string;
    retry: string;
  };

  // Archive
  archive: {
    title: string;
    noTasks: string;
    completedOn: string;
    deleteForever: string;
    backToMatrix: string;
    openArchive: string;
  };

  // Accessibility
  accessibility: {
    selectLanguage: string;
    dismissNotification: string;
  };

  // Auth / Login
  auth: {
    signInTitle: string;
    signInSubtitle: string;
    emailLabel: string;
    sendMagicLink: string;
    sendingLink: string;
    checkInbox: string;
    checkInboxDescription: string;
    linkExpiresIn: string;
    signOut: string;
    signedInAs: string;
  };

  // Landing page
  landing: {
    description: string;
    quadrantsTitle: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    title: 'Eisenhower Matrix',
    subtitle: 'Organize your tasks by priority and urgency',

    quadrants: {
      urgentImportant: {
        title: 'Urgent & Important',
        description: 'Do immediately',
      },
      notUrgentImportant: {
        title: 'Important but Not Urgent',
        description: 'Schedule',
      },
      urgentNotImportant: {
        title: 'Urgent but Not Important',
        description: 'Delegate',
      },
      notUrgentNotImportant: {
        title: 'Neither Urgent nor Important',
        description: 'Eliminate',
      },
    },

    axes: {
      important: 'IMPORTANT',
      notImportant: 'NOT IMPORTANT',
      urgent: 'URGENT',
      notUrgent: 'NOT URGENT',
    },

    tasks: {
      noTasks: 'No tasks',
      addTask: 'Add a task',
      enterTask: 'Enter a task...',
      add: 'Add',
      cancel: 'Cancel',
      editTask: 'Edit task',
      deleteTask: 'Delete task',
      completeTask: 'Complete task',
    },

    theme: {
      toggle: 'Toggle theme',
    },

    dialogs: {
      deleteConfirmTitle: 'Delete task?',
      deleteConfirmDescription: 'This action cannot be undone.',
      confirm: 'Delete',
      cancel: 'Cancel',
    },

    toasts: {
      taskAdded: 'Task added',
      taskDeleted: 'Task deleted',
      taskMoved: 'Task moved',
      taskCompleted: 'Task completed',
      error: 'An error occurred',
    },

    errorBoundary: {
      title: 'Something went wrong',
      description: 'An unexpected error occurred',
      retry: 'Try again',
    },

    states: {
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry',
    },

    archive: {
      title: 'Archived Tasks',
      noTasks: 'No archived tasks',
      completedOn: 'Completed on',
      deleteForever: 'Delete permanently',
      backToMatrix: 'Back to matrix',
      openArchive: 'Open archive',
    },

    accessibility: {
      selectLanguage: 'Select language',
      dismissNotification: 'Dismiss notification',
    },

    auth: {
      signInTitle: 'Sign in to Eisenhower Board',
      signInSubtitle: "Enter your email and we'll send you a secure one-time sign-in link.",
      emailLabel: 'Email',
      sendMagicLink: 'Send magic link',
      sendingLink: 'Sending link...',
      checkInbox: 'Check your inbox',
      checkInboxDescription: 'We sent a sign-in link to',
      linkExpiresIn: 'The link expires in 15 minutes.',
      signOut: 'Sign out',
      signedInAs: 'Signed in as',
    },

    landing: {
      description: 'The Eisenhower Matrix is a productivity method that helps you organize and prioritize tasks by sorting them into four quadrants based on their urgency and importance. Focus on what truly matters and stop wasting time on distractions.',
      quadrantsTitle: 'Four quadrants to organize your priorities',
    },
  },

  fr: {
    title: "Matrice d'Eisenhower",
    subtitle: 'Organisez vos tâches par priorité et urgence',

    quadrants: {
      urgentImportant: {
        title: 'Urgent et Important',
        description: 'À faire immédiatement',
      },
      notUrgentImportant: {
        title: 'Important mais Non-urgent',
        description: 'À planifier',
      },
      urgentNotImportant: {
        title: 'Urgent mais Non-important',
        description: 'À déléguer',
      },
      notUrgentNotImportant: {
        title: 'Ni urgent ni important',
        description: 'À éliminer',
      },
    },

    axes: {
      important: 'IMPORTANT',
      notImportant: 'NON-IMPORTANT',
      urgent: 'URGENT',
      notUrgent: 'NON-URGENT',
    },

    tasks: {
      noTasks: 'Aucune tâche',
      addTask: 'Ajouter une tâche',
      enterTask: 'Entrez une tâche...',
      add: 'Ajouter',
      cancel: 'Annuler',
      editTask: 'Modifier la tâche',
      deleteTask: 'Supprimer la tâche',
      completeTask: 'Terminer la tâche',
    },

    theme: {
      toggle: 'Changer le thème',
    },

    dialogs: {
      deleteConfirmTitle: 'Supprimer la tâche ?',
      deleteConfirmDescription: 'Cette action est irréversible.',
      confirm: 'Supprimer',
      cancel: 'Annuler',
    },

    toasts: {
      taskAdded: 'Tâche ajoutée',
      taskDeleted: 'Tâche supprimée',
      taskMoved: 'Tâche déplacée',
      taskCompleted: 'Tâche terminée',
      error: 'Une erreur est survenue',
    },

    errorBoundary: {
      title: 'Une erreur est survenue',
      description: 'Une erreur inattendue s\'est produite',
      retry: 'Réessayer',
    },

    states: {
      loading: 'Chargement...',
      error: 'Erreur',
      retry: 'Réessayer',
    },

    archive: {
      title: 'Tâches archivées',
      noTasks: 'Aucune tâche archivée',
      completedOn: 'Terminée le',
      deleteForever: 'Supprimer définitivement',
      backToMatrix: 'Retour à la matrice',
      openArchive: 'Ouvrir les archives',
    },

    accessibility: {
      selectLanguage: 'Sélectionner la langue',
      dismissNotification: 'Fermer la notification',
    },

    auth: {
      signInTitle: 'Connexion à Eisenhower Board',
      signInSubtitle: 'Entrez votre email et nous vous enverrons un lien de connexion sécurisé.',
      emailLabel: 'Email',
      sendMagicLink: 'Envoyer le lien magique',
      sendingLink: 'Envoi en cours...',
      checkInbox: 'Vérifiez votre boîte mail',
      checkInboxDescription: 'Nous avons envoyé un lien de connexion à',
      linkExpiresIn: 'Le lien expire dans 15 minutes.',
      signOut: 'Se déconnecter',
      signedInAs: 'Connecté en tant que',
    },

    landing: {
      description: "La matrice d'Eisenhower est une méthode de productivité qui vous aide à organiser et prioriser vos tâches en les classant dans quatre quadrants selon leur urgence et leur importance. Concentrez-vous sur ce qui compte vraiment et cessez de perdre du temps sur les distractions.",
      quadrantsTitle: 'Quatre quadrants pour organiser vos priorités',
    },
  },

  zh: {
    title: '艾森豪威尔矩阵',
    subtitle: '按优先级和紧急程度组织任务',

    quadrants: {
      urgentImportant: {
        title: '紧急且重要',
        description: '立即执行',
      },
      notUrgentImportant: {
        title: '重要但不紧急',
        description: '计划安排',
      },
      urgentNotImportant: {
        title: '紧急但不重要',
        description: '委托他人',
      },
      notUrgentNotImportant: {
        title: '既不紧急也不重要',
        description: '删除',
      },
    },

    axes: {
      important: '重要',
      notImportant: '不重要',
      urgent: '紧急',
      notUrgent: '不紧急',
    },

    tasks: {
      noTasks: '没有任务',
      addTask: '添加任务',
      enterTask: '输入任务...',
      add: '添加',
      cancel: '取消',
      editTask: '编辑任务',
      deleteTask: '删除任务',
      completeTask: '完成任务',
    },

    theme: {
      toggle: '切换主题',
    },

    dialogs: {
      deleteConfirmTitle: '删除任务？',
      deleteConfirmDescription: '此操作无法撤消。',
      confirm: '删除',
      cancel: '取消',
    },

    toasts: {
      taskAdded: '任务已添加',
      taskDeleted: '任务已删除',
      taskMoved: '任务已移动',
      taskCompleted: '任务已完成',
      error: '发生错误',
    },

    errorBoundary: {
      title: '出错了',
      description: '发生了意外错误',
      retry: '重试',
    },

    states: {
      loading: '加载中...',
      error: '错误',
      retry: '重试',
    },

    archive: {
      title: '已归档任务',
      noTasks: '没有已归档的任务',
      completedOn: '完成于',
      deleteForever: '永久删除',
      backToMatrix: '返回矩阵',
      openArchive: '打开归档',
    },

    accessibility: {
      selectLanguage: '选择语言',
      dismissNotification: '关闭通知',
    },

    auth: {
      signInTitle: '登录 Eisenhower Board',
      signInSubtitle: '输入您的邮箱，我们将发送一个安全的一次性登录链接。',
      emailLabel: '邮箱',
      sendMagicLink: '发送魔术链接',
      sendingLink: '正在发送链接...',
      checkInbox: '请查收邮件',
      checkInboxDescription: '我们已向以下邮箱发送了登录链接：',
      linkExpiresIn: '链接将在15分钟后过期。',
      signOut: '退出登录',
      signedInAs: '已登录为',
    },

    landing: {
      description: '艾森豪威尔矩阵是一种生产力方法，通过将任务按紧急程度和重要程度分为四个象限，帮助您组织和优先处理任务。专注于真正重要的事情，不再在干扰上浪费时间。',
      quadrantsTitle: '四个象限组织您的优先事项',
    },
  },

  hi: {
    title: 'आइज़नहावर मैट्रिक्स',
    subtitle: 'प्राथमिकता और तात्कालिकता के अनुसार कार्यों को व्यवस्थित करें',

    quadrants: {
      urgentImportant: {
        title: 'अत्यावश्यक और महत्वपूर्ण',
        description: 'तुरंत करें',
      },
      notUrgentImportant: {
        title: 'महत्वपूर्ण लेकिन अत्यावश्यक नहीं',
        description: 'योजना बनाएं',
      },
      urgentNotImportant: {
        title: 'अत्यावश्यक लेकिन महत्वपूर्ण नहीं',
        description: 'सौंपें',
      },
      notUrgentNotImportant: {
        title: 'न अत्यावश्यक न महत्वपूर्ण',
        description: 'हटाएं',
      },
    },

    axes: {
      important: 'महत्वपूर्ण',
      notImportant: 'महत्वपूर्ण नहीं',
      urgent: 'अत्यावश्यक',
      notUrgent: 'अत्यावश्यक नहीं',
    },

    tasks: {
      noTasks: 'कोई कार्य नहीं',
      addTask: 'कार्य जोड़ें',
      enterTask: 'कार्य दर्ज करें...',
      add: 'जोड़ें',
      cancel: 'रद्द करें',
      editTask: 'कार्य संपादित करें',
      deleteTask: 'कार्य हटाएं',
      completeTask: 'कार्य पूर्ण करें',
    },

    theme: {
      toggle: 'थीम बदलें',
    },

    dialogs: {
      deleteConfirmTitle: 'कार्य हटाएं?',
      deleteConfirmDescription: 'यह क्रिया पूर्ववत नहीं की जा सकती।',
      confirm: 'हटाएं',
      cancel: 'रद्द करें',
    },

    toasts: {
      taskAdded: 'कार्य जोड़ा गया',
      taskDeleted: 'कार्य हटाया गया',
      taskMoved: 'कार्य स्थानांतरित',
      taskCompleted: 'कार्य पूर्ण',
      error: 'एक त्रुटि हुई',
    },

    errorBoundary: {
      title: 'कुछ गलत हो गया',
      description: 'एक अनपेक्षित त्रुटि हुई',
      retry: 'पुनः प्रयास करें',
    },

    states: {
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      retry: 'पुनः प्रयास करें',
    },

    archive: {
      title: 'संग्रहीत कार्य',
      noTasks: 'कोई संग्रहीत कार्य नहीं',
      completedOn: 'पूर्ण हुआ',
      deleteForever: 'स्थायी रूप से हटाएं',
      backToMatrix: 'मैट्रिक्स पर वापस जाएं',
      openArchive: 'संग्रह खोलें',
    },

    accessibility: {
      selectLanguage: 'भाषा चुनें',
      dismissNotification: 'सूचना बंद करें',
    },

    auth: {
      signInTitle: 'Eisenhower Board में साइन इन करें',
      signInSubtitle: 'अपना ईमेल दर्ज करें और हम आपको एक सुरक्षित साइन-इन लिंक भेजेंगे।',
      emailLabel: 'ईमेल',
      sendMagicLink: 'मैजिक लिंक भेजें',
      sendingLink: 'लिंक भेजा जा रहा है...',
      checkInbox: 'अपना इनबॉक्स जांचें',
      checkInboxDescription: 'हमने साइन-इन लिंक भेजा है',
      linkExpiresIn: 'लिंक 15 मिनट में समाप्त हो जाएगा।',
      signOut: 'साइन आउट',
      signedInAs: 'लॉग इन',
    },

    landing: {
      description: 'आइज़नहावर मैट्रिक्स एक उत्पादकता विधि है जो आपके कार्यों को उनकी तात्कालिकता और महत्व के आधार पर चार भागों में वर्गीकृत करके उन्हें व्यवस्थित और प्राथमिकता देने में मदद करती है। जो वास्तव में मायने रखता है उस पर ध्यान दें।',
      quadrantsTitle: 'अपनी प्राथमिकताओं को व्यवस्थित करने के लिए चार भाग',
    },
  },

  es: {
    title: 'Matriz de Eisenhower',
    subtitle: 'Organiza tus tareas por prioridad y urgencia',

    quadrants: {
      urgentImportant: {
        title: 'Urgente e Importante',
        description: 'Hacer inmediatamente',
      },
      notUrgentImportant: {
        title: 'Importante pero No Urgente',
        description: 'Programar',
      },
      urgentNotImportant: {
        title: 'Urgente pero No Importante',
        description: 'Delegar',
      },
      notUrgentNotImportant: {
        title: 'Ni Urgente ni Importante',
        description: 'Eliminar',
      },
    },

    axes: {
      important: 'IMPORTANTE',
      notImportant: 'NO IMPORTANTE',
      urgent: 'URGENTE',
      notUrgent: 'NO URGENTE',
    },

    tasks: {
      noTasks: 'Sin tareas',
      addTask: 'Añadir tarea',
      enterTask: 'Escribe una tarea...',
      add: 'Añadir',
      cancel: 'Cancelar',
      editTask: 'Editar tarea',
      deleteTask: 'Eliminar tarea',
      completeTask: 'Completar tarea',
    },

    theme: {
      toggle: 'Cambiar tema',
    },

    dialogs: {
      deleteConfirmTitle: '¿Eliminar tarea?',
      deleteConfirmDescription: 'Esta acción no se puede deshacer.',
      confirm: 'Eliminar',
      cancel: 'Cancelar',
    },

    toasts: {
      taskAdded: 'Tarea añadida',
      taskDeleted: 'Tarea eliminada',
      taskMoved: 'Tarea movida',
      taskCompleted: 'Tarea completada',
      error: 'Ocurrió un error',
    },

    errorBoundary: {
      title: 'Algo salió mal',
      description: 'Ocurrió un error inesperado',
      retry: 'Intentar de nuevo',
    },

    states: {
      loading: 'Cargando...',
      error: 'Error',
      retry: 'Reintentar',
    },

    archive: {
      title: 'Tareas archivadas',
      noTasks: 'No hay tareas archivadas',
      completedOn: 'Completada el',
      deleteForever: 'Eliminar permanentemente',
      backToMatrix: 'Volver a la matriz',
      openArchive: 'Abrir archivo',
    },

    accessibility: {
      selectLanguage: 'Seleccionar idioma',
      dismissNotification: 'Cerrar notificación',
    },

    auth: {
      signInTitle: 'Iniciar sesión en Eisenhower Board',
      signInSubtitle: 'Ingresa tu email y te enviaremos un enlace seguro de inicio de sesión.',
      emailLabel: 'Email',
      sendMagicLink: 'Enviar enlace mágico',
      sendingLink: 'Enviando enlace...',
      checkInbox: 'Revisa tu bandeja de entrada',
      checkInboxDescription: 'Enviamos un enlace de inicio de sesión a',
      linkExpiresIn: 'El enlace expira en 15 minutos.',
      signOut: 'Cerrar sesión',
      signedInAs: 'Conectado como',
    },

    landing: {
      description: 'La Matriz de Eisenhower es un método de productividad que te ayuda a organizar y priorizar tareas clasificándolas en cuatro cuadrantes según su urgencia e importancia. Concéntrate en lo que realmente importa y deja de perder tiempo en distracciones.',
      quadrantsTitle: 'Cuatro cuadrantes para organizar tus prioridades',
    },
  },

  ar: {
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
  },

  bn: {
    title: 'আইজেনহাওয়ার ম্যাট্রিক্স',
    subtitle: 'অগ্রাধিকার এবং জরুরিতা অনুসারে কাজগুলি সংগঠিত করুন',

    quadrants: {
      urgentImportant: {
        title: 'জরুরি এবং গুরুত্বপূর্ণ',
        description: 'এখনই করুন',
      },
      notUrgentImportant: {
        title: 'গুরুত্বপূর্ণ কিন্তু জরুরি নয়',
        description: 'পরিকল্পনা করুন',
      },
      urgentNotImportant: {
        title: 'জরুরি কিন্তু গুরুত্বপূর্ণ নয়',
        description: 'অর্পণ করুন',
      },
      notUrgentNotImportant: {
        title: 'জরুরি নয় এবং গুরুত্বপূর্ণ নয়',
        description: 'বাদ দিন',
      },
    },

    axes: {
      important: 'গুরুত্বপূর্ণ',
      notImportant: 'গুরুত্বপূর্ণ নয়',
      urgent: 'জরুরি',
      notUrgent: 'জরুরি নয়',
    },

    tasks: {
      noTasks: 'কোনো কাজ নেই',
      addTask: 'কাজ যোগ করুন',
      enterTask: 'একটি কাজ লিখুন...',
      add: 'যোগ করুন',
      cancel: 'বাতিল',
      editTask: 'কাজ সম্পাদনা করুন',
      deleteTask: 'কাজ মুছুন',
      completeTask: 'কাজ সম্পূর্ণ করুন',
    },

    theme: {
      toggle: 'থিম পরিবর্তন করুন',
    },

    dialogs: {
      deleteConfirmTitle: 'কাজ মুছুন?',
      deleteConfirmDescription: 'এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না।',
      confirm: 'মুছুন',
      cancel: 'বাতিল',
    },

    toasts: {
      taskAdded: 'কাজ যোগ হয়েছে',
      taskDeleted: 'কাজ মুছে ফেলা হয়েছে',
      taskMoved: 'কাজ সরানো হয়েছে',
      taskCompleted: 'কাজ সম্পন্ন',
      error: 'একটি ত্রুটি ঘটেছে',
    },

    errorBoundary: {
      title: 'কিছু ভুল হয়েছে',
      description: 'একটি অপ্রত্যাশিত ত্রুটি ঘটেছে',
      retry: 'আবার চেষ্টা করুন',
    },

    states: {
      loading: 'লোড হচ্ছে...',
      error: 'ত্রুটি',
      retry: 'পুনরায় চেষ্টা করুন',
    },

    archive: {
      title: 'সংরক্ষিত কাজ',
      noTasks: 'কোনো সংরক্ষিত কাজ নেই',
      completedOn: 'সম্পন্ন হয়েছে',
      deleteForever: 'স্থায়ীভাবে মুছুন',
      backToMatrix: 'ম্যাট্রিক্সে ফিরে যান',
      openArchive: 'সংরক্ষণাগার খুলুন',
    },

    accessibility: {
      selectLanguage: 'ভাষা নির্বাচন করুন',
      dismissNotification: 'বিজ্ঞপ্তি বন্ধ করুন',
    },

    auth: {
      signInTitle: 'Eisenhower Board-এ সাইন ইন করুন',
      signInSubtitle: 'আপনার ইমেল দিন এবং আমরা আপনাকে একটি নিরাপদ সাইন-ইন লিংক পাঠাব।',
      emailLabel: 'ইমেল',
      sendMagicLink: 'ম্যাজিক লিংক পাঠান',
      sendingLink: 'লিংক পাঠানো হচ্ছে...',
      checkInbox: 'আপনার ইনবক্স দেখুন',
      checkInboxDescription: 'আমরা সাইন-ইন লিংক পাঠিয়েছি',
      linkExpiresIn: 'লিংকটি ১৫ মিনিটে মেয়াদ শেষ হবে।',
      signOut: 'সাইন আউট',
      signedInAs: 'লগ ইন হয়েছে',
    },

    landing: {
      description: 'আইজেনহাওয়ার ম্যাট্রিক্স একটি উৎপাদনশীলতা পদ্ধতি যা আপনার কাজগুলিকে জরুরিতা এবং গুরুত্বের ভিত্তিতে চারটি ভাগে ভাগ করে সংগঠিত এবং অগ্রাধিকার দিতে সাহায্য করে। যা সত্যিই গুরুত্বপূর্ণ তার উপর মনোযোগ দিন।',
      quadrantsTitle: 'আপনার অগ্রাধিকার সংগঠিত করতে চারটি ভাগ',
    },
  },

  de: {
    title: 'Eisenhower-Matrix',
    subtitle: 'Organisiere deine Aufgaben nach Priorität und Dringlichkeit',

    quadrants: {
      urgentImportant: {
        title: 'Dringend & Wichtig',
        description: 'Sofort erledigen',
      },
      notUrgentImportant: {
        title: 'Wichtig, aber nicht dringend',
        description: 'Planen',
      },
      urgentNotImportant: {
        title: 'Dringend, aber nicht wichtig',
        description: 'Delegieren',
      },
      notUrgentNotImportant: {
        title: 'Weder dringend noch wichtig',
        description: 'Eliminieren',
      },
    },

    axes: {
      important: 'WICHTIG',
      notImportant: 'NICHT WICHTIG',
      urgent: 'DRINGEND',
      notUrgent: 'NICHT DRINGEND',
    },

    tasks: {
      noTasks: 'Keine Aufgaben',
      addTask: 'Aufgabe hinzufügen',
      enterTask: 'Aufgabe eingeben...',
      add: 'Hinzufügen',
      cancel: 'Abbrechen',
      editTask: 'Aufgabe bearbeiten',
      deleteTask: 'Aufgabe löschen',
      completeTask: 'Aufgabe abschließen',
    },

    theme: {
      toggle: 'Design wechseln',
    },

    dialogs: {
      deleteConfirmTitle: 'Aufgabe löschen?',
      deleteConfirmDescription: 'Diese Aktion kann nicht rückgängig gemacht werden.',
      confirm: 'Löschen',
      cancel: 'Abbrechen',
    },

    toasts: {
      taskAdded: 'Aufgabe hinzugefügt',
      taskDeleted: 'Aufgabe gelöscht',
      taskMoved: 'Aufgabe verschoben',
      taskCompleted: 'Aufgabe abgeschlossen',
      error: 'Ein Fehler ist aufgetreten',
    },

    errorBoundary: {
      title: 'Etwas ist schiefgelaufen',
      description: 'Ein unerwarteter Fehler ist aufgetreten',
      retry: 'Erneut versuchen',
    },

    states: {
      loading: 'Laden...',
      error: 'Fehler',
      retry: 'Erneut versuchen',
    },

    archive: {
      title: 'Archivierte Aufgaben',
      noTasks: 'Keine archivierten Aufgaben',
      completedOn: 'Abgeschlossen am',
      deleteForever: 'Endgültig löschen',
      backToMatrix: 'Zurück zur Matrix',
      openArchive: 'Archiv öffnen',
    },

    accessibility: {
      selectLanguage: 'Sprache auswählen',
      dismissNotification: 'Benachrichtigung schließen',
    },

    auth: {
      signInTitle: 'Bei Eisenhower Board anmelden',
      signInSubtitle: 'Gib deine E-Mail ein und wir senden dir einen sicheren Anmeldelink.',
      emailLabel: 'E-Mail',
      sendMagicLink: 'Magic Link senden',
      sendingLink: 'Link wird gesendet...',
      checkInbox: 'Prüfe dein Postfach',
      checkInboxDescription: 'Wir haben einen Anmeldelink gesendet an',
      linkExpiresIn: 'Der Link läuft in 15 Minuten ab.',
      signOut: 'Abmelden',
      signedInAs: 'Angemeldet als',
    },

    landing: {
      description: 'Die Eisenhower-Matrix ist eine Produktivitätsmethode, die dir hilft, Aufgaben nach Dringlichkeit und Wichtigkeit in vier Quadranten einzuteilen und zu priorisieren. Konzentriere dich auf das, was wirklich zählt, und verschwende keine Zeit mit Ablenkungen.',
      quadrantsTitle: 'Vier Quadranten für deine Prioritäten',
    },
  },

  it: {
    title: 'Matrice di Eisenhower',
    subtitle: 'Organizza le tue attività per priorità e urgenza',

    quadrants: {
      urgentImportant: {
        title: 'Urgente e Importante',
        description: 'Fai subito',
      },
      notUrgentImportant: {
        title: 'Importante ma Non Urgente',
        description: 'Pianifica',
      },
      urgentNotImportant: {
        title: 'Urgente ma Non Importante',
        description: 'Delega',
      },
      notUrgentNotImportant: {
        title: 'Né Urgente né Importante',
        description: 'Elimina',
      },
    },

    axes: {
      important: 'IMPORTANTE',
      notImportant: 'NON IMPORTANTE',
      urgent: 'URGENTE',
      notUrgent: 'NON URGENTE',
    },

    tasks: {
      noTasks: 'Nessuna attività',
      addTask: 'Aggiungi attività',
      enterTask: 'Inserisci un\'attività...',
      add: 'Aggiungi',
      cancel: 'Annulla',
      editTask: 'Modifica attività',
      deleteTask: 'Elimina attività',
      completeTask: 'Completa attività',
    },

    theme: {
      toggle: 'Cambia tema',
    },

    dialogs: {
      deleteConfirmTitle: 'Eliminare attività?',
      deleteConfirmDescription: 'Questa azione non può essere annullata.',
      confirm: 'Elimina',
      cancel: 'Annulla',
    },

    toasts: {
      taskAdded: 'Attività aggiunta',
      taskDeleted: 'Attività eliminata',
      taskMoved: 'Attività spostata',
      taskCompleted: 'Attività completata',
      error: 'Si è verificato un errore',
    },

    errorBoundary: {
      title: 'Qualcosa è andato storto',
      description: 'Si è verificato un errore imprevisto',
      retry: 'Riprova',
    },

    states: {
      loading: 'Caricamento...',
      error: 'Errore',
      retry: 'Riprova',
    },

    archive: {
      title: 'Attività archiviate',
      noTasks: 'Nessuna attività archiviata',
      completedOn: 'Completata il',
      deleteForever: 'Elimina definitivamente',
      backToMatrix: 'Torna alla matrice',
      openArchive: 'Apri archivio',
    },

    accessibility: {
      selectLanguage: 'Seleziona lingua',
      dismissNotification: 'Chiudi notifica',
    },

    auth: {
      signInTitle: 'Accedi a Eisenhower Board',
      signInSubtitle: 'Inserisci la tua email e ti invieremo un link di accesso sicuro.',
      emailLabel: 'Email',
      sendMagicLink: 'Invia magic link',
      sendingLink: 'Invio in corso...',
      checkInbox: 'Controlla la posta',
      checkInboxDescription: 'Abbiamo inviato un link di accesso a',
      linkExpiresIn: 'Il link scade tra 15 minuti.',
      signOut: 'Esci',
      signedInAs: 'Connesso come',
    },

    landing: {
      description: 'La Matrice di Eisenhower è un metodo di produttività che ti aiuta a organizzare e dare priorità alle attività classificandole in quattro quadranti in base alla loro urgenza e importanza. Concentrati su ciò che conta davvero e smetti di perdere tempo con le distrazioni.',
      quadrantsTitle: 'Quattro quadranti per organizzare le tue priorità',
    },
  },

  pt: {
    title: 'Matriz de Eisenhower',
    subtitle: 'Organize suas tarefas por prioridade e urgência',

    quadrants: {
      urgentImportant: {
        title: 'Urgente e Importante',
        description: 'Fazer imediatamente',
      },
      notUrgentImportant: {
        title: 'Importante mas Não Urgente',
        description: 'Agendar',
      },
      urgentNotImportant: {
        title: 'Urgente mas Não Importante',
        description: 'Delegar',
      },
      notUrgentNotImportant: {
        title: 'Nem Urgente nem Importante',
        description: 'Eliminar',
      },
    },

    axes: {
      important: 'IMPORTANTE',
      notImportant: 'NÃO IMPORTANTE',
      urgent: 'URGENTE',
      notUrgent: 'NÃO URGENTE',
    },

    tasks: {
      noTasks: 'Sem tarefas',
      addTask: 'Adicionar tarefa',
      enterTask: 'Digite uma tarefa...',
      add: 'Adicionar',
      cancel: 'Cancelar',
      editTask: 'Editar tarefa',
      deleteTask: 'Excluir tarefa',
      completeTask: 'Concluir tarefa',
    },

    theme: {
      toggle: 'Mudar tema',
    },

    dialogs: {
      deleteConfirmTitle: 'Excluir tarefa?',
      deleteConfirmDescription: 'Esta ação não pode ser desfeita.',
      confirm: 'Excluir',
      cancel: 'Cancelar',
    },

    toasts: {
      taskAdded: 'Tarefa adicionada',
      taskDeleted: 'Tarefa excluída',
      taskMoved: 'Tarefa movida',
      taskCompleted: 'Tarefa concluída',
      error: 'Ocorreu um erro',
    },

    errorBoundary: {
      title: 'Algo deu errado',
      description: 'Ocorreu um erro inesperado',
      retry: 'Tentar novamente',
    },

    states: {
      loading: 'Carregando...',
      error: 'Erro',
      retry: 'Tentar novamente',
    },

    archive: {
      title: 'Tarefas arquivadas',
      noTasks: 'Nenhuma tarefa arquivada',
      completedOn: 'Concluída em',
      deleteForever: 'Excluir permanentemente',
      backToMatrix: 'Voltar à matriz',
      openArchive: 'Abrir arquivo',
    },

    accessibility: {
      selectLanguage: 'Selecionar idioma',
      dismissNotification: 'Fechar notificação',
    },

    auth: {
      signInTitle: 'Entrar no Eisenhower Board',
      signInSubtitle: 'Digite seu email e enviaremos um link seguro de login.',
      emailLabel: 'Email',
      sendMagicLink: 'Enviar link mágico',
      sendingLink: 'Enviando link...',
      checkInbox: 'Verifique sua caixa de entrada',
      checkInboxDescription: 'Enviamos um link de login para',
      linkExpiresIn: 'O link expira em 15 minutos.',
      signOut: 'Sair',
      signedInAs: 'Conectado como',
    },

    landing: {
      description: 'A Matriz de Eisenhower é um método de produtividade que ajuda você a organizar e priorizar tarefas classificando-as em quatro quadrantes com base na urgência e importância. Foque no que realmente importa e pare de perder tempo com distrações.',
      quadrantsTitle: 'Quatro quadrantes para organizar suas prioridades',
    },
  },

  nl: {
    title: 'Eisenhower-matrix',
    subtitle: 'Organiseer je taken op prioriteit en urgentie',

    quadrants: {
      urgentImportant: {
        title: 'Urgent & Belangrijk',
        description: 'Direct doen',
      },
      notUrgentImportant: {
        title: 'Belangrijk maar Niet Urgent',
        description: 'Plannen',
      },
      urgentNotImportant: {
        title: 'Urgent maar Niet Belangrijk',
        description: 'Delegeren',
      },
      notUrgentNotImportant: {
        title: 'Niet Urgent en Niet Belangrijk',
        description: 'Elimineren',
      },
    },

    axes: {
      important: 'BELANGRIJK',
      notImportant: 'NIET BELANGRIJK',
      urgent: 'URGENT',
      notUrgent: 'NIET URGENT',
    },

    tasks: {
      noTasks: 'Geen taken',
      addTask: 'Taak toevoegen',
      enterTask: 'Voer een taak in...',
      add: 'Toevoegen',
      cancel: 'Annuleren',
      editTask: 'Taak bewerken',
      deleteTask: 'Taak verwijderen',
      completeTask: 'Taak voltooien',
    },

    theme: {
      toggle: 'Thema wisselen',
    },

    dialogs: {
      deleteConfirmTitle: 'Taak verwijderen?',
      deleteConfirmDescription: 'Deze actie kan niet ongedaan worden gemaakt.',
      confirm: 'Verwijderen',
      cancel: 'Annuleren',
    },

    toasts: {
      taskAdded: 'Taak toegevoegd',
      taskDeleted: 'Taak verwijderd',
      taskMoved: 'Taak verplaatst',
      taskCompleted: 'Taak voltooid',
      error: 'Er is een fout opgetreden',
    },

    errorBoundary: {
      title: 'Er ging iets mis',
      description: 'Er is een onverwachte fout opgetreden',
      retry: 'Opnieuw proberen',
    },

    states: {
      loading: 'Laden...',
      error: 'Fout',
      retry: 'Opnieuw proberen',
    },

    archive: {
      title: 'Gearchiveerde taken',
      noTasks: 'Geen gearchiveerde taken',
      completedOn: 'Voltooid op',
      deleteForever: 'Permanent verwijderen',
      backToMatrix: 'Terug naar matrix',
      openArchive: 'Archief openen',
    },

    accessibility: {
      selectLanguage: 'Taal selecteren',
      dismissNotification: 'Melding sluiten',
    },

    auth: {
      signInTitle: 'Inloggen bij Eisenhower Board',
      signInSubtitle: 'Voer je e-mail in en we sturen je een veilige inloglink.',
      emailLabel: 'E-mail',
      sendMagicLink: 'Magic link verzenden',
      sendingLink: 'Link verzenden...',
      checkInbox: 'Controleer je inbox',
      checkInboxDescription: 'We hebben een inloglink gestuurd naar',
      linkExpiresIn: 'De link verloopt over 15 minuten.',
      signOut: 'Uitloggen',
      signedInAs: 'Ingelogd als',
    },

    landing: {
      description: 'De Eisenhower-matrix is een productiviteitsmethode die je helpt taken te organiseren en prioriteren door ze in vier kwadranten in te delen op basis van urgentie en belang. Focus op wat echt belangrijk is en verspil geen tijd aan afleidingen.',
      quadrantsTitle: 'Vier kwadranten om je prioriteiten te organiseren',
    },
  },

  pl: {
    title: 'Macierz Eisenhowera',
    subtitle: 'Organizuj zadania według priorytetu i pilności',

    quadrants: {
      urgentImportant: {
        title: 'Pilne i Ważne',
        description: 'Zrób natychmiast',
      },
      notUrgentImportant: {
        title: 'Ważne, ale Niepilne',
        description: 'Zaplanuj',
      },
      urgentNotImportant: {
        title: 'Pilne, ale Nieważne',
        description: 'Deleguj',
      },
      notUrgentNotImportant: {
        title: 'Ani Pilne, ani Ważne',
        description: 'Wyeliminuj',
      },
    },

    axes: {
      important: 'WAŻNE',
      notImportant: 'NIEWAŻNE',
      urgent: 'PILNE',
      notUrgent: 'NIEPILNE',
    },

    tasks: {
      noTasks: 'Brak zadań',
      addTask: 'Dodaj zadanie',
      enterTask: 'Wpisz zadanie...',
      add: 'Dodaj',
      cancel: 'Anuluj',
      editTask: 'Edytuj zadanie',
      deleteTask: 'Usuń zadanie',
      completeTask: 'Zakończ zadanie',
    },

    theme: {
      toggle: 'Zmień motyw',
    },

    dialogs: {
      deleteConfirmTitle: 'Usunąć zadanie?',
      deleteConfirmDescription: 'Tej czynności nie można cofnąć.',
      confirm: 'Usuń',
      cancel: 'Anuluj',
    },

    toasts: {
      taskAdded: 'Zadanie dodane',
      taskDeleted: 'Zadanie usunięte',
      taskMoved: 'Zadanie przeniesione',
      taskCompleted: 'Zadanie ukończone',
      error: 'Wystąpił błąd',
    },

    errorBoundary: {
      title: 'Coś poszło nie tak',
      description: 'Wystąpił nieoczekiwany błąd',
      retry: 'Spróbuj ponownie',
    },

    states: {
      loading: 'Ładowanie...',
      error: 'Błąd',
      retry: 'Ponów',
    },

    archive: {
      title: 'Zarchiwizowane zadania',
      noTasks: 'Brak zarchiwizowanych zadań',
      completedOn: 'Ukończono',
      deleteForever: 'Usuń na stałe',
      backToMatrix: 'Powrót do macierzy',
      openArchive: 'Otwórz archiwum',
    },

    auth: {
      signInTitle: 'Zaloguj się do Eisenhower Board',
      signInSubtitle: 'Podaj swój e-mail, a wyślemy Ci bezpieczny link do logowania.',
      emailLabel: 'E-mail',
      sendMagicLink: 'Wyślij link',
      sendingLink: 'Wysyłanie linku...',
      checkInbox: 'Sprawdź skrzynkę',
      checkInboxDescription: 'Wysłaliśmy link do logowania na adres',
      linkExpiresIn: 'Link wygasa za 15 minut.',
      signOut: 'Wyloguj się',
      signedInAs: 'Zalogowano jako',
    },

    accessibility: {
      selectLanguage: 'Wybierz język',
      dismissNotification: 'Zamknij powiadomienie',
    },

    landing: {
      description: 'Macierz Eisenhowera to metoda produktywności, która pomaga organizować i priorytetyzować zadania, dzieląc je na cztery ćwiartki na podstawie pilności i ważności. Skup się na tym, co naprawdę ważne i przestań tracić czas na rozpraszacze.',
      quadrantsTitle: 'Cztery ćwiartki do organizacji priorytetów',
    },
  },

  ru: {
    title: 'Матрица Эйзенхауэра',
    subtitle: 'Организуйте задачи по приоритету и срочности',

    quadrants: {
      urgentImportant: {
        title: 'Срочное и Важное',
        description: 'Сделать немедленно',
      },
      notUrgentImportant: {
        title: 'Важное, но Несрочное',
        description: 'Запланировать',
      },
      urgentNotImportant: {
        title: 'Срочное, но Неважное',
        description: 'Делегировать',
      },
      notUrgentNotImportant: {
        title: 'Несрочное и Неважное',
        description: 'Удалить',
      },
    },

    axes: {
      important: 'ВАЖНО',
      notImportant: 'НЕВАЖНО',
      urgent: 'СРОЧНО',
      notUrgent: 'НЕСРОЧНО',
    },

    tasks: {
      noTasks: 'Нет задач',
      addTask: 'Добавить задачу',
      enterTask: 'Введите задачу...',
      add: 'Добавить',
      cancel: 'Отмена',
      editTask: 'Редактировать задачу',
      deleteTask: 'Удалить задачу',
      completeTask: 'Завершить задачу',
    },

    theme: {
      toggle: 'Сменить тему',
    },

    dialogs: {
      deleteConfirmTitle: 'Удалить задачу?',
      deleteConfirmDescription: 'Это действие нельзя отменить.',
      confirm: 'Удалить',
      cancel: 'Отмена',
    },

    toasts: {
      taskAdded: 'Задача добавлена',
      taskDeleted: 'Задача удалена',
      taskMoved: 'Задача перемещена',
      taskCompleted: 'Задача завершена',
      error: 'Произошла ошибка',
    },

    errorBoundary: {
      title: 'Что-то пошло не так',
      description: 'Произошла непредвиденная ошибка',
      retry: 'Попробовать снова',
    },

    states: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      retry: 'Повторить',
    },

    archive: {
      title: 'Архивированные задачи',
      noTasks: 'Нет архивированных задач',
      completedOn: 'Завершено',
      deleteForever: 'Удалить навсегда',
      backToMatrix: 'Вернуться к матрице',
      openArchive: 'Открыть архив',
    },

    auth: {
      signInTitle: 'Войти в Eisenhower Board',
      signInSubtitle: 'Введите email, и мы отправим вам безопасную ссылку для входа.',
      emailLabel: 'Email',
      sendMagicLink: 'Отправить ссылку',
      sendingLink: 'Отправка ссылки...',
      checkInbox: 'Проверьте почту',
      checkInboxDescription: 'Мы отправили ссылку для входа на',
      linkExpiresIn: 'Ссылка действительна 15 минут.',
      signOut: 'Выйти',
      signedInAs: 'Вы вошли как',
    },

    accessibility: {
      selectLanguage: 'Выбрать язык',
      dismissNotification: 'Закрыть уведомление',
    },

    landing: {
      description: 'Матрица Эйзенхауэра — это метод продуктивности, который помогает организовать и приоритизировать задачи, распределяя их по четырём квадрантам на основе срочности и важности. Сосредоточьтесь на том, что действительно важно, и перестаньте тратить время на отвлечения.',
      quadrantsTitle: 'Четыре квадранта для организации приоритетов',
    },
  },

  uk: {
    title: 'Матриця Ейзенхауера',
    subtitle: 'Організуйте завдання за пріоритетом та терміновістю',

    quadrants: {
      urgentImportant: {
        title: 'Термінове та Важливе',
        description: 'Зробити негайно',
      },
      notUrgentImportant: {
        title: 'Важливе, але Нетермінове',
        description: 'Запланувати',
      },
      urgentNotImportant: {
        title: 'Термінове, але Неважливе',
        description: 'Делегувати',
      },
      notUrgentNotImportant: {
        title: 'Нетермінове та Неважливе',
        description: 'Видалити',
      },
    },

    axes: {
      important: 'ВАЖЛИВО',
      notImportant: 'НЕВАЖЛИВО',
      urgent: 'ТЕРМІНОВО',
      notUrgent: 'НЕТЕРМІНОВО',
    },

    tasks: {
      noTasks: 'Немає завдань',
      addTask: 'Додати завдання',
      enterTask: 'Введіть завдання...',
      add: 'Додати',
      cancel: 'Скасувати',
      editTask: 'Редагувати завдання',
      deleteTask: 'Видалити завдання',
      completeTask: 'Завершити завдання',
    },

    theme: {
      toggle: 'Змінити тему',
    },

    dialogs: {
      deleteConfirmTitle: 'Видалити завдання?',
      deleteConfirmDescription: 'Цю дію не можна скасувати.',
      confirm: 'Видалити',
      cancel: 'Скасувати',
    },

    toasts: {
      taskAdded: 'Завдання додано',
      taskDeleted: 'Завдання видалено',
      taskMoved: 'Завдання переміщено',
      taskCompleted: 'Завдання завершено',
      error: 'Сталася помилка',
    },

    errorBoundary: {
      title: 'Щось пішло не так',
      description: 'Сталася неочікувана помилка',
      retry: 'Спробувати знову',
    },

    states: {
      loading: 'Завантаження...',
      error: 'Помилка',
      retry: 'Повторити',
    },

    archive: {
      title: 'Архівовані завдання',
      noTasks: 'Немає архівованих завдань',
      completedOn: 'Завершено',
      deleteForever: 'Видалити назавжди',
      backToMatrix: 'Повернутися до матриці',
      openArchive: 'Відкрити архів',
    },

    auth: {
      signInTitle: 'Увійти в Eisenhower Board',
      signInSubtitle: 'Введіть email, і ми надішлемо вам безпечне посилання для входу.',
      emailLabel: 'Email',
      sendMagicLink: 'Надіслати посилання',
      sendingLink: 'Надсилання посилання...',
      checkInbox: 'Перевірте пошту',
      checkInboxDescription: 'Ми надіслали посилання для входу на',
      linkExpiresIn: 'Посилання дійсне 15 хвилин.',
      signOut: 'Вийти',
      signedInAs: 'Ви увійшли як',
    },

    accessibility: {
      selectLanguage: 'Вибрати мову',
      dismissNotification: 'Закрити сповіщення',
    },

    landing: {
      description: 'Матриця Ейзенхауера — це метод продуктивності, який допомагає організувати та пріоритизувати завдання, розподіляючи їх на чотири квадранти за терміновістю та важливістю. Зосередьтеся на тому, що справді важливо, і перестаньте витрачати час на відволікання.',
      quadrantsTitle: 'Чотири квадранти для організації пріоритетів',
    },
  },
};
