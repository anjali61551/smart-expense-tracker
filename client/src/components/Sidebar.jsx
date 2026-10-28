import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  BarChart2,
  LogOut,
  User,
  ShieldCheck
} from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/budgets', label: 'Budgets', icon: PiggyBank },
  { to: '/reports', label: 'Reports', icon: BarChart2 },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <aside className="w-64 min-h-screen bg-indigo-700 text-white flex flex-col shadow-xl">
      <div className="p-6 border-b border-indigo-600">
        <h1 className="text-xl font-bold tracking-tight">💸 SmartExpense</h1>
        <p className="text-xs text-indigo-200 mt-1">Expense Tracker</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                isActive
                  ? 'bg-white text-indigo-700 shadow'
                  : 'text-indigo-100 hover:bg-indigo-600'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}

        {isAdmin && (
          <div className="pt-4 mt-4 border-t border-indigo-600">
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-900/60 text-indigo-100 hover:bg-indigo-900 hover:text-white transition-all text-sm font-semibold border border-indigo-500/30 shadow-inner"
            >
              <ShieldCheck size={18} className="text-emerald-400" />
              Admin Portal
            </Link>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-indigo-600">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-xs">
            {user?.name?.[0]?.toUpperCase() || <User size={16} />}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate flex items-center gap-1.5">
              {user?.name}
              {isAdmin && (
                <span className="text-[10px] bg-indigo-500/40 text-indigo-200 px-1.5 py-0.2 rounded font-normal">
                  Admin
                </span>
              )}
            </p>
            <p className="text-xs text-indigo-300 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-600 rounded-lg transition-all"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
