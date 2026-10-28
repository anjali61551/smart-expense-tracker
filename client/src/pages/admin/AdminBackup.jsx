import { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import {
  Database,
  Download,
  HardDrive,
  Table,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  FileCode
} from 'lucide-react';

const AdminBackup = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/settings');
      setStats(res.data.health.dbStats);
    } catch (err) {
      toast.error('Failed to load database status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleDownloadBackup = async () => {
    try {
      setDownloading(true);
      toast.loading('Generating SQL Database Backup...', { id: 'backup' });
      const res = await api.get('/admin/backup/download', { responseType: 'blob' });
      const blob = new Blob([res.data], { type: 'application/sql' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      link.href = url;
      link.setAttribute('download', `smart_expense_tracker_backup_${dateStr}.sql`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Database backup downloaded successfully!', { id: 'backup' });
    } catch (err) {
      toast.error('Failed to download database backup', { id: 'backup' });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Database Backup & Storage</h2>
          <p className="text-slate-500 text-sm mt-1">Export, download, and protect your database records</p>
        </div>
        <button
          onClick={handleDownloadBackup}
          disabled={downloading}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition disabled:opacity-50"
        >
          <Download size={18} />
          {downloading ? 'Exporting SQL...' : 'Download SQL Backup'}
        </button>
      </div>

      {/* Main Download Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <CheckCircle2 size={14} /> MySQL Engine Online
          </div>
          <h3 className="text-2xl font-bold">1-Click Full System Backup</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Generates a complete SQL dump file containing schema definitions, all user profiles,
            transactions, budgets, and application settings. Safe to restore in MySQL Workbench, phpMyAdmin, or CLI.
          </p>
          <div className="pt-2">
            <button
              onClick={handleDownloadBackup}
              disabled={downloading}
              className="flex items-center gap-2 bg-emerald-500 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              <Download size={18} />
              {downloading ? 'Generating Dump...' : 'Export & Download .sql Dump'}
            </button>
          </div>
        </div>
        <Database size={240} className="absolute -right-12 -bottom-12 text-white/5 pointer-events-none" />
      </div>

      {/* Table Storage Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Table size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Users Table</p>
            <p className="text-2xl font-bold text-slate-800 mt-0.5">{stats?.usersCount || 0} rows</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Table size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Transactions Table</p>
            <p className="text-2xl font-bold text-slate-800 mt-0.5">{stats?.transactionsCount || 0} rows</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Table size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Budgets Table</p>
            <p className="text-2xl font-bold text-slate-800 mt-0.5">{stats?.budgetsCount || 0} rows</p>
          </div>
        </div>
      </div>

      {/* Restoration Guidelines */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <FileCode size={18} className="text-indigo-600" />
          How to Restore a Backup
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
            <p className="font-bold text-slate-800">Option 1: Using phpMyAdmin</p>
            <p>1. Open http://localhost/phpmyadmin in your browser.</p>
            <p>2. Select the <code className="bg-white px-1.5 py-0.5 rounded border text-indigo-600">smart_expense_tracker</code> database.</p>
            <p>3. Click the <strong>Import</strong> tab at the top.</p>
            <p>4. Choose your downloaded <code className="bg-white px-1.5 py-0.5 rounded border text-indigo-600">.sql</code> file and click <strong>Go</strong>.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
            <p className="font-bold text-slate-800">Option 2: Using Command Line</p>
            <p>Run the following command in PowerShell / Terminal:</p>
            <div className="p-2.5 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto">
              mysql -u root smart_expense_tracker &lt; backup_file.sql
            </div>
            <p className="text-slate-500">All tables and records will be restored automatically.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBackup;
