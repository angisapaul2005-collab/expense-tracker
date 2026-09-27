import { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import Charts from "./components/Charts";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("expenseTrackerTransactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "expenseTrackerTransactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((previous) => [transaction, ...previous]);
  };

  const deleteTransaction = (id) => {
    setTransactions((previous) =>
      previous.filter((transaction) => transaction.id !== id)
    );
  };

  const totalIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthlyExpenses = transactions
    .filter(
      (item) =>
        item.type === "Expense" &&
        item.date.startsWith(currentMonth)
    )
    .reduce((sum, item) => sum + item.amount, 0);

  const exportCSV = () => {
    if (transactions.length === 0) {
      alert("There are no transactions to export.");
      return;
    }

    const headers = [
      "Date",
      "Type",
      "Category",
      "Description",
      "Amount",
    ];

    const rows = transactions.map((item) => [
      item.date,
      item.type,
      item.category,
      item.description,
      item.amount,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "expense-tracker.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">

      <header className="top-header">

        <div className="brand">

          <div className="brand-icon">
            ₹
          </div>

          <div>
            <h1>Expense Tracker</h1>
            <p>Smart money management</p>
          </div>

        </div>

        <button
          className="export-button"
          onClick={exportCSV}
        >
          ↓ Export CSV
        </button>

      </header>

      <main className="dashboard">

        <section className="hero-section">

          <p className="eyebrow">
            PERSONAL FINANCE
          </p>

          <h2>
            Track your money
            <br />
            with clarity.
          </h2>

          <p className="subtitle">
            Record your income, manage expenses,
            analyze your spending and stay in
            control of your finances.
          </p>

        </section>

        <Summary
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          monthlyExpenses={monthlyExpenses}
        />

        <section className="main-grid">

          <TransactionForm
            onAddTransaction={addTransaction}
          />

          <TransactionList
            transactions={transactions}
            onDeleteTransaction={deleteTransaction}
          />

        </section>

        <Charts
          transactions={transactions}
        />

      </main>

      <footer className="footer">
        <p>
          Expense Tracker • Built with React
        </p>
      </footer>

    </div>
  );
}

export default App;