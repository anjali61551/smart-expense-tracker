const router = require('express').Router();
const { exportCSV, exportPDF } = require('../controllers/exportController');
const auth = require('../middleware/auth');

router.get('/csv', auth, exportCSV);
router.get('/pdf', auth, exportPDF);

module.exports = router;
