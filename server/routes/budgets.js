const router = require('express').Router();
const { list, listWithSpent, create, update, remove } = require('../controllers/budgetController');
const auth = require('../middleware/auth');

router.use(auth);
router.get('/', list);
router.get('/vs-spent', listWithSpent);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
