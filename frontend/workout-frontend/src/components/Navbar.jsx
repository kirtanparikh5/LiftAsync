import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur dark:bg-gray-950/70">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-semibold text-brand-600 dark:text-brand-400">LiftAsync</Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <>
              <span className="hidden text-sm md:inline">Hi, {user.username || user.email}</span>
              <button
                onClick={() => { logout(); nav('/login'); }}
                className="rounded-lg bg-brand-600 px-3 py-1.5 hover:bg-brand-700 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg border px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-900 text-indigo-500"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
