// user actions
export const GET_EMAIL = 'GET_EMAIL';

export const getEmail = (email) => ({
  type: GET_EMAIL,
  payload: email,
});

// wallet actions
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const GET_TOTAL_OF_EXPENSES = 'GET_TOTAL_OF_EXPENSES';

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  payload: expense,
});

export const editExpense = (expenseId) => ({
  type: EDIT_EXPENSE,
  payload: expenseId,
});

export const deleteExpenses = (expenseId = '') => ({
  type: DELETE_EXPENSES,
  payload: expenseId,
});

export const getTotalOfExpenses = () => ({ type: GET_TOTAL_OF_EXPENSES });
