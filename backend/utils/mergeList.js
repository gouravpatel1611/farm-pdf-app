export function mergeAndSortByDate(expenses, incomes) {
  const expensesWithType = expenses.map(e => ({
    date: e.date,
    category: e.category,
    type: 'expense',
    des: e.description,
    amount: e.amount
  }));

  const incomesWithType = incomes.map(i => ({
    date: i.date,
    category: i.category,
    type: 'income',
    des: i.description,
    amount: i.amount
  }));

  const merged = [...expensesWithType, ...incomesWithType];

  merged.sort((a, b) => new Date(a.date) - new Date(b.date));

  return merged;
}

const expenses = [
  { category: 'ABC', amount: 500, date: '2002-12-11', description: 'HALO' },
  { category: 'cde', amount: 200, date: '2024-03-11', description: '1235' }
];

const incomes = [
  { category: 'BCA', amount: 100, date: '2025-02-12', description: 'LOLO' },
  { category: 'mca', amount: 50000, date: '2025-02-14', description: '1225' }
];

