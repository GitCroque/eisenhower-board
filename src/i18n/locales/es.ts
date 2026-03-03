import type { Translations } from '../translations';

const es: Translations = {
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
};

export default es;
