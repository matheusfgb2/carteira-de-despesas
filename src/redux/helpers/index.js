function saveNewExpense(userId, expenses, expenseData) {
  const updatedExpenses = [...expenses, expenseData];
  localStorage.setItem(userId, JSON.stringify(updatedExpenses));
  return updatedExpenses;
}

function saveEditedExpense(userId, expenses, expenseId, expenseData) {
  const expensesCopy = [...expenses];
  const { description, tag, value, method, currency } = expenseData;
  const expenseToEdit = expensesCopy.find(({ id }) => id === expenseId);
  expenseToEdit.description = description;
  expenseToEdit.tag = tag;
  expenseToEdit.value = Number(value);
  expenseToEdit.method = method;
  expenseToEdit.currency = currency;
  localStorage.setItem(userId, JSON.stringify(expensesCopy));
  return expensesCopy;
}

function saveWithoutRemovedExpense(userId, expenses, expenseId) {
  const expensesCopy = expenses.filter(({ id }) => id !== expenseId);
  localStorage.setItem(userId, JSON.stringify(expensesCopy));
  return expensesCopy;
}

export function updateExpenses(
  { userId, expenseData = undefined, idToRemove = undefined },
  expenses,
  idToEdit = undefined,
) {
  if (!idToEdit && expenseData) return saveNewExpense(userId, expenses, expenseData);
  if (expenseData) return saveEditedExpense(userId, expenses, idToEdit, expenseData);
  return saveWithoutRemovedExpense(userId, expenses, idToRemove);
}
