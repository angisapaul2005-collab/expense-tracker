function Summary({
  totalBalance,
  totalIncome,
  totalExpenses,
  monthlyExpenses,
}) {
  const formatMoney = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div className="summary-grid">

      <div className="summary-card">
        <p>Total Balance</p>

        <h2>
          {formatMoney(totalBalance)}
        </h2>

        <span>
          Current balance
        </span>
      </div>

      <div className="summary-card">
        <p>Total Income</p>

        <h2 className="income-text">
          {formatMoney(totalIncome)}
        </h2>

        <span>
          All income
        </span>
      </div>

      <div className="summary-card">
        <p>Total Expenses</p>

        <h2 className="expense-text">
          {formatMoney(totalExpenses)}
        </h2>

        <span>
          All expenses
        </span>
      </div>

      <div className="summary-card">
        <p>This Month</p>

        <h2>
          {formatMoney(monthlyExpenses)}
        </h2>

        <span>
          Monthly expenses
        </span>
      </div>

    </div>
  );
}

export default Summary;