import type { Translations } from '../translations';

const uk: Translations = {
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
    searchPlaceholder: 'Шукати в архіві завдань',
    allQuadrants: 'Усі квадранти',
    applyFilters: 'Застосувати',
    restoreTask: 'Відновити завдання',
    previousPage: 'Попередня сторінка',
    nextPage: 'Наступна сторінка',
    pagePlaceholder: 'Сторінка',
    goToPage: 'Перейти',
  },

  sessions: {
    title: 'Активні сесії',
    openSessions: 'Відкрити сесії',
    loading: 'Завантаження сесій...',
    backToMatrix: 'Повернутися до матриці',
    revokeOtherSessions: 'Завершити інші сесії',
    revokingOthers: 'Завершення...',
    noSessions: 'Немає активних сесій.',
    unknownDevice: 'Невідомий пристрій',
    unknownIp: 'Невідомо',
    current: 'Поточна',
    createdAt: 'Створено',
    lastSeenAt: 'Остання активність',
    revokeSession: 'Завершити сесію',
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
    sessionCheckFailedTitle: 'Не вдалося перевірити сесію',
    sessionCheckFailedDescription: 'Перевірте зʼєднання та спробуйте знову перед входом.',
    retrySessionCheck: 'Повторити',
  },

  accessibility: {
    selectLanguage: 'Вибрати мову',
    dismissNotification: 'Закрити сповіщення',
  },

  landing: {
    description: 'Матриця Ейзенхауера — це метод продуктивності, який допомагає організувати та пріоритизувати завдання, розподіляючи їх на чотири квадранти за терміновістю та важливістю. Зосередьтеся на тому, що справді важливо, і перестаньте витрачати час на відволікання.',
    quadrantsTitle: 'Чотири квадранти для організації пріоритетів',
  },
};

export default uk;
