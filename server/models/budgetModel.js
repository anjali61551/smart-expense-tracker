const pool = require('../config/db');

const getBudgets = async (userId, month, year) => {
  let query = 'SELECT * FROM budgets WHERE user_id = ?';
  const params = [userId];
  if (month) { query += ' AND month = ?'; params.push(month); }
  if (year) { query += ' AND year = ?'; params.push(year); }
  const [rows] = await pool.query(query, params);
  return rows;
};

const createBudget = async (userId, { category, limit_amount, month, year }) => {
  const [result] = await pool.query(
    `INSERT INTO budgets (user_id, category, limit_amount, month, year)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE limit_amount = VALUES(limit_amount)`,
    [userId, category, limit_amount, month, year]
  );
  return result.insertId || result.affectedRows;
};

const updateBudget = async (id, userId, { category, limit_amount, month, year }) => {
  const [result] = await pool.query(
    'UPDATE budgets SET category=?, limit_amount=?, month=?, year=? WHERE id=? AND user_id=?',
    [category, limit_amount, month, year, id, userId]
  );
  return result.affectedRows;
};

const deleteBudget = async (id, userId) => {
  const [result] = await pool.query('DELETE FROM budgets WHERE id = ? AND user_id = ?', [id, userId]);
  return result.affectedRows;
};

const getBudgetVsSpent = async (userId, month, year) => {
  const [rows] = await pool.query(
    `SELECT b.id, b.category, b.limit_amount, b.month, b.year,
       COALESCE(SUM(t.amount), 0) AS spent
     FROM budgets b
     LEFT JOIN transactions t 
       ON t.user_id = b.user_id 
       AND t.category = b.category
       AND t.type = 'expense'
       AND MONTH(t.date) = b.month
       AND YEAR(t.date) = b.year
     WHERE b.user_id = ? AND b.month = ? AND b.year = ?
     GROUP BY b.id`,
    [userId, month, year]
  );
  return rows;
};

module.exports = { getBudgets, createBudget, updateBudget, deleteBudget, getBudgetVsSpent };
