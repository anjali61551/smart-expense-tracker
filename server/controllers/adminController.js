const {
  getAdminStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllTransactions,
  deleteTransactionAdmin,
  getSystemSettings,
  updateSystemSettings,
  generateDatabaseDump,
  getDatabaseStats
} = require('../models/adminModel');
const os = require('os');

// GET /api/admin/stats
const getStats = async (req, res) => {
  const stats = await getAdminStats();
  res.json(stats);
};

// GET /api/admin/users
const getUsers = async (req, res) => {
  const { search } = req.query;
  const users = await getAllUsers(search);
  res.json(users);
};

// PUT /api/admin/users/:id/role
const setRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  if (parseInt(id) === req.user.id && role !== 'admin') {
    return res.status(400).json({ message: 'You cannot demote your own admin account.' });
  }

  await updateUserRole(id, role);
  res.json({ message: 'User role updated successfully' });
};

// DELETE /api/admin/users/:id
const removeUser = async (req, res) => {
  const { id } = req.params;

  if (parseInt(id) === req.user.id) {
    return res.status(400).json({ message: 'You cannot delete your own admin account.' });
  }

  await deleteUser(id);
  res.json({ message: 'User and all associated data deleted successfully' });
};

// GET /api/admin/transactions
const getTransactions = async (req, res) => {
  const transactions = await getAllTransactions(req.query);
  res.json(transactions);
};

// DELETE /api/admin/transactions/:id
const removeTransaction = async (req, res) => {
  const { id } = req.params;
  await deleteTransactionAdmin(id);
  res.json({ message: 'Transaction deleted by administrator' });
};

// GET /api/admin/settings
const getSettings = async (req, res) => {
  const settings = await getSystemSettings();
  const dbStats = await getDatabaseStats();

  const health = {
    nodeVersion: process.version,
    platform: os.platform(),
    uptimeSeconds: Math.floor(process.uptime()),
    memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    dbStats
  };

  res.json({ settings, health });
};

// PUT /api/admin/settings
const saveSettings = async (req, res) => {
  await updateSystemSettings(req.body);
  res.json({ message: 'System settings updated successfully' });
};

// GET /api/admin/backup/download
const downloadBackup = async (req, res) => {
  const dump = await generateDatabaseDump();
  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `smart_expense_tracker_backup_${dateStr}.sql`;

  res.setHeader('Content-Type', 'application/sql');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(dump);
};

module.exports = {
  getStats,
  getUsers,
  setRole,
  removeUser,
  getTransactions,
  removeTransaction,
  getSettings,
  saveSettings,
  downloadBackup
};
