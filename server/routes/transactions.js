const router = require('express').Router();
const { list, create, update, remove, getOne } = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.use(auth);
router.get('/', list);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
