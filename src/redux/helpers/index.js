export function updateExpenses(expenses, expenseId, expenseData = undefined) {
  const expensesCopy = [...expenses];
  if (expenseData) {
    const { description, tag, value, method, currency } = expenseData;
    const expenseToEdit = expensesCopy.find(({ id }) => id === expenseId);
    expenseToEdit.description = description;
    expenseToEdit.tag = tag;
    expenseToEdit.value = value;
    expenseToEdit.method = method;
    expenseToEdit.currency = currency;
    return expensesCopy;
  }
  return expensesCopy.filter(({ id }) => id !== expenseId);
}
