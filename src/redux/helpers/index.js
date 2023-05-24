const saveNewExpense = (userId, expenses, expenseData) => {
  const updatedExpenses = [...expenses, expenseData];
  localStorage.setItem(userId, JSON.stringify(updatedExpenses));
  return updatedExpenses;
};

const saveEditedExpense = (userId, expenseId, expenses, expenseData) => {
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
};

const saveWithoutRemovedExpense = (userId, expenseId, expenses) => {
  const expensesCopy = expenses.filter(({ id }) => id !== expenseId);
  localStorage.setItem(userId, JSON.stringify(expensesCopy));
  return expensesCopy;
};

export const updateExpenses = (
  { expenseData = undefined, idToRemove = undefined },
  { idToEdit = undefined, expenses, walletUserId },
) => {
  if (!idToEdit && expenseData) {
    return saveNewExpense(walletUserId, expenses, expenseData);
  }
  if (expenseData) {
    return saveEditedExpense(walletUserId, idToEdit, expenses, expenseData);
  }
  return saveWithoutRemovedExpense(walletUserId, idToRemove, expenses);
};
