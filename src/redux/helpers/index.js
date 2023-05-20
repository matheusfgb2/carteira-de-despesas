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
  expenseToEdit.value = value;
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
  userId,
  expenses,
  expenseId = undefined,
  expenseData = undefined,
) {
  if (!expenseId && expenseData) return saveNewExpense(userId, expenses, expenseData);

  if (expenseData) return saveEditedExpense(userId, expenses, expenseId, expenseData);

  return saveWithoutRemovedExpense(userId, expenses, expenseId);
}
