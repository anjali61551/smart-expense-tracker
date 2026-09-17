const pool = require('../config/db');

const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [id]);
  return rows[0];
};

const createUser = async (name, email, hashedPassword) => {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
  return result.insertId;
};

module.exports = { findUserByEmail, findUserById, createUser };
