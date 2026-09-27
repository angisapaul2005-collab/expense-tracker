import { useState } from "react";

function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    type: "Expense",
    amount: "",
    category: "Food",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || Number(formData.amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter a description.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: formData.type,
      amount: Number(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
    };

    onAddTransaction(newTransaction);

    setFormData({
      type: "Expense",
      amount: "",
      category: "Food",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="transaction-form panel">

      <div className="form-heading">
        <p className="eyebrow">NEW TRANSACTION</p>

        <h2>Add Transaction</h2>

        <p>Record your income or expense.</p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="form-row">

          <div className="form-group">
            <label>Type</label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount</label>

            <input
              type="number"
              name="amount"
              placeholder="₹ 0"
              value={formData.amount}
              onChange={handleChange}
              min="1"
            />
          </div>

        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">
                Entertainment
              </option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="form-group">

          <label>Description</label>

          <input
            type="text"
            name="description"
            placeholder="Example: Grocery shopping"
            value={formData.description}
            onChange={handleChange}
          />

        </div>

        <button
          type="submit"
          className="save-button"
        >
          + Add Transaction
        </button>

      </form>

    </div>
  );
}

export default TransactionForm;