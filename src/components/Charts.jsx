import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

function Charts({ transactions }) {

  const expenseCategories = {};

  transactions
    .filter(
      (transaction) =>
        transaction.type === "Expense"
    )
    .forEach((transaction) => {

      if (!expenseCategories[transaction.category]) {
        expenseCategories[transaction.category] = 0;
      }

      expenseCategories[transaction.category] +=
        transaction.amount;
    });

  const pieData = Object.entries(
    expenseCategories
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const totalIncome = transactions
    .filter(
      (transaction) =>
        transaction.type === "Income"
    )
    .reduce(
      (sum, transaction) =>
        sum + transaction.amount,
      0
    );

  const totalExpense = transactions
    .filter(
      (transaction) =>
        transaction.type === "Expense"
    )
    .reduce(
      (sum, transaction) =>
        sum + transaction.amount,
      0
    );

  const barData = [
    {
      name: "Finance",
      Income: totalIncome,
      Expense: totalExpense,
    },
  ];

  const dailyExpenses = {};

  transactions
    .filter(
      (transaction) =>
        transaction.type === "Expense"
    )
    .forEach((transaction) => {

      if (!dailyExpenses[transaction.date]) {
        dailyExpenses[transaction.date] = 0;
      }

      dailyExpenses[transaction.date] +=
        transaction.amount;
    });

  const lineData = Object.entries(
    dailyExpenses
  )
    .sort(([dateA], [dateB]) =>
      dateA.localeCompare(dateB)
    )
    .map(([date, amount]) => ({
      date,
      amount,
    }));

  return (
    <section className="charts-section">

      <div className="charts-header">

        <p className="eyebrow">
          FINANCIAL ANALYSIS
        </p>

        <h2>Expense Insights</h2>

        <p>
          Understand your spending through
          simple visual analysis.
        </p>

      </div>

      <div className="charts-grid">

        <div className="chart-card">

          <div className="chart-title">
            <h3>
              Expenses by Category
            </h3>

            <span>Pie Chart</span>
          </div>

          {pieData.length === 0 ? (
            <div className="chart-empty">
              Add expenses to see the chart.
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                />

                <Tooltip />

                <Legend />

              </PieChart>
            </ResponsiveContainer>
          )}

        </div>

        <div className="chart-card">

          <div className="chart-title">
            <h3>
              Income vs Expense
            </h3>

            <span>Bar Chart</span>
          </div>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={barData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="Income"
                name="Income"
              />

              <Bar
                dataKey="Expense"
                name="Expense"
              />

            </BarChart>
          </ResponsiveContainer>

        </div>

        <div className="chart-card chart-wide">

          <div className="chart-title">
            <h3>
              Daily Expense Trend
            </h3>

            <span>Line Chart</span>
          </div>

          {lineData.length === 0 ? (
            <div className="chart-empty">
              Add expenses to see your daily
              spending trend.
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart data={lineData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="amount"
                  name="Daily Expense"
                  strokeWidth={3}
                />

              </LineChart>
            </ResponsiveContainer>
          )}

        </div>

      </div>

    </section>
  );
}

export default Charts;