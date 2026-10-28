import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { ShieldCheck, Lock, Mail, ArrowLeft, KeyRound, AlertTriangle, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@smartexpense.com', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form.email, form.password, 'admin');
      if (data.user?.role !== 'admin') {
        toast.error('Access Denied: This account does not have administrator privileges.');
        return;
      }
      toast.success(`Welcome to Admin Console, ${data.user.name}!`);
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Admin authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDefaultAdmin = () => {
    setForm({ email: 'admin@smartexpense.com', password: 'admin123' });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between p-4 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="max-w-md w-full mx-auto pt-4 flex items-center justify-between z-10">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={14} /> Back to User Login
        </Link>
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
          RESTRICTED AREA
        </span>
      </div>

      {/* Main Admin Card */}
      <div className="max-w-md w-full mx-auto my-auto z-10">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/60 relative">
          {/* Security Badge Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/25 border border-indigo-400/30 mb-5">
            <ShieldCheck size={28} className="text-white" />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">System Admin Console</h1>
            <p className="text-xs text-slate-400 mt-1.5 flex items-center justify-center gap-1.5">
              <Lock size={12} className="text-indigo-400" />
              Authorized Administrator Personnel Only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder:text-slate-600"
                  placeholder="admin@smartexpense.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder:text-slate-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3 rounded-xl font-bold text-sm hover:from-indigo-500 hover:to-indigo-400 transition shadow-lg shadow-indigo-600/30 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <button
              type="button"
              onClick={fillDefaultAdmin}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 inline-flex items-center gap-1.5"
            >
              ⚡ Auto-fill Default Admin (<code className="text-slate-300">admin@smartexpense.com</code>)
            </button>
          </div>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="text-center pb-2 z-10">
        <p className="text-[11px] text-slate-600">
          Smart Expense Tracker • Secure Administrative Gateway
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
