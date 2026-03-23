import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/auth/AuthContext';
import { useLanguage } from '@/i18n';
import { Layout } from './Layout';

export function AccountPage() {
  const { user, deleteAccount, changeEmail } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [newEmail, setNewEmail] = useState('');
  const [changingEmail, setChangingEmail] = useState(false);
  const [emailChangeSuccess, setEmailChangeSuccess] = useState(false);

  const [confirmEmail, setConfirmEmail] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) return null;

  const canChangeEmail = newEmail.trim() && newEmail.trim().toLowerCase() !== user.email && !changingEmail;
  const canDelete = confirmEmail.trim().toLowerCase() === user.email && !deleting;

  const onChangeEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!canChangeEmail) return;
    try {
      setChangingEmail(true);
      await changeEmail(newEmail.trim(), language);
      setNewEmail('');
      setEmailChangeSuccess(true);
    } catch {
      // Generic response — no specific error
    } finally {
      setChangingEmail(false);
    }
  };

  const onDeleteAccount = async (e: FormEvent) => {
    e.preventDefault();
    if (!canDelete) return;
    try {
      setDeleting(true);
      await deleteAccount();
      navigate('/');
    } catch {
      setDeleting(false);
    }
  };

  return (
    <Layout maxWidth="max-w-2xl">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {t.account.title}
          </h1>
        </div>

        {/* Email change */}
        <div className="rounded-xl border border-slate-200 bg-white/60 p-5 backdrop-blur dark:border-slate-700 dark:bg-slate-800/60">
          <div className="mb-4 flex items-center gap-2">
            <Mail className="h-4 w-4 text-slate-500" />
            <h2 className="font-medium text-slate-900 dark:text-slate-100">{t.account.changeEmail}</h2>
          </div>

          <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
            {t.account.currentEmail}: <span className="font-medium text-slate-900 dark:text-slate-100">{user.email}</span>
          </p>

          {emailChangeSuccess ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950">
              <p className="font-medium text-emerald-800 dark:text-emerald-200">{t.account.emailChangeRequested}</p>
              <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">{t.account.emailChangeRequestedDescription}</p>
            </div>
          ) : (
            <form onSubmit={e => void onChangeEmail(e)} className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder={t.account.newEmail}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={!canChangeEmail}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {changingEmail ? t.account.changingEmail : t.account.changeEmail}
              </button>
            </form>
          )}
        </div>

        {/* Danger zone */}
        <div className="rounded-xl border border-red-200 bg-white/60 p-5 backdrop-blur dark:border-red-900 dark:bg-slate-800/60">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <h2 className="font-medium text-red-600 dark:text-red-400">{t.account.dangerZone}</h2>
          </div>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
            >
              {t.account.deleteAccount}
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {t.account.deleteAccountConfirmDescription}
              </p>
              <form onSubmit={e => void onDeleteAccount(e)} className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm text-slate-600 dark:text-slate-400">
                    {t.account.deleteAccountTypeEmail}
                  </label>
                  <input
                    type="email"
                    value={confirmEmail}
                    onChange={e => setConfirmEmail(e.target.value)}
                    placeholder={user.email}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={!canDelete}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                  >
                    {deleting ? t.account.deletingAccount : t.account.deleteAccount}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowDeleteConfirm(false); setConfirmEmail(''); }}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    {t.tasks.cancel}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
