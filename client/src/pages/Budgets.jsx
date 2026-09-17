import { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Education', 'Other'];

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ category: '', limit_amount: '', month: currentMonth, year: currentYear });
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/budgets/vs-spent', { params: { month, year } });
      setBudgets(data);
    } catch { toast.error('Failed to load budgets'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBudgets(); }, [month, year]);

  const openAdd = () => { setForm({ category: '', limit_amount: '', month, year }); setEditId(null); setShowModal(true); };
  const openEdit = (b) => {
    setForm({ category: b.category, limit_amount: b.limit_amount, month: b.month, year: b.year });
    setEditId(b.id); setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) { await api.put(`/budgets/${editId}`, form); toast.success('Budget updated'); }
      else { await api.post('/budgets', form); toast.success('Budget added'); }
      setShowModal(false);
      fetchBudgets();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this budget?')) return;
    try { await api.delete(`/budgets/${id}`); toast.success('Deleted'); fetchBudgets(); }
    catch { toast.error('Failed to delete'); }
  };

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Budgets</h2>
          <p className="text-slate-500 text-sm mt-1">Set and track your spending limits</p>
        </div>
        <div className="flex gap-2 items-center">
          <select value={month} onChange={e => setMonth(Number(e.target.value))}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm">
            {months.map((m, i) => <option key={m} value={i+1}>{m}</option>)}
          </select>
          <select value={year} onChange={e => setYear(Number(e.target.value))}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm">
            {[2023,2024,2025,2026].map(y => <option key={y}>{y}</option>)}
          </select>
          <button onClick={openAdd} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            <Plus size={16}/> Add Budget
          </button>
        </div>
      </div>

      {loading ? <p className="text-center py-12 text-slate-400">Loading...</p> : budgets.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
          <p className="text-slate-400 text-lg mb-2">No budgets set for this month</p>
          <button onClick={openAdd} className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
            Set First Budget
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgets.map(b => {
            const spent = parseFloat(b.spent) || 0;
            const limit = parseFloat(b.limit_amount);
            const pct = Math.min((spent / limit) * 100, 100);
            const isOver = spent > limit;
            return (
              <div key={b.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-slate-700">{b.category}</span>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(b)} className="text-indigo-400 hover:text-indigo-600"><Pencil size={15}/></button>
                    <button onClick={() => handleDelete(b.id)} className="text-red-400 hover:text-red-600"><Trash2 size={15}/></button>
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Spent: <strong className={isOver ? 'text-red-600' : 'text-slate-800'}>Rs. {spent.toFixed(2)}</strong></span>
                  <span className="text-slate-500">Limit: <strong>Rs. {limit.toFixed(2)}</strong></span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full transition-all ${isOver ? 'bg-red-500' : pct > 80 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                    style={{ width: `${pct}%` }} />
                </div>
                {isOver && <p className="text-xs text-red-500 mt-1 font-medium">⚠️ Over budget by Rs. {(spent - limit).toFixed(2)}</p>}
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold">{editId ? 'Edit' : 'Add'} Budget</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-slate-400"/></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Category</label>
                <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Monthly Limit (Rs.)</label>
                <input type="number" step="0.01" min="0" required value={form.limit_amount}
                  onChange={e => setForm({...form, limit_amount: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="0.00" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Month</label>
                  <select value={form.month} onChange={e => setForm({...form, month: Number(e.target.value)})}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                    {months.map((m,i) => <option key={m} value={i+1}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Year</label>
                  <select value={form.year} onChange={e => setForm({...form, year: Number(e.target.value)})}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                    {[2023,2024,2025,2026].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-slate-200 rounded-lg py-2 text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
