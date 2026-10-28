import { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Search, Filter } from 'lucide-react';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Education', 'Salary', 'Freelance', 'Investment', 'Other'];

const formatDate = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getTodayString = () => formatDate(new Date());

const getOneYearAgoString = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return formatDate(d);
};

const emptyForm = { type: 'expense', amount: '', category: '', description: '', date: getTodayString() };

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [filters, setFilters] = useState({ type: '', category: '', startDate: '', endDate: '', search: '' });
  const [saving, setSaving] = useState(false);

  const fetchTransactions = async () => {
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
      const { data } = await api.get('/transactions', { params });
      setTransactions(data);
    } catch { toast.error('Failed to load transactions'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTransactions(); }, [filters]);

  const openAdd = () => { setForm({ ...emptyForm, date: getTodayString() }); setEditId(null); setShowModal(true); };
  const openEdit = (t) => {
    setForm({ type: t.type, amount: t.amount, category: t.category, description: t.description || '', date: t.date });
    setEditId(t.id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = getTodayString();
    const oneYearAgo = getOneYearAgoString();
    if (form.date > today) {
      toast.error("Future transaction dates are not allowed.");
      return;
    }
    if (form.date < oneYearAgo) {
      toast.error("Past transactions can only be recorded up to 1 year back from current date.");
      return;
    }
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/transactions/${editId}`, form);
        toast.success('Transaction updated');
      } else {
        await api.post('/transactions', form);
        toast.success('Transaction added');
      }
      setShowModal(false);
      fetchTransactions();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    try {
      await api.delete(`/transactions/${id}`);
      toast.success('Deleted');
      fetchTransactions();
    } catch { toast.error('Failed to delete'); }
  };

  const handleExportCSV = async () => {
    try {
      toast.loading('Generating CSV...', { id: 'export-csv' });
      const response = await api.get('/export/csv', { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('CSV downloaded successfully!', { id: 'export-csv' });
    } catch (err) {
      toast.error('Failed to export CSV', { id: 'export-csv' });
    }
  };

  const handleExportPDF = async () => {
    try {
      toast.loading('Generating Report...', { id: 'export-pdf' });
      const response = await api.get('/export/pdf', { responseType: 'text' });
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(response.data);
        printWindow.document.close();
        toast.success('Report opened in new tab!', { id: 'export-pdf' });
      } else {
        toast.error('Popup blocked. Please allow popups for localhost.', { id: 'export-pdf' });
      }
    } catch (err) {
      toast.error('Failed to export report', { id: 'export-pdf' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Transactions</h2>
          <p className="text-slate-500 text-sm mt-1">{transactions.length} records</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportCSV} className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition">Export CSV</button>
          <button onClick={handleExportPDF} className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition">Export PDF</button>
          <button onClick={openAdd} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input placeholder="Search..." value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})}
            className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <select value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <input type="date" value={filters.startDate} onChange={e => setFilters({...filters, startDate: e.target.value})}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="date" value={filters.endDate} onChange={e => setFilters({...filters, endDate: e.target.value})}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? <p className="text-center py-12 text-slate-400">Loading...</p> : transactions.length === 0 ? (
          <p className="text-center py-12 text-slate-400">No transactions found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Date','Type','Category','Description','Amount','Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition">
                  <td className="px-5 py-3 text-slate-600">{t.date}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-700">{t.category}</td>
                  <td className="px-5 py-3 text-slate-500">{t.description || '—'}</td>
                  <td className={`px-5 py-3 font-semibold ${t.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {t.type === 'income' ? '+Rs. ' : '-Rs. '}{parseFloat(t.amount).toFixed(2)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(t)} className="text-indigo-500 hover:text-indigo-700"><Pencil size={15}/></button>
                      <button onClick={() => handleDelete(t.id)} className="text-red-400 hover:text-red-600"><Trash2 size={15}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-slate-800">{editId ? 'Edit' : 'Add'} Transaction</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-slate-400 hover:text-slate-600"/></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Amount</label>
                  <input type="number" step="0.01" min="0" required value={form.amount} onChange={e => setForm({...form, amount: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="0.00" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Date <span className="text-slate-400 font-normal">(Within last 1 year)</span>
                </label>
                <input
                  type="date"
                  required
                  min={getOneYearAgoString()}
                  max={getTodayString()}
                  value={form.date}
                  onChange={e => setForm({...form, date: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-700"
                />
                <p className="text-[11px] text-slate-400 mt-1">Allowed: Today and past dates up to 1 year ago (Future dates disabled).</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Description (optional)</label>
                <input type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Notes..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-slate-300 rounded-lg py-2 text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50">
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

export default Transactions;
