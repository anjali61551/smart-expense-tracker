const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  getStats,
  getUsers,
  setRole,
  removeUser,
  getTransactions,
  removeTransaction,
  getSettings,
  saveSettings,
  downloadBackup
} = require('../controllers/adminController');

// All admin routes require adminAuth middleware
router.use(adminAuth);

// Dashboard stats
router.get('/stats', getStats);

// User management
router.get('/users', getUsers);
router.put('/users/:id/role', setRole);
router.delete('/users/:id', removeUser);

// Global transactions
router.get('/transactions', getTransactions);
router.delete('/transactions/:id', removeTransaction);

// Settings and server health
router.get('/settings', getSettings);
router.put('/settings', saveSettings);

// Database backup
router.get('/backup/download', downloadBackup);

module.exports = router;
