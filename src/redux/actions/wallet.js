export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const GET_TOTAL_OF_EXPENSES = 'GET_TOTAL_OF_EXPENSES';

const requestStarted = () => ({ type: REQUEST_STARTED });
const requestSuccessful = (currencies) => ({
  type: REQUEST_SUCCESSFUL,
  payload: currencies,
});
const requestFailed = (error) => ({
  type: REQUEST_FAILED,
  payload: error,
});

export function thunkCurrencies() {
  return async (dispatch) => {
    try {
      dispatch(requestStarted());
      const API_URL = 'https://economia.awesomeapi.com.br/json/all';
      const request = await fetch(API_URL);
      const data = await request.json();
      const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');

      dispatch(requestSuccessful(currencies));
    } catch (error) {
      dispatch(requestFailed(error.message));
    }
  };
}

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  payload: expense,
});

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  payload: expenseId,
});

export const getTotalOfExpenses = () => ({ type: GET_TOTAL_OF_EXPENSES });
