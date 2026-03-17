import type { Translations } from '../translations';

const pt: Translations = {
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
    searchPlaceholder: 'Pesquisar tarefas arquivadas',
    allQuadrants: 'Todos os quadrantes',
    applyFilters: 'Aplicar',
    restoreTask: 'Restaurar tarefa',
    previousPage: 'Página anterior',
    nextPage: 'Próxima página',
    pagePlaceholder: 'Página',
    goToPage: 'Ir',
  },

  sessions: {
    title: 'Sessões ativas',
    openSessions: 'Abrir sessões',
    loading: 'Carregando sessões...',
    backToMatrix: 'Voltar à matriz',
    revokeOtherSessions: 'Revogar outras sessões',
    revokingOthers: 'Revogando...',
    noSessions: 'Nenhuma sessão ativa.',
    unknownDevice: 'Dispositivo desconhecido',
    unknownIp: 'Desconhecido',
    current: 'Atual',
    createdAt: 'Criada',
    lastSeenAt: 'Última atividade',
    revokeSession: 'Revogar sessão',
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
    sessionCheckFailedTitle: 'Não foi possível verificar sua sessão',
    sessionCheckFailedDescription: 'Verifique sua conexão e tente novamente antes de entrar.',
    retrySessionCheck: 'Tentar novamente',
  },

  landing: {
    description: 'A Matriz de Eisenhower é um método de produtividade que ajuda você a organizar e priorizar tarefas classificando-as em quatro quadrantes com base na urgência e importância. Foque no que realmente importa e pare de perder tempo com distrações.',
    quadrantsTitle: 'Quatro quadrantes para organizar suas prioridades',
  },
};

export default pt;
