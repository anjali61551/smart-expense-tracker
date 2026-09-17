const { getTransactions } = require('../models/transactionModel');
const { getSummary } = require('../models/transactionModel');

const exportCSV = async (req, res) => {
  const transactions = await getTransactions(req.user.id, {});
  const headers = ['ID', 'Type', 'Amount', 'Category', 'Description', 'Date'];
  const rows = transactions.map(t => [
    t.id, t.type, t.amount, t.category, t.description || '', t.date
  ]);
  const csv = [headers, ...rows]
    .map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="transactions.csv"');
  res.send(csv);
};

const exportPDF = async (req, res) => {
  const transactions = await getTransactions(req.user.id, {});
  const summary = await getSummary(req.user.id);
  const totalIncome = parseFloat(summary.totalIncome) || 0;
  const totalExpenses = parseFloat(summary.totalExpenses) || 0;
  const balance = totalIncome - totalExpenses;

  // Build a simple HTML page that the browser can print as PDF
  const rows = transactions.map(t => `
    <tr>
      <td>${t.date}</td>
      <td style="text-transform:capitalize">${t.type}</td>
      <td>${t.category}</td>
      <td>${t.description || '-'}</td>
      <td style="color:${t.type === 'income' ? 'green' : 'red'}">
        ${t.type === 'income' ? '+Rs. ' : '-Rs. '}${parseFloat(t.amount).toFixed(2)}
      </td>
    </tr>`).join('');

  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/>
<title>Smart Expense Tracker — Financial Report</title>
<style>
  body { font-family: 'Segoe UI', Arial, sans-serif; padding: 32px; color: #1e293b; background: #fff; }
  .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px; }
  h1 { color: #4f46e5; margin: 0; font-size: 24px; }
  .date { color: #64748b; font-size: 13px; }
  .btn-print { background: #4f46e5; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; }
  .btn-print:hover { background: #4338ca; }
  .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
  .card { padding: 16px; border-radius: 10px; background: #f8fafc; border: 1px solid #e2e8f0; }
  .card-title { font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; }
  .card-val { font-size: 20px; font-weight: bold; margin-top: 4px; }
  .income { color: #10b981; }
  .expense { color: #ef4444; }
  .balance { color: #4f46e5; }
  table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
  th { background: #f1f5f9; color: #475569; padding: 10px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #cbd5e1; }
  td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
  tr:hover { background: #f8fafc; }
  @media print {
    .btn-print { display: none; }
    body { padding: 0; }
  }
</style></head>
<body>
<div class="header">
  <div>
    <h1>💸 Smart Expense Tracker</h1>
    <div class="date">Statement Generated on: ${new Date().toLocaleDateString()}</div>
  </div>
  <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
</div>

<div class="summary">
  <div class="card">
    <div class="card-title">Total Income</div>
    <div class="card-val income">Rs. ${totalIncome.toFixed(2)}</div>
  </div>
  <div class="card">
    <div class="card-title">Total Expenses</div>
    <div class="card-val expense">Rs. ${totalExpenses.toFixed(2)}</div>
  </div>
  <div class="card">
    <div class="card-title">Net Balance</div>
    <div class="card-val balance">Rs. ${balance.toFixed(2)}</div>
  </div>
</div>

<h3>All Transactions (${transactions.length} records)</h3>
<table>
  <thead><tr><th>Date</th><th>Type</th><th>Category</th><th>Description</th><th style="text-align:right">Amount</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
</body></html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
};

module.exports = { exportCSV, exportPDF };
