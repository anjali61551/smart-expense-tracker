import { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import {
  Users,
  Search,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  Calendar,
  Wallet,
  ArrowDownRight,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users', { params: { search } });
      setUsers(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const confirmMsg = `Are you sure you want to ${newRole === 'admin' ? 'promote this user to Admin' : 'demote this Admin to regular User'}?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update role');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`⚠️ Are you sure you want to permanently delete user "${userName}"? This will delete all their transactions and budgets.`)) {
      return;
    }

    try {
      await api.delete(`/admin/users/${userId}`);
      toast.success('User deleted successfully');
      fetchUsers();
      if (selectedUser?.id === userId) setSelectedUser(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500 text-sm mt-1">
            Total {users.length} registered platform {users.length === 1 ? 'user' : 'users'}
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <p className="text-center py-16 text-slate-400 text-sm">Loading users...</p>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Users size={32} className="mx-auto mb-2 opacity-40" />
            <p className="font-medium">No users found matching "{search}"</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase">
                <tr>
                  <th className="px-6 py-3.5 text-left">User</th>
                  <th className="px-6 py-3.5 text-center">Role</th>
                  <th className="px-6 py-3.5 text-center">Transactions</th>
                  <th className="px-6 py-3.5 text-right">Total Expenses</th>
                  <th className="px-6 py-3.5 text-right">Net Balance</th>
                  <th className="px-6 py-3.5 text-left">Joined Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => {
                  const isCurrent = u.id === currentUser?.id;
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm">
                            {u.name?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 flex items-center gap-2">
                              {u.name}
                              {isCurrent && (
                                <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                                  You
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-slate-400">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            u.role === 'admin'
                              ? 'bg-purple-100 text-purple-700 border border-purple-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {u.role === 'admin' ? <ShieldCheck size={13} /> : null}
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-slate-600 font-medium">
                        {u.transactionCount}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-red-500">
                        Rs. {u.totalExpenses.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-700">
                        Rs. {u.balance.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">
                        {new Date(u.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleRoleToggle(u.id, u.role)}
                            disabled={isCurrent}
                            title={u.role === 'admin' ? 'Demote to user' : 'Promote to admin'}
                            className={`p-1.5 rounded-lg text-xs font-medium transition ${
                              isCurrent
                                ? 'opacity-30 cursor-not-allowed'
                                : u.role === 'admin'
                                ? 'text-amber-600 hover:bg-amber-50'
                                : 'text-purple-600 hover:bg-purple-50'
                            }`}
                          >
                            {u.role === 'admin' ? 'Demote' : 'Make Admin'}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id, u.name)}
                            disabled={isCurrent}
                            title="Delete user"
                            className={`p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition ${
                              isCurrent ? 'opacity-30 cursor-not-allowed' : ''
                            }`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
