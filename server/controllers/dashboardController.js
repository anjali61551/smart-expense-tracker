const { getSummary, getMonthlyData, getDailyData, getCategoryBreakdown, getRecentTransactions } = require('../models/transactionModel');

const getDashboard = async (req, res) => {
  const userId = req.user.id;
  const month = req.query.month ? parseInt(req.query.month) : (new Date().getMonth() + 1);
  const year = req.query.year ? parseInt(req.query.year) : new Date().getFullYear();

  // Lifetime summary
  const summary = await getSummary(userId);
  const totalIncome = parseFloat(summary?.totalIncome) || 0;
  const totalExpenses = parseFloat(summary?.totalExpenses) || 0;
  const balance = totalIncome - totalExpenses;

  // Selected Month summary
  const monthSummary = await getSummary(userId, month, year);
  const selectedMonthIncome = parseFloat(monthSummary?.totalIncome) || 0;
  const selectedMonthExpenses = parseFloat(monthSummary?.totalExpenses) || 0;
  const selectedMonthBalance = selectedMonthIncome - selectedMonthExpenses;

  const monthlyData = await getMonthlyData(userId);
  const dailyData = await getDailyData(userId, month, year);

  const monthlyExpenseCategories = await getCategoryBreakdown(userId, 'expense', month, year);
  const monthlyIncomeCategories = await getCategoryBreakdown(userId, 'income', month, year);
  const allExpenseCategoryBreakdown = await getCategoryBreakdown(userId, 'expense');

  const recentTransactions = await getRecentTransactions(userId, 5);

  res.json({
    totalIncome,
    totalExpenses,
    balance,
    selectedMonthIncome,
    selectedMonthExpenses,
    selectedMonthBalance,
    monthlyData,
    dailyData,
    categoryBreakdown: allExpenseCategoryBreakdown,
    monthlyExpenseCategories,
    monthlyIncomeCategories,
    recentTransactions
  });
};

module.exports = { getDashboard };
