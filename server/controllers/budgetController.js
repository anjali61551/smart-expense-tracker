const { getBudgets, createBudget, updateBudget, deleteBudget, getBudgetVsSpent } = require('../models/budgetModel');

const list = async (req, res) => {
  const { month, year } = req.query;
  const budgets = await getBudgets(req.user.id, month, year);
  res.json(budgets);
};

const listWithSpent = async (req, res) => {
  const month = req.query.month || new Date().getMonth() + 1;
  const year = req.query.year || new Date().getFullYear();
  const data = await getBudgetVsSpent(req.user.id, month, year);
  res.json(data);
};

const create = async (req, res) => {
  const { category, limit_amount, month, year } = req.body;
  if (!category || !limit_amount || !month || !year)
    return res.status(400).json({ message: 'category, limit_amount, month and year are required' });
  const id = await createBudget(req.user.id, { category, limit_amount, month, year });
  res.status(201).json({ id, message: 'Budget saved' });
};

const update = async (req, res) => {
  const { category, limit_amount, month, year } = req.body;
  const rows = await updateBudget(req.params.id, req.user.id, { category, limit_amount, month, year });
  if (!rows) return res.status(404).json({ message: 'Budget not found' });
  res.json({ message: 'Budget updated' });
};

const remove = async (req, res) => {
  const rows = await deleteBudget(req.params.id, req.user.id);
  if (!rows) return res.status(404).json({ message: 'Budget not found' });
  res.json({ message: 'Budget deleted' });
};

module.exports = { list, listWithSpent, create, update, remove };
