import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import {
  Users,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  Database,
  Settings,
  ShieldCheck,
  ArrowRight,
  UserCheck
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then(res => setStats(res.data))
      .catch(err => toast.error(err.response?.data?.message || 'Failed to load admin stats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        Loading admin overview...
      </div>
    );
  }

  const kpis = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50'
    },
    {
      title: 'System Transactions',
      value: stats?.totalTransactions || 0,
      icon: ArrowLeftRight,
      color: 'bg-indigo-600',
      textColor: 'text-indigo-600',
      bgLight: 'bg-indigo-50'
    },
    {
      title: 'Platform Income Logged',
      value: `Rs. ${parseFloat(stats?.totalIncome || 0).toFixed(2)}`,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      bgLight: 'bg-emerald-50'
    },
    {
      title: 'Platform Expense Logged',
      value: `Rs. ${parseFloat(stats?.totalExpenses || 0).toFixed(2)}`,
      icon: TrendingDown,
      color: 'bg-red-500',
      textColor: 'text-red-500',
      bgLight: 'bg-red-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Admin Control Center</h2>
          <p className="text-slate-500 text-sm mt-1">Platform overview and system metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/backup"
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 shadow-sm transition"
          >
            <Database size={16} /> Database Backup
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 shadow-sm transition"
          >
            <Settings size={16} /> Settings
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bgLight} ${kpi.textColor}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{kpi.title}</p>
                <p className="text-2xl font-bold text-slate-800 mt-0.5">{kpi.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/users"
          className="group bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <Users size={22} className="text-white" />
            </span>
            <ArrowRight size={18} className="text-white/70 group-hover:translate-x-1 transition-transform" />
          </div>
          <div>
            <h3 className="text-lg font-bold">User Management</h3>
            <p className="text-xs text-indigo-100 mt-1">View users, adjust roles, and audit account activity.</p>
          </div>
        </Link>

        <Link
          to="/admin/transactions"
          className="group bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <ArrowLeftRight size={22} className="text-white" />
            </span>
            <ArrowRight size={18} className="text-white/70 group-hover:translate-x-1 transition-transform" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Global Transactions</h3>
            <p className="text-xs text-slate-300 mt-1">Search, filter, and monitor all platform transactions.</p>
          </div>
        </Link>

        <Link
          to="/admin/backup"
          className="group bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <Database size={22} className="text-white" />
            </span>
            <ArrowRight size={18} className="text-white/70 group-hover:translate-x-1 transition-transform" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Database Backup</h3>
            <p className="text-xs text-emerald-100 mt-1">Generate and download instant SQL database backups.</p>
          </div>
        </Link>
      </div>

      {/* Tables: Recent Users & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck size={18} className="text-indigo-600" />
              <h3 className="font-semibold text-slate-800">Recent Registrations</h3>
            </div>
            <Link to="/admin/users" className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1">
              View All <ArrowRight size={13} />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {stats?.recentUsers?.map(u => (
              <div key={u.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                    {u.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{u.name}</p>
                    <p className="text-xs text-slate-400">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {u.role}
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    {new Date(u.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-indigo-600" />
              <h3 className="font-semibold text-slate-800">Recent Global Activity</h3>
            </div>
            <Link to="/admin/transactions" className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1">
              View All <ArrowRight size={13} />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {stats?.recentTransactions?.map(t => (
              <div key={t.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50 transition">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-800">{t.category}</p>
                    <span className="text-xs text-slate-400">by {t.userName}</span>
                  </div>
                  <p className="text-xs text-slate-400">{t.description || 'No description'} · {t.date}</p>
                </div>
                <span className={`font-semibold text-sm ${t.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {t.type === 'income' ? '+Rs. ' : '-Rs. '}{parseFloat(t.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
