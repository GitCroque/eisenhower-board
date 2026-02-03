import { ThemeProvider } from 'next-themes';
import { EisenhowerMatrix } from './components/EisenhowerMatrix';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Decorative blurred shapes */}
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-3xl dark:from-blue-600/20 dark:to-purple-600/20" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-pink-400/30 to-orange-400/30 blur-3xl dark:from-pink-600/20 dark:to-orange-600/20" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 blur-3xl dark:from-indigo-600/10 dark:to-cyan-600/10" />

        <div className="relative z-10 p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            <header className="mb-8 flex items-center justify-between">
              <div className="text-center flex-1">
                <h1 className="mb-2 text-3xl font-bold text-slate-800 drop-shadow-sm dark:text-white md:text-4xl">
                  Matrice d'Eisenhower
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Organisez vos tâches par priorité et urgence
                </p>
              </div>
              <ThemeToggle />
            </header>
            <EisenhowerMatrix />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
