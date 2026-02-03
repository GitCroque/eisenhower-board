export type Language = 'en' | 'zh' | 'hi' | 'es' | 'fr' | 'ar' | 'bn';

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

  // States
  states: {
    loading: string;
    error: string;
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

    states: {
      loading: 'Loading...',
      error: 'Error',
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

    states: {
      loading: 'Chargement...',
      error: 'Erreur',
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

    states: {
      loading: '加载中...',
      error: '错误',
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

    states: {
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
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

    states: {
      loading: 'Cargando...',
      error: 'Error',
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

    states: {
      loading: 'جارٍ التحميل...',
      error: 'خطأ',
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

    states: {
      loading: 'লোড হচ্ছে...',
      error: 'ত্রুটি',
    },
  },
};
