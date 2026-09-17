# 💸 Smart Expense Tracker

A full-stack personal finance web application built with **React.js**, **Node.js/Express**, and **MySQL**.

---

## 🚀 Features

- 🔐 **Authentication** — JWT-based login & registration
- 📊 **Dashboard** — Summary cards, income vs expense bar chart, category pie chart
- 💳 **Transaction Management** — Add, edit, delete income & expenses
- 🔍 **Search & Filter** — Filter by type, category, date range, keyword
- 💰 **Budget Tracking** — Set monthly category budgets with progress bars
- 📈 **Reports** — 6-month trend line chart, category breakdown table
- 📤 **Export** — Download transactions as CSV or printable PDF report

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MySQL |
| Auth | JWT + bcryptjs |
| Charts | Recharts |

---

## ⚙️ Setup Instructions

### 1. MySQL Database

Open MySQL and run the schema file:

```sql
source server/config/schema.sql
```

Or manually run the SQL in `server/config/schema.sql`.

### 2. Backend Setup

```bash
cd server
```

Edit `.env` and set your MySQL credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=smart_expense_tracker
JWT_SECRET=your_secret_key
```

Then start the server:

```bash
npm run dev
```

The backend runs on **http://localhost:5000**

### 3. Frontend Setup

```bash
cd client
npm run dev
```

The frontend runs on **http://localhost:5173**

---

## 📁 Project Structure

```
smart-expense-tracker/
├── server/
│   ├── config/         # DB connection & schema.sql
│   ├── controllers/    # Business logic
│   ├── middleware/     # JWT auth middleware
│   ├── models/         # MySQL query functions
│   ├── routes/         # API routes
│   └── server.js       # Express entry point
│
├── client/
│   └── src/
│       ├── components/ # Sidebar, Layout, ProtectedRoute
│       ├── context/    # AuthContext
│       ├── pages/      # Dashboard, Transactions, Budgets, Reports
│       └── utils/      # Axios instance
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/dashboard/summary` | Dashboard data |
| GET | `/api/transactions` | List transactions |
| POST | `/api/transactions` | Add transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |
| GET | `/api/budgets/vs-spent` | Budgets with spending |
| POST | `/api/budgets` | Create budget |
| GET | `/api/export/csv` | Export as CSV |
| GET | `/api/export/pdf` | Export as PDF |

---

## 👨‍💻 College Project Info

- **Project Name:** Smart Expense Tracker
- **Tech Stack:** React.js + Node.js + MySQL
