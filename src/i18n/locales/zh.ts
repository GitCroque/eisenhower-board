import type { Translations } from '../translations';

const zh: Translations = {
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
    searchPlaceholder: '搜索已归档任务',
    allQuadrants: '所有象限',
    applyFilters: '应用',
    restoreTask: '恢复任务',
    previousPage: '上一页',
    nextPage: '下一页',
    pagePlaceholder: '页码',
    goToPage: '前往',
  },

  sessions: {
    title: '活动会话',
    openSessions: '打开会话',
    loading: '正在加载会话...',
    backToMatrix: '返回矩阵',
    revokeOtherSessions: '撤销其他会话',
    revokingOthers: '正在撤销...',
    noSessions: '没有活动会话。',
    unknownDevice: '未知设备',
    unknownIp: '未知',
    current: '当前',
    createdAt: '创建于',
    lastSeenAt: '最后活动',
    revokeSession: '撤销会话',
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
    sessionCheckFailedTitle: '无法验证您的会话',
    sessionCheckFailedDescription: '请检查网络连接，然后在登录前重试。',
    retrySessionCheck: '重试',
  },

  landing: {
    description: '艾森豪威尔矩阵是一种生产力方法，通过将任务按紧急程度和重要程度分为四个象限，帮助您组织和优先处理任务。专注于真正重要的事情，不再在干扰上浪费时间。',
    quadrantsTitle: '四个象限组织您的优先事项',
  },
};

export default zh;
