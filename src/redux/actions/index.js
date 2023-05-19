// user actions
export const CREATE_USER = 'CREATE_USER';
export const GET_USER = 'GET_USER';

export const createUser = (userData) => ({
  type: CREATE_USER,
  payload: {
    ...userData,
    id: '0',
  },
});

export const getUser = (userId) => ({
  type: GET_USER,
  payload: userId,
});

// wallet actions
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';
export const GET_ID_TO_EDIT = 'GET_ID_TO_EDIT';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const saveEditedExpense = (expenseData) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: expenseData,
});

export const getIdToEdit = (expenseId) => ({
  type: GET_ID_TO_EDIT,
  payload: expenseId,
});

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  payload: expenseId,
});

// thunkCurrenciesAndAddExpense
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const CURRENCIES_SUCCESSFUL = 'CURRENCIES_SUCCESSFUL';
export const EXPENSE_SUCCESSFUL = 'EXPENSE_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

const requestStarted = () => ({
  type: REQUEST_STARTED,
});
const currenciesSuccessful = (currencies) => ({
  type: CURRENCIES_SUCCESSFUL,
  payload: currencies,
});
const expenseSuccessful = (expense) => ({
  type: EXPENSE_SUCCESSFUL,
  payload: expense,
});
const requestFailed = (error) => ({
  type: REQUEST_FAILED, payload: error,
});

export function thunkCurrenciesAndAddExpense(expenseData = undefined) {
  return async (dispatch) => {
    try {
      dispatch(requestStarted());
      const API_URL = 'https://economia.awesomeapi.com.br/json/all';
      const request = await fetch(API_URL);
      const exchangeRates = await request.json();
      if (expenseData) {
        const expense = {
          ...expenseData,
          exchangeRates,
        };
        dispatch(expenseSuccessful(expense));
        return;
      }
      const currencies = Object.keys(exchangeRates)
        .filter((currency) => currency !== 'USDT');
      dispatch(currenciesSuccessful(currencies));
    } catch (error) {
      dispatch(requestFailed(error.message));
    }
  };
}
