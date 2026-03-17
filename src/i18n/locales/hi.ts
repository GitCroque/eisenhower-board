import type { Translations } from '../translations';

const hi: Translations = {
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
    searchPlaceholder: 'संग्रहीत कार्य खोजें',
    allQuadrants: 'सभी चतुर्थांश',
    applyFilters: 'लागू करें',
    restoreTask: 'कार्य पुनर्स्थापित करें',
    previousPage: 'पिछला पृष्ठ',
    nextPage: 'अगला पृष्ठ',
    pagePlaceholder: 'पृष्ठ',
    goToPage: 'जाएँ',
  },

  sessions: {
    title: 'सक्रिय सत्र',
    openSessions: 'सत्र खोलें',
    loading: 'सत्र लोड हो रहे हैं...',
    backToMatrix: 'मैट्रिक्स पर वापस जाएं',
    revokeOtherSessions: 'अन्य सत्र रद्द करें',
    revokingOthers: 'रद्द किया जा रहा है...',
    noSessions: 'कोई सक्रिय सत्र नहीं।',
    unknownDevice: 'अज्ञात डिवाइस',
    unknownIp: 'अज्ञात',
    current: 'वर्तमान',
    createdAt: 'बनाया गया',
    lastSeenAt: 'अंतिम गतिविधि',
    revokeSession: 'सत्र रद्द करें',
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
    sessionCheckFailedTitle: 'आपके सत्र की पुष्टि नहीं हो सकी',
    sessionCheckFailedDescription: 'साइन इन करने से पहले अपना कनेक्शन जांचें और फिर से प्रयास करें।',
    retrySessionCheck: 'फिर से प्रयास करें',
  },

  landing: {
    description: 'आइज़नहावर मैट्रिक्स एक उत्पादकता विधि है जो आपके कार्यों को उनकी तात्कालिकता और महत्व के आधार पर चार भागों में वर्गीकृत करके उन्हें व्यवस्थित और प्राथमिकता देने में मदद करती है। जो वास्तव में मायने रखता है उस पर ध्यान दें।',
    quadrantsTitle: 'अपनी प्राथमिकताओं को व्यवस्थित करने के लिए चार भाग',
  },
};

export default hi;
