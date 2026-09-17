import { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell,
  LineChart, Line
} from 'recharts';
import { TrendingUp, TrendingDown, PiggyBank, ArrowDownRight, ArrowUpRight } from 'lucide-react';

const EXPENSE_COLORS = ['#ef4444', '#f97316', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#64748b', '#3b82f6'];
const INCOME_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#06b6d4', '#14b8a6', '#6366f1', '#f59e0b', '#10b981'];

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const Reports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [trendView, setTrendView] = useState('1month'); // '1month' or '6month'

  const fetchReports = () => {
    setLoading(true);
    api.get(`/dashboard/summary?month=${month}&year=${year}`)
      .then(r => setData(r.data))
      .catch(() => toast.error('Failed to load reports'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReports();
  }, [month, year]);

  if (loading && !data) return <div className="flex items-center justify-center h-64 text-slate-400">Loading reports...</div>;

  const monthIncome = parseFloat(data?.selectedMonthIncome || 0);
  const monthExpenses = parseFloat(data?.selectedMonthExpenses || 0);
  const monthBalance = monthIncome - monthExpenses;
  const monthSavingsRate = monthIncome > 0 ? (((monthIncome - monthExpenses) / monthIncome) * 100).toFixed(1) : 0;

  const expenseCategories = data?.monthlyExpenseCategories || [];
  const incomeCategories = data?.monthlyIncomeCategories || [];

  return (
    <div className="space-y-6">
      {/* Header & Month/Year Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Reports & Analytics</h2>
          <p className="text-slate-500 text-sm mt-1">
            Monthly breakdown for <span className="font-semibold text-indigo-600">{months[month - 1]} {year}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium text-slate-700 shadow-sm"
          >
            {months.map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium text-slate-700 shadow-sm"
          >
            {[2023, 2024, 2025, 2026, 2027].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Month Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{months[month - 1]} Total Income</p>
            <p className="text-2xl font-bold text-emerald-600 mt-0.5">Rs. {monthIncome.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
            <TrendingDown size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{months[month - 1]} Total Expenses</p>
            <p className="text-2xl font-bold text-red-500 mt-0.5">Rs. {monthExpenses.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <PiggyBank size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{months[month - 1]} Net Savings ({monthSavingsRate}%)</p>
            <p className={`text-2xl font-bold mt-0.5 ${monthBalance >= 0 ? 'text-indigo-600' : 'text-red-500'}`}>
              Rs. {monthBalance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Trend Section (1-Month Daily vs 6-Month Monthly) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <div>
            <h3 className="font-semibold text-slate-800 text-lg">
              {trendView === '1month'
                ? `1-Month Daily Trend (${months[month - 1]} ${year})`
                : '6-Month Overview Trend'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {trendView === '1month'
                ? 'Day-by-day cash flow throughout the month'
                : 'Month-by-month financial trajectory'}
            </p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setTrendView('1month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                trendView === '1month'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📅 1-Month (Daily)
            </button>
            <button
              onClick={() => setTrendView('6month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                trendView === '6month'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📊 6-Month Overview
            </button>
          </div>
        </div>

        {trendView === '1month' ? (
          data?.dailyData && data.dailyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data.dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => `Rs. ${parseFloat(v).toFixed(2)}`} />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Income" />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center py-14 text-slate-400">
              <p className="text-base font-medium">No transactions recorded for {months[month - 1]} {year}</p>
              <p className="text-xs mt-1">Add transactions in this month to visualize the daily trend.</p>
            </div>
          )
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data?.monthlyData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => `Rs. ${parseFloat(v).toFixed(2)}`} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Income" />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Expenses" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* MONTHLY SUMMARY TABLES BY CATEGORIES (Income & Expense) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* EXPENSES BY CATEGORY TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-red-50/40">
            <div className="flex items-center gap-2">
              <ArrowDownRight size={18} className="text-red-500" />
              <h3 className="font-semibold text-slate-800">Expenses by Category</h3>
            </div>
            <span className="text-xs font-medium text-red-600 bg-red-100 px-2.5 py-1 rounded-full">
              {months[month - 1]} {year}
            </span>
          </div>

          <div className="p-4 flex-1">
            {expenseCategories.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-2.5 text-left">Category</th>
                      <th className="px-4 py-2.5 text-center">Entries</th>
                      <th className="px-4 py-2.5 text-right">Total Amount</th>
                      <th className="px-4 py-2.5 text-right">% Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {expenseCategories.map((c, i) => {
                      const pct = monthExpenses > 0 ? (parseFloat(c.total) / monthExpenses) * 100 : 0;
                      return (
                        <tr key={c.category} className="hover:bg-slate-50 transition">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: EXPENSE_COLORS[i % EXPENSE_COLORS.length] }}
                              />
                              <span className="font-medium text-slate-700">{c.category}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-slate-500 text-xs">
                            {c.count || 1}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-red-500">
                            Rs. {parseFloat(c.total).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-600 text-xs">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 bg-slate-100 rounded-full h-1.5 hidden sm:block">
                                <div
                                  className="bg-red-500 h-1.5 rounded-full"
                                  style={{ width: `${Math.min(pct, 100)}%` }}
                                />
                              </div>
                              <span className="font-medium">{pct.toFixed(1)}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50 font-semibold text-slate-800 border-t border-slate-200">
                      <td className="px-4 py-2.5">Total Expenses</td>
                      <td className="px-4 py-2.5 text-center text-xs text-slate-500">
                        {expenseCategories.reduce((acc, curr) => acc + (curr.count || 1), 0)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-red-600">
                        Rs. {monthExpenses.toFixed(2)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-xs">100%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-sm">
                No expense categories recorded for this month.
              </div>
            )}
          </div>
        </div>

        {/* INCOME BY CATEGORY TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-emerald-50/40">
            <div className="flex items-center gap-2">
              <ArrowUpRight size={18} className="text-emerald-600" />
              <h3 className="font-semibold text-slate-800">Income by Category</h3>
            </div>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
              {months[month - 1]} {year}
            </span>
          </div>

          <div className="p-4 flex-1">
            {incomeCategories.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-2.5 text-left">Category</th>
                      <th className="px-4 py-2.5 text-center">Entries</th>
                      <th className="px-4 py-2.5 text-right">Total Amount</th>
                      <th className="px-4 py-2.5 text-right">% Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {incomeCategories.map((c, i) => {
                      const pct = monthIncome > 0 ? (parseFloat(c.total) / monthIncome) * 100 : 0;
                      return (
                        <tr key={c.category} className="hover:bg-slate-50 transition">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: INCOME_COLORS[i % INCOME_COLORS.length] }}
                              />
                              <span className="font-medium text-slate-700">{c.category}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-slate-500 text-xs">
                            {c.count || 1}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-emerald-600">
                            Rs. {parseFloat(c.total).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-600 text-xs">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 bg-slate-100 rounded-full h-1.5 hidden sm:block">
                                <div
                                  className="bg-emerald-500 h-1.5 rounded-full"
                                  style={{ width: `${Math.min(pct, 100)}%` }}
                                />
                              </div>
                              <span className="font-medium">{pct.toFixed(1)}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50 font-semibold text-slate-800 border-t border-slate-200">
                      <td className="px-4 py-2.5">Total Income</td>
                      <td className="px-4 py-2.5 text-center text-xs text-slate-500">
                        {incomeCategories.reduce((acc, curr) => acc + (curr.count || 1), 0)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-emerald-600">
                        Rs. {monthIncome.toFixed(2)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-xs">100%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-sm">
                No income categories recorded for this month.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
