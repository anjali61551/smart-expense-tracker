const pool = require('../config/db');

// Platform KPI statistics
const getAdminStats = async () => {
  const [[userCount]] = await pool.query('SELECT COUNT(*) AS totalUsers FROM users');
  const [[txCount]] = await pool.query('SELECT COUNT(*) AS totalTransactions FROM transactions');
  const [[volume]] = await pool.query(`
    SELECT 
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS totalIncome,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS totalExpenses
    FROM transactions
  `);

  const [recentUsers] = await pool.query(
    'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 5'
  );

  const [recentTransactions] = await pool.query(`
    SELECT t.*, u.name AS userName, u.email AS userEmail 
    FROM transactions t 
    JOIN users u ON t.user_id = u.id 
    ORDER BY t.created_at DESC LIMIT 6
  `);

  const totalIncome = parseFloat(volume?.totalIncome) || 0;
  const totalExpenses = parseFloat(volume?.totalExpenses) || 0;

  return {
    totalUsers: userCount.totalUsers,
    totalTransactions: txCount.totalTransactions,
    totalIncome,
    totalExpenses,
    totalBalance: totalIncome - totalExpenses,
    recentUsers,
    recentTransactions
  };
};

// Get all users with their usage summary
const getAllUsers = async (search = '') => {
  let query = `
    SELECT 
      u.id, 
      u.name, 
      u.email, 
      u.role, 
      u.created_at,
      COUNT(t.id) AS transactionCount,
      SUM(CASE WHEN t.type='income' THEN t.amount ELSE 0 END) AS totalIncome,
      SUM(CASE WHEN t.type='expense' THEN t.amount ELSE 0 END) AS totalExpenses
    FROM users u
    LEFT JOIN transactions t ON u.id = t.user_id
  `;
  const params = [];

  if (search) {
    query += ' WHERE u.name LIKE ? OR u.email LIKE ?';
    params.push(`%${search}%`, `%${search}%`);
  }

  query += ' GROUP BY u.id ORDER BY u.created_at DESC';

  const [rows] = await pool.query(query, params);
  return rows.map(r => ({
    ...r,
    totalIncome: parseFloat(r.totalIncome) || 0,
    totalExpenses: parseFloat(r.totalExpenses) || 0,
    balance: (parseFloat(r.totalIncome) || 0) - (parseFloat(r.totalExpenses) || 0)
  }));
};

// Update user role
const updateUserRole = async (userId, role) => {
  const [result] = await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, userId]);
  return result.affectedRows;
};

// Delete user account
const deleteUser = async (userId) => {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);
  return result.affectedRows;
};

// Get all transactions across the entire system with user details
const getAllTransactions = async (filters = {}) => {
  let query = `
    SELECT 
      t.id,
      t.user_id,
      t.type,
      t.amount,
      t.category,
      t.description,
      t.date,
      t.created_at,
      u.name AS userName,
      u.email AS userEmail
    FROM transactions t
    JOIN users u ON t.user_id = u.id
    WHERE 1=1
  `;
  const params = [];

  if (filters.userId) {
    query += ' AND t.user_id = ?';
    params.push(filters.userId);
  }
  if (filters.type) {
    query += ' AND t.type = ?';
    params.push(filters.type);
  }
  if (filters.category) {
    query += ' AND t.category = ?';
    params.push(filters.category);
  }
  if (filters.startDate) {
    query += ' AND t.date >= ?';
    params.push(filters.startDate);
  }
  if (filters.endDate) {
    query += ' AND t.date <= ?';
    params.push(filters.endDate);
  }
  if (filters.search) {
    query += ' AND (t.description LIKE ? OR u.name LIKE ? OR u.email LIKE ?)';
    params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
  }

  query += ' ORDER BY t.date DESC, t.created_at DESC';

  const [rows] = await pool.query(query, params);
  return rows;
};

// Delete transaction
const deleteTransactionAdmin = async (id) => {
  const [result] = await pool.query('DELETE FROM transactions WHERE id = ?', [id]);
  return result.affectedRows;
};

// Get system settings
const getSystemSettings = async () => {
  const [rows] = await pool.query('SELECT setting_key, setting_value, updated_at FROM system_settings');
  const settings = {};
  rows.forEach(r => {
    settings[r.setting_key] = r.setting_value;
  });
  return settings;
};

// Update system settings
const updateSystemSettings = async (settingsObj) => {
  for (const [key, value] of Object.entries(settingsObj)) {
    await pool.query(
      'INSERT INTO system_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
      [key, String(value), String(value)]
    );
  }
  return true;
};

// Generate Full SQL Dump for Database Backup
const generateDatabaseDump = async () => {
  let dump = `-- Smart Expense Tracker Database Backup Dump\n`;
  dump += `-- Generated on: ${new Date().toISOString()}\n`;
  dump += `CREATE DATABASE IF NOT EXISTS smart_expense_tracker;\nUSE smart_expense_tracker;\n\n`;

  const tables = ['users', 'budgets', 'transactions', 'system_settings'];

  for (const table of tables) {
    // Get table create statement
    const [[createTable]] = await pool.query(`SHOW CREATE TABLE ${table}`);
    dump += `DROP TABLE IF EXISTS ${table};\n`;
    dump += `${createTable['Create Table']};\n\n`;

    // Get table records
    const [rows] = await pool.query(`SELECT * FROM ${table}`);
    if (rows.length > 0) {
      dump += `INSERT INTO ${table} VALUES \n`;
      const values = rows.map(r => {
        const cols = Object.values(r).map(val => {
          if (val === null) return 'NULL';
          if (typeof val === 'number') return val;
          if (val instanceof Date) return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
          return `'${String(val).replace(/'/g, "''")}'`;
        });
        return `(${cols.join(', ')})`;
      });
      dump += `${values.join(',\n')};\n\n`;
    }
  }

  return dump;
};

// Database summary metrics (table row counts & storage)
const getDatabaseStats = async () => {
  const [[users]] = await pool.query('SELECT COUNT(*) AS count FROM users');
  const [[transactions]] = await pool.query('SELECT COUNT(*) AS count FROM transactions');
  const [[budgets]] = await pool.query('SELECT COUNT(*) AS count FROM budgets');
  const [tables] = await pool.query(`
    SELECT table_name AS tableName, 
           round(((data_length + index_length) / 1024 / 1024), 2) AS sizeMb
    FROM information_schema.TABLES 
    WHERE table_schema = 'smart_expense_tracker'
  `);

  return {
    usersCount: users.count,
    transactionsCount: transactions.count,
    budgetsCount: budgets.count,
    tables
  };
};

module.exports = {
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
};
