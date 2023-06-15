import { fetchExpenseExchRates, fetchWalletCurrencies } from '../../services/api';

import {
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  DELETE_EXPENSE,
  GET_WALLET_USER_ID,
  WALLET_REQUEST_STARTED,
  WALLET_REQUEST_FAILED,
  GET_WALLET_CURRENCIES,
  SAVE_NEW_EXPENSE,
  GET_EXPENSE_ID_TO_EDIT,
  SAVE_EDITED_EXPENSE,
} from './actionTypes';

// users
export const createUser = (userData) => ({
  type: CREATE_USER,
  payload: { userData },
});
export const editUser = (userData) => ({
  type: EDIT_USER,
  payload: { userData },
});
export const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: { userId },
});

// wallet
export const getWalletUserId = (userId) => ({
  type: GET_WALLET_USER_ID,
  payload: userId,
});
export const getExpenseIdToEdit = (idToEdit) => ({
  type: GET_EXPENSE_ID_TO_EDIT,
  payload: idToEdit,
});
export const saveNewExpense = (expenseData) => ({
  type: SAVE_NEW_EXPENSE,
  payload: { expenseData },
});
export const saveEditedExpense = (expenseData) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: { expenseData },
});
export const deleteExpense = (idToRemove) => ({
  type: DELETE_EXPENSE,
  payload: { idToRemove },
});

const walletRequestStarted = () => ({
  type: WALLET_REQUEST_STARTED,
});
const walletRequestFailed = (error) => ({
  type: WALLET_REQUEST_FAILED, payload: error,
});
const getWalletCurrencies = (currencies) => ({
  type: GET_WALLET_CURRENCIES,
  payload: currencies,
});

export const thunkCurrenciesAndAddExpense = (
  userCurrency,
  expenseData = undefined,
) => async (dispatch) => {
  try {
    dispatch(walletRequestStarted());

    const currencies = await fetchWalletCurrencies(userCurrency);
    if (expenseData) {
      const exchangeRates = await fetchExpenseExchRates(currencies, userCurrency);

      const expense = {
        ...expenseData,
        value: Number(expenseData.value),
        exchangeRates,
      };

      dispatch(saveNewExpense(expense));
      return;
    }
    dispatch(getWalletCurrencies(currencies));
  } catch (error) {
    console.log(error);
    dispatch(walletRequestFailed(error.message));
  }
};
