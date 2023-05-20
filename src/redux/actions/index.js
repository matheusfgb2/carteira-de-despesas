// users actions
export const CREATE_USER = 'CREATE_USER';
export const GET_USER_ID = 'GET_USER_ID';

export const createUser = (userData) => ({
  type: CREATE_USER,
  payload: userData,
});

export const getUserId = (userId) => ({
  type: GET_USER_ID,
  payload: userId,
});

// wallet actions
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';
export const GET_ID_TO_EDIT = 'GET_ID_TO_EDIT';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const saveEditedExpense = (userId, expenseData) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: { userId, expenseData },
});

export const getIdToEdit = (IdToEdit) => ({
  type: GET_ID_TO_EDIT,
  payload: IdToEdit,
});

export const deleteExpense = (userId, idToRemove) => ({
  type: DELETE_EXPENSE,
  payload: { userId, idToRemove },
});

// thunkCurrenciesAndAddExpense
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const CURRENCIES_SUCCESSFUL = 'CURRENCIES_SUCCESSFUL';
export const EXPENSE_SUCCESSFUL = 'EXPENSE_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

const requestStarted = () => ({
  type: REQUEST_STARTED,
});
const currenciesSuccessful = (userId, currencies) => ({
  type: CURRENCIES_SUCCESSFUL,
  payload: [userId, currencies],
});
const expenseSuccessful = (userId, expenseData) => ({
  type: EXPENSE_SUCCESSFUL,
  payload: { userId, expenseData },
});
const requestFailed = (error) => ({
  type: REQUEST_FAILED, payload: error,
});

export function thunkCurrenciesAndAddExpense(
  userId,
  expenseData = undefined,
) {
  return async (dispatch) => {
    try {
      dispatch(requestStarted());
      const API_URL = 'https://economia.awesomeapi.com.br/json/all';
      const request = await fetch(API_URL);
      const exchangeRates = await request.json();
      if (expenseData) {
        const expense = {
          ...expenseData,
          value: Number(expenseData.value),
          exchangeRates,
        };
        dispatch(expenseSuccessful(userId, expense));
        return;
      }
      const currencies = Object.keys(exchangeRates)
        .filter((currency) => currency !== 'USDT');
      dispatch(currenciesSuccessful(userId, currencies));
    } catch (error) {
      dispatch(requestFailed(error.message));
    }
  };
}
