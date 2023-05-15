export function reduceExpenses(expenses) {
  return expenses.reduce((total, expense) => {
    const { currency } = expense;
    const rating = expense.exchangeRates[currency].ask;
    const finalValue = Number(rating) * Number(expense.value);
    return total + finalValue;
  }, 0);
}
