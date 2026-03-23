import type { Translations } from '../translations';

const pl: Translations = {
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
    retry: 'Ponów',
  },

  archive: {
    title: 'Zarchiwizowane zadania',
    noTasks: 'Brak zarchiwizowanych zadań',
    completedOn: 'Ukończono',
    deleteForever: 'Usuń na stałe',
    backToMatrix: 'Powrót do macierzy',
    openArchive: 'Otwórz archiwum',
    searchPlaceholder: 'Szukaj w zarchiwizowanych zadaniach',
    allQuadrants: 'Wszystkie ćwiartki',
    applyFilters: 'Zastosuj',
    restoreTask: 'Przywróć zadanie',
    previousPage: 'Poprzednia strona',
    nextPage: 'Następna strona',
    pagePlaceholder: 'Strona',
    goToPage: 'Idź',
  },

  sessions: {
    title: 'Aktywne sesje',
    openSessions: 'Otwórz sesje',
    loading: 'Ładowanie sesji...',
    backToMatrix: 'Powrót do macierzy',
    revokeOtherSessions: 'Unieważnij pozostałe sesje',
    revokingOthers: 'Unieważnianie...',
    noSessions: 'Brak aktywnych sesji.',
    unknownDevice: 'Nieznane urządzenie',
    unknownIp: 'Nieznany',
    current: 'Bieżąca',
    createdAt: 'Utworzono',
    lastSeenAt: 'Ostatnia aktywność',
    revokeSession: 'Unieważnij sesję',
  },

  accessibility: {
    selectLanguage: 'Wybierz język',
    dismissNotification: 'Zamknij powiadomienie',
  },

  auth: {
    signInTitle: 'Zaloguj się do Eisenhower Board',
    signInSubtitle: 'Podaj swój e-mail, a wyślemy Ci bezpieczny link do logowania.',
    emailLabel: 'E-mail',
    sendMagicLink: 'Wyślij link',
    sendingLink: 'Wysyłanie linku...',
    checkInbox: 'Sprawdź skrzynkę',
    checkInboxDescription: 'Wysłaliśmy link do logowania na adres',
    linkExpiresIn: 'Link wygasa za 15 minut.',
    signOut: 'Wyloguj się',
    signedInAs: 'Zalogowano jako',
    sessionCheckFailedTitle: 'Nie udało się sprawdzić sesji',
    sessionCheckFailedDescription: 'Sprawdź połączenie i spróbuj ponownie przed zalogowaniem.',
    retrySessionCheck: 'Spróbuj ponownie',
  },

  landing: {
    description: 'Macierz Eisenhowera to metoda produktywności, która pomaga organizować i priorytetyzować zadania, dzieląc je na cztery ćwiartki na podstawie pilności i ważności. Skup się na tym, co naprawdę ważne i przestań tracić czas na rozpraszacze.',
    quadrantsTitle: 'Cztery ćwiartki do organizacji priorytetów',
  },

  admin: {
    title: 'Administracja',
    stats: 'Statystyki',
    totalUsers: 'Łączna liczba użytkowników',
    activeUsers30d: 'Aktywni użytkownicy (30 dni)',
    users: 'Użytkownicy',
    email: 'E-mail',
    createdAt: 'Utworzono',
    lastLoginAt: 'Ostatnie logowanie',
    taskCount: 'Zadania',
    never: 'Nigdy',
    deleteUser: 'Usuń użytkownika',
    deleteUserConfirmTitle: 'Usunąć użytkownika?',
    deleteUserConfirmDescription: 'Wszystkie dane użytkownika {email} zostaną trwale usunięte. Tej czynności nie można cofnąć.',
    cannotDeleteSelf: 'Nie możesz usunąć własnego konta z tej strony',
    userDeleted: 'Użytkownik usunięty',
  },

  account: {
    title: 'Konto',
    currentEmail: 'Obecny e-mail',
    newEmail: 'Nowy e-mail',
    changeEmail: 'Zmień e-mail',
    changingEmail: 'Zmiana...',
    emailChangeRequested: 'E-mail weryfikacyjny wysłany',
    emailChangeRequestedDescription: 'Sprawdź skrzynkę odbiorczą nowego adresu e-mail, aby potwierdzić zmianę.',
    emailChanged: 'E-mail zmieniony',
    emailChangedDescription: 'Twój adres e-mail został pomyślnie zaktualizowany.',
    dangerZone: 'Strefa zagrożenia',
    deleteAccount: 'Usuń moje konto',
    deleteAccountConfirmTitle: 'Usunąć konto?',
    deleteAccountConfirmDescription: 'Wszystkie Twoje zadania i dane zostaną trwale usunięte. Tej czynności nie można cofnąć.',
    deleteAccountTypeEmail: 'Wpisz swój e-mail, aby potwierdzić',
    deletingAccount: 'Usuwanie...',
    accountDeleted: 'Konto usunięte',
  },
};

export default pl;
