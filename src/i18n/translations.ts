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
    },

    archive: {
      title: 'Zarchiwizowane zadania',
      noTasks: 'Brak zarchiwizowanych zadań',
      completedOn: 'Ukończono',
      deleteForever: 'Usuń na stałe',
      backToMatrix: 'Powrót do macierzy',
      openArchive: 'Otwórz archiwum',
    },

    accessibility: {
      selectLanguage: 'Wybierz język',
      dismissNotification: 'Zamknij powiadomienie',
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
    },

    archive: {
      title: 'Архивированные задачи',
      noTasks: 'Нет архивированных задач',
      completedOn: 'Завершено',
      deleteForever: 'Удалить навсегда',
      backToMatrix: 'Вернуться к матрице',
      openArchive: 'Открыть архив',
    },

    accessibility: {
      selectLanguage: 'Выбрать язык',
      dismissNotification: 'Закрыть уведомление',
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
    },

    archive: {
      title: 'Архівовані завдання',
      noTasks: 'Немає архівованих завдань',
      completedOn: 'Завершено',
      deleteForever: 'Видалити назавжди',
      backToMatrix: 'Повернутися до матриці',
      openArchive: 'Відкрити архів',
    },

    accessibility: {
      selectLanguage: 'Вибрати мову',
      dismissNotification: 'Закрити сповіщення',
    },
  },
};
