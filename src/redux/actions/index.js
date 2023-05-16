// user actions
export const GET_EMAIL = 'GET_EMAIL';

export const getEmail = (email) => ({
  type: GET_EMAIL,
  payload: email,
});

// wallet actions
export const SAVE_EXPENSES = 'SAVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const GET_TOTAL_OF_EXPENSES = 'GET_TOTAL_OF_EXPENSES';

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  payload: expenses,
});

export const editExpense = (expenseId) => ({
  type: EDIT_EXPENSE,
  payload: expenseId,
});

export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  payload: expenses,
});

export const getTotalOfExpenses = () => ({ type: GET_TOTAL_OF_EXPENSES });
