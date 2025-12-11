export function computeSummary(data) {
  let totalIncome = 0;
  let totalExpense = 0;

  data.incomes.forEach(i => totalIncome += Number(i.amount));
  data.expenses.forEach(e => totalExpense += Number(e.amount));

  return {
    totalIncome,
    totalExpense,
    profitLoss: totalIncome - totalExpense,
    costPerAcre: totalExpense / (data.farmer.total_acres || 1)
  };
}
