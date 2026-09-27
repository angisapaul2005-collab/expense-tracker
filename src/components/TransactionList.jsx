function TransactionList({
  transactions,
  onDeleteTransaction,
}) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="transaction-list panel">

      <div className="list-heading">

        <div>
          <p className="eyebrow">
            TRANSACTIONS
          </p>

          <h2>Recent Transactions</h2>
        </div>

        <span className="transaction-count">
          {transactions.length} items
        </span>

      </div>

      {transactions.length === 0 ? (
        <div className="empty-transactions">

          <div className="empty-icon">
            ₹
          </div>

          <h3>
            No transactions yet
          </h3>

          <p>
            Add your first income or expense
            to start tracking your finances.
          </p>

        </div>
      ) : (
        <div className="transaction-items">

          {transactions.map((transaction) => (

            <div
              className="transaction-item"
              key={transaction.id}
            >

              <div
                className={`transaction-icon ${
                  transaction.type === "Income"
                    ? "income-icon"
                    : "expense-icon"
                }`}
              >
                {transaction.type === "Income"
                  ? "↑"
                  : "↓"}
              </div>

              <div className="transaction-info">

                <h3>
                  {transaction.description}
                </h3>

                <p>
                  {transaction.category}
                  {" • "}
                  {formatDate(transaction.date)}
                </p>

              </div>

              <div className="transaction-amount">

                <strong
                  className={
                    transaction.type === "Income"
                      ? "income"
                      : "expense"
                  }
                >
                  {transaction.type === "Income"
                    ? "+"
                    : "-"}
                  ₹
                  {transaction.amount.toLocaleString(
                    "en-IN"
                  )}
                </strong>

                <button
                  className="delete-button"
                  onClick={() =>
                    onDeleteTransaction(
                      transaction.id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default TransactionList;