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

    states: {
      loading: 'Laden...',
      error: 'Fehler',
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

    states: {
      loading: 'Caricamento...',
      error: 'Errore',
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

    states: {
      loading: 'Carregando...',
      error: 'Erro',
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

    states: {
      loading: 'Laden...',
      error: 'Fout',
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

    states: {
      loading: 'Ładowanie...',
      error: 'Błąd',
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

    states: {
      loading: 'Загрузка...',
      error: 'Ошибка',
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

    states: {
      loading: 'Завантаження...',
      error: 'Помилка',
    },
  },
};
