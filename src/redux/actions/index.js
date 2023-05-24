import {
  CREATE_USER,

  REQUEST_STARTED,
  REQUEST_FAILED,
  GET_WALLET_USER_ID,
  GET_CURRENCIES,
  GET_ID_TO_EDIT,
  SAVE_NEW_EXPENSE,
  SAVE_EDITED_EXPENSE,
  DELETE_EXPENSE,

} from './actionTypes';

// users actions
export const createUser = (userData) => ({
  type: CREATE_USER,
  payload: userData,
});

// wallet actions
const requestStarted = () => ({
  type: REQUEST_STARTED,
});
const requestFailed = (error) => ({
  type: REQUEST_FAILED, payload: error,
});
const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});
const saveNewExpense = (expenseData) => ({
  type: SAVE_NEW_EXPENSE,
  payload: { expenseData },
});

export const getWalletUserId = (userId) => ({
  type: GET_WALLET_USER_ID,
  payload: userId,
});
export const getIdToEdit = (IdToEdit) => ({
  type: GET_ID_TO_EDIT,
  payload: IdToEdit,
});
export const saveEditedExpense = (expenseData) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: { expenseData },
});
export const deleteExpense = (idToRemove) => ({
  type: DELETE_EXPENSE,
  payload: { idToRemove },
});

export const thunkCurrenciesAndAddExpense = (
  expenseData = undefined,
) => async (dispatch) => {
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
      dispatch(saveNewExpense(expense));
      return;
    }
    const currencies = Object.keys(exchangeRates)
      .filter((currency) => currency !== 'USDT');
    dispatch(getCurrencies(currencies));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};
