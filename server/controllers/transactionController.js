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

const formatDate = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const validateTransactionDate = (date) => {
  if (!date) return { valid: false, message: 'Transaction date is required' };
  
  const inputDate = String(date).split('T')[0];
  const now = new Date();
  const todayStr = formatDate(now);
  
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  const oneYearAgoStr = formatDate(oneYearAgo);

  if (inputDate > todayStr) {
    return { valid: false, message: 'Future transaction dates are not allowed.' };
  }
  if (inputDate < oneYearAgoStr) {
    return { valid: false, message: 'Past transactions can only be recorded up to 1 year back from the current date.' };
  }
  return { valid: true, date: inputDate };
};

const create = async (req, res) => {
  const { type, amount, category, description, date } = req.body;
  if (!type || !amount || !category || !date)
    return res.status(400).json({ message: 'type, amount, category and date are required' });

  const dateValidation = validateTransactionDate(date);
  if (!dateValidation.valid) {
    return res.status(400).json({ message: dateValidation.message });
  }

  const id = await createTransaction(req.user.id, { type, amount, category, description, date: dateValidation.date });
  res.status(201).json({ id, message: 'Transaction created' });
};

const update = async (req, res) => {
  const { type, amount, category, description, date } = req.body;
  if (!date)
    return res.status(400).json({ message: 'Date is required' });

  const dateValidation = validateTransactionDate(date);
  if (!dateValidation.valid) {
    return res.status(400).json({ message: dateValidation.message });
  }

  const rows = await updateTransaction(req.params.id, req.user.id, { type, amount, category, description, date: dateValidation.date });
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
