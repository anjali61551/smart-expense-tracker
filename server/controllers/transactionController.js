const {
  getTransactions, getTransactionById, createTransaction,
  updateTransaction, deleteTransaction
} = require('../models/transactionModel');

const list = async (req, res) => {
  const filters = {
    type: req.query.type,
    category: req.query.category,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
    search: req.query.search,
  };
  const transactions = await getTransactions(req.user.id, filters);
  res.json(transactions);
};

const create = async (req, res) => {
  const { type, amount, category, description, date } = req.body;
  if (!type || !amount || !category || !date)
    return res.status(400).json({ message: 'type, amount, category and date are required' });
  const id = await createTransaction(req.user.id, { type, amount, category, description, date });
  res.status(201).json({ id, message: 'Transaction created' });
};

const update = async (req, res) => {
  const { type, amount, category, description, date } = req.body;
  const rows = await updateTransaction(req.params.id, req.user.id, { type, amount, category, description, date });
  if (!rows) return res.status(404).json({ message: 'Transaction not found' });
  res.json({ message: 'Transaction updated' });
};

const remove = async (req, res) => {
  const rows = await deleteTransaction(req.params.id, req.user.id);
  if (!rows) return res.status(404).json({ message: 'Transaction not found' });
  res.json({ message: 'Transaction deleted' });
};

const getOne = async (req, res) => {
  const transaction = await getTransactionById(req.params.id, req.user.id);
  if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
  res.json(transaction);
};

module.exports = { list, create, update, remove, getOne };
