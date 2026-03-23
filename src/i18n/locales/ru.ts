import type { Translations } from '../translations';

const ru: Translations = {
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
    searchPlaceholder: 'Искать в архиве задач',
    allQuadrants: 'Все квадранты',
    applyFilters: 'Применить',
    restoreTask: 'Восстановить задачу',
    previousPage: 'Предыдущая страница',
    nextPage: 'Следующая страница',
    pagePlaceholder: 'Страница',
    goToPage: 'Перейти',
  },

  sessions: {
    title: 'Активные сеансы',
    openSessions: 'Открыть сеансы',
    loading: 'Загрузка сеансов...',
    backToMatrix: 'Вернуться к матрице',
    revokeOtherSessions: 'Завершить другие сеансы',
    revokingOthers: 'Завершение...',
    noSessions: 'Нет активных сеансов.',
    unknownDevice: 'Неизвестное устройство',
    unknownIp: 'Неизвестно',
    current: 'Текущий',
    createdAt: 'Создан',
    lastSeenAt: 'Последняя активность',
    revokeSession: 'Завершить сеанс',
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
    sessionCheckFailedTitle: 'Не удалось проверить сеанс',
    sessionCheckFailedDescription: 'Проверьте подключение и попробуйте снова перед входом.',
    retrySessionCheck: 'Повторить',
  },

  accessibility: {
    selectLanguage: 'Выбрать язык',
    dismissNotification: 'Закрыть уведомление',
  },

  landing: {
    description: 'Матрица Эйзенхауэра — это метод продуктивности, который помогает организовать и приоритизировать задачи, распределяя их по четырём квадрантам на основе срочности и важности. Сосредоточьтесь на том, что действительно важно, и перестаньте тратить время на отвлечения.',
    quadrantsTitle: 'Четыре квадранта для организации приоритетов',
  },

  admin: {
    title: 'Администрирование',
    stats: 'Статистика',
    totalUsers: 'Всего пользователей',
    activeUsers30d: 'Активные пользователи (30 дней)',
    users: 'Пользователи',
    email: 'Электронная почта',
    createdAt: 'Создан',
    lastLoginAt: 'Последний вход',
    taskCount: 'Задачи',
    never: 'Никогда',
    deleteUser: 'Удалить пользователя',
    deleteUserConfirmTitle: 'Удалить пользователя?',
    deleteUserConfirmDescription: 'Все данные пользователя {email} будут безвозвратно удалены. Это действие нельзя отменить.',
    cannotDeleteSelf: 'Вы не можете удалить свой собственный аккаунт отсюда',
    userDeleted: 'Пользователь удалён',
  },

  account: {
    title: 'Аккаунт',
    currentEmail: 'Текущая почта',
    newEmail: 'Новая почта',
    changeEmail: 'Изменить почту',
    changingEmail: 'Изменение...',
    emailChangeRequested: 'Письмо для подтверждения отправлено',
    emailChangeRequestedDescription: 'Проверьте входящие сообщения на новом адресе для подтверждения изменения.',
    emailChanged: 'Почта изменена',
    emailChangedDescription: 'Ваш адрес электронной почты успешно обновлён.',
    dangerZone: 'Опасная зона',
    deleteAccount: 'Удалить мой аккаунт',
    deleteAccountConfirmTitle: 'Удалить ваш аккаунт?',
    deleteAccountConfirmDescription: 'Все ваши задачи и данные будут безвозвратно удалены. Это действие нельзя отменить.',
    deleteAccountTypeEmail: 'Введите свою почту для подтверждения',
    deletingAccount: 'Удаление...',
    accountDeleted: 'Аккаунт удалён',
  },
};

export default ru;
