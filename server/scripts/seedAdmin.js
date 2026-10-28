const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function seedAdmin() {
  try {
    const hash = await bcrypt.hash('admin123', 10);
    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ('System Admin', 'admin@smartexpense.com', ?, 'admin') ON DUPLICATE KEY UPDATE role='admin'",
      [hash]
    );
    await pool.query("UPDATE users SET role='admin' WHERE id=1");
    console.log('✅ Admin accounts ready.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
}

seedAdmin();
