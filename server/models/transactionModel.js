const pool = require('../config/db');

const getTransactions = async (userId, filters = {}) => {
  let query = 'SELECT * FROM transactions WHERE user_id = ?';
  const params = [userId];

  if (filters.type) { query += ' AND type = ?'; params.push(filters.type); }
  if (filters.category) { query += ' AND category = ?'; params.push(filters.category); }
  if (filters.startDate) { query += ' AND date >= ?'; params.push(filters.startDate); }
  if (filters.endDate) { query += ' AND date <= ?'; params.push(filters.endDate); }
  if (filters.search) { query += ' AND description LIKE ?'; params.push(`%${filters.search}%`); }

  query += ' ORDER BY date DESC, created_at DESC';
  const [rows] = await pool.query(query, params);
  return rows;
};

const getTransactionById = async (id, userId) => {
  const [rows] = await pool.query('SELECT * FROM transactions WHERE id = ? AND user_id = ?', [id, userId]);
  return rows[0];
};

const createTransaction = async (userId, { type, amount, category, description, date }) => {
  const [result] = await pool.query(
    'INSERT INTO transactions (user_id, type, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, type, amount, category, description || '', date]
  );
  return result.insertId;
};

const updateTransaction = async (id, userId, { type, amount, category, description, date }) => {
  const [result] = await pool.query(
    'UPDATE transactions SET type=?, amount=?, category=?, description=?, date=? WHERE id=? AND user_id=?',
    [type, amount, category, description || '', date, id, userId]
  );
  return result.affectedRows;
};

const deleteTransaction = async (id, userId) => {
  const [result] = await pool.query('DELETE FROM transactions WHERE id = ? AND user_id = ?', [id, userId]);
  return result.affectedRows;
};

const getSummary = async (userId, month, year) => {
  let query = `SELECT 
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS totalIncome,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS totalExpenses
     FROM transactions WHERE user_id = ?`;
  const params = [userId];

  if (month) {
    query += ' AND MONTH(date) = ?';
    params.push(month);
  }
  if (year) {
    query += ' AND YEAR(date) = ?';
    params.push(year);
  }

  const [rows] = await pool.query(query, params);
  return rows[0];
};

const getMonthlyData = async (userId) => {
  const [rows] = await pool.query(
    `SELECT 
      DATE_FORMAT(date, '%Y-%m') AS month,
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS income,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS expenses
     FROM transactions WHERE user_id = ?
     GROUP BY month ORDER BY month DESC LIMIT 6`,
    [userId]
  );
  return rows.reverse();
};

const getCategoryBreakdown = async (userId, type = 'expense', month, year) => {
  let query = `SELECT category, SUM(amount) AS total, COUNT(*) as count
               FROM transactions 
               WHERE user_id = ? AND type = ?`;
  const params = [userId, type];

  if (month) {
    query += ' AND MONTH(date) = ?';
    params.push(month);
  }
  if (year) {
    query += ' AND YEAR(date) = ?';
    params.push(year);
  }

  query += ' GROUP BY category ORDER BY total DESC';
  const [rows] = await pool.query(query, params);
  return rows;
};

const getRecentTransactions = async (userId, limit = 5) => {
  const [rows] = await pool.query(
    'SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC, created_at DESC LIMIT ?',
    [userId, limit]
  );
  return rows;
};

const getDailyData = async (userId, month, year) => {
  const currentMonth = month || (new Date().getMonth() + 1);
  const currentYear = year || new Date().getFullYear();
  const [rows] = await pool.query(
    `SELECT 
      DATE_FORMAT(date, '%d %b') AS day,
      DATE_FORMAT(date, '%Y-%m-%d') AS fullDate,
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS income,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS expenses
     FROM transactions 
     WHERE user_id = ? AND MONTH(date) = ? AND YEAR(date) = ?
     GROUP BY fullDate, day 
     ORDER BY fullDate ASC`,
    [userId, currentMonth, currentYear]
  );
  return rows;
};

module.exports = {
  getTransactions, getTransactionById, createTransaction,
  updateTransaction, deleteTransaction, getSummary,
  getMonthlyData, getDailyData, getCategoryBreakdown, getRecentTransactions
};
