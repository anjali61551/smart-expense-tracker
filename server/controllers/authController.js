const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { findUserByEmail, createUser, findUserById } = require('../models/userModel');
require('dotenv').config();

const ALLOWED_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'live.com',
  'aol.com',
  'zoho.com',
  'mail.com',
  'proton.me',
  'protonmail.com'
];

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  // Validate email format and domain
  const normalizedEmail = String(email).trim().toLowerCase();
  const emailParts = normalizedEmail.split('@');
  if (emailParts.length !== 2 || !emailParts[0] || !emailParts[1] || !ALLOWED_EMAIL_DOMAINS.includes(emailParts[1])) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  // Check if registration is allowed in system settings
  try {
    const [rows] = await pool.query("SELECT setting_value FROM system_settings WHERE setting_key = 'allow_registration'");
    if (rows.length > 0 && rows[0].setting_value === 'false') {
      return res.status(403).json({ message: 'New user registrations are currently disabled by the administrator.' });
    }
  } catch (err) {
    // If settings table not queried, proceed
  }

  const existing = await findUserByEmail(normalizedEmail);
  if (existing) return res.status(409).json({ message: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const userId = await createUser(name.trim(), normalizedEmail, hashed, 'user');
  const user = { id: userId, name: name.trim(), email: normalizedEmail, role: 'user' };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
  res.status(201).json({ token, user });
};

const login = async (req, res) => {
  const { email, password, portal } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  // Enforce portal-specific access rules silently without revealing roles
  if (portal === 'user' && user.role === 'admin') {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (portal === 'admin' && user.role !== 'admin') {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'user'
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  res.json({ token, user: payload });
};

const getMe = async (req, res) => {
  const user = await findUserById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

module.exports = { register, login, getMe };
