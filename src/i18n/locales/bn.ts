import type { Translations } from '../translations';

const bn: Translations = {
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
    searchPlaceholder: 'সংরক্ষিত কাজ খুঁজুন',
    allQuadrants: 'সব চতুর্ভুজ',
    applyFilters: 'প্রয়োগ করুন',
    restoreTask: 'কাজ পুনরুদ্ধার করুন',
    previousPage: 'আগের পৃষ্ঠা',
    nextPage: 'পরের পৃষ্ঠা',
    pagePlaceholder: 'পৃষ্ঠা',
    goToPage: 'যান',
  },

  sessions: {
    title: 'সক্রিয় সেশন',
    openSessions: 'সেশন খুলুন',
    loading: 'সেশন লোড হচ্ছে...',
    backToMatrix: 'ম্যাট্রিক্সে ফিরে যান',
    revokeOtherSessions: 'অন্যান্য সেশন বাতিল করুন',
    revokingOthers: 'বাতিল করা হচ্ছে...',
    noSessions: 'কোনো সক্রিয় সেশন নেই।',
    unknownDevice: 'অজানা ডিভাইস',
    unknownIp: 'অজানা',
    current: 'বর্তমান',
    createdAt: 'তৈরি হয়েছে',
    lastSeenAt: 'সর্বশেষ কার্যকলাপ',
    revokeSession: 'সেশন বাতিল করুন',
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
    sessionCheckFailedTitle: 'আপনার সেশন যাচাই করা যায়নি',
    sessionCheckFailedDescription: 'সাইন ইন করার আগে আপনার সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।',
    retrySessionCheck: 'আবার চেষ্টা করুন',
  },

  landing: {
    description: 'আইজেনহাওয়ার ম্যাট্রিক্স একটি উৎপাদনশীলতা পদ্ধতি যা আপনার কাজগুলিকে জরুরিতা এবং গুরুত্বের ভিত্তিতে চারটি ভাগে ভাগ করে সংগঠিত এবং অগ্রাধিকার দিতে সাহায্য করে। যা সত্যিই গুরুত্বপূর্ণ তার উপর মনোযোগ দিন।',
    quadrantsTitle: 'আপনার অগ্রাধিকার সংগঠিত করতে চারটি ভাগ',
  },

  admin: {
    title: 'প্রশাসন',
    stats: 'পরিসংখ্যান',
    totalUsers: 'মোট ব্যবহারকারী',
    activeUsers30d: 'সক্রিয় ব্যবহারকারী (৩০ দিন)',
    users: 'ব্যবহারকারী',
    email: 'ইমেল',
    createdAt: 'তৈরির তারিখ',
    lastLoginAt: 'সর্বশেষ লগইন',
    taskCount: 'কাজ',
    never: 'কখনো না',
    deleteUser: 'ব্যবহারকারী মুছুন',
    deleteUserConfirmTitle: 'ব্যবহারকারী মুছুন?',
    deleteUserConfirmDescription: '{email}-এর সমস্ত ডেটা স্থায়ীভাবে মুছে ফেলা হবে। এটি পূর্বাবস্থায় ফেরানো যাবে না।',
    cannotDeleteSelf: 'আপনি এখান থেকে নিজের অ্যাকাউন্ট মুছতে পারবেন না',
    userDeleted: 'ব্যবহারকারী মুছে ফেলা হয়েছে',
  },

  account: {
    title: 'অ্যাকাউন্ট',
    currentEmail: 'বর্তমান ইমেল',
    newEmail: 'নতুন ইমেল',
    changeEmail: 'ইমেল পরিবর্তন করুন',
    changingEmail: 'পরিবর্তন হচ্ছে...',
    emailChangeRequested: 'যাচাইকরণ ইমেল পাঠানো হয়েছে',
    emailChangeRequestedDescription: 'পরিবর্তন নিশ্চিত করতে আপনার নতুন ইমেলের ইনবক্স দেখুন।',
    emailChanged: 'ইমেল পরিবর্তিত হয়েছে',
    emailChangedDescription: 'আপনার ইমেল সফলভাবে আপডেট হয়েছে।',
    dangerZone: 'বিপদ অঞ্চল',
    deleteAccount: 'আমার অ্যাকাউন্ট মুছুন',
    deleteAccountConfirmTitle: 'আপনার অ্যাকাউন্ট মুছুন?',
    deleteAccountConfirmDescription: 'আপনার সমস্ত কাজ এবং ডেটা স্থায়ীভাবে মুছে ফেলা হবে। এটি পূর্বাবস্থায় ফেরানো যাবে না।',
    deleteAccountTypeEmail: 'নিশ্চিত করতে আপনার ইমেল লিখুন',
    deletingAccount: 'মুছে ফেলা হচ্ছে...',
    accountDeleted: 'অ্যাকাউন্ট মুছে ফেলা হয়েছে',
  },
};

export default bn;
