import { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import {
  Settings,
  Save,
  Server,
  Activity,
  Cpu,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    app_name: 'Smart Expense Tracker',
    currency: 'Rs.',
    allow_registration: 'true',
    maintenance_mode: 'false'
  });
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/settings');
      if (res.data.settings) {
        setSettings(prev => ({ ...prev, ...res.data.settings }));
      }
      setHealth(res.data.health);
    } catch (err) {
      toast.error('Failed to load system settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.put('/admin/settings', settings);
      toast.success('System settings saved successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const formatUptime = (seconds) => {
    if (!seconds) return '0m';
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d > 0 ? `${d}d ` : ''}${h > 0 ? `${h}h ` : ''}${m}m`;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-slate-400">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">System Settings & Health</h2>
        <p className="text-slate-500 text-sm mt-1">Configure global application parameters and inspect system status</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
            <Settings size={20} className="text-indigo-600" />
            General Platform Settings
          </h3>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Application Title
              </label>
              <input
                type="text"
                required
                value={settings.app_name}
                onChange={(e) => setSettings({ ...settings, app_name: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
              <p className="text-xs text-slate-400 mt-1">Displayed in the header and reports.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Primary Currency Symbol
              </label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              >
                <option value="Rs.">Rs. (Nepali / South Asian Rupees)</option>
                <option value="₹">₹ (Indian Rupee)</option>
                <option value="$">$ (US Dollar)</option>
                <option value="€">€ (Euro)</option>
                <option value="£">£ (British Pound)</option>
              </select>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Allow New Registrations</p>
                  <p className="text-xs text-slate-500">Enable or disable new user account creations.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allow_registration === 'true'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        allow_registration: e.target.checked ? 'true' : 'false'
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Maintenance Mode</p>
                  <p className="text-xs text-slate-500">Display maintenance indicator banner across platform.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenance_mode === 'true'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maintenance_mode: e.target.checked ? 'true' : 'false'
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition disabled:opacity-50"
              >
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Server Health Diagnostics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Activity size={20} className="text-emerald-600" />
            System Health
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-2">
                <Server size={15} /> Environment
              </span>
              <span className="text-xs font-bold text-slate-800">Node {health?.nodeVersion}</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-2">
                <Cpu size={15} /> Memory Heap
              </span>
              <span className="text-xs font-bold text-slate-800">{health?.memoryUsageMb} MB Used</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-2">
                <Clock size={15} /> Server Uptime
              </span>
              <span className="text-xs font-bold text-slate-800">{formatUptime(health?.uptimeSeconds)}</span>
            </div>

            <div className="p-3.5 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-between border border-emerald-100">
              <span className="text-xs font-medium flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-600" /> Database Status
              </span>
              <span className="text-xs font-bold uppercase">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
