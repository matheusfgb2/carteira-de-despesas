import {
  CREATE_USER, EDIT_USER, DELETE_EXPENSE, GET_ID_TO_EDIT,
  GET_USER_CURRENCIES, GET_WALLET_CURRENCIES, GET_WALLET_USER_ID,
  SAVE_EDITED_EXPENSE, SAVE_NEW_EXPENSE, USERS_REQUEST_FAILED,
  USERS_REQUEST_STARTED, WALLET_REQUEST_FAILED, WALLET_REQUEST_STARTED, DELETE_USER,
} from './actionTypes';

// users
export const usersRequestStarted = () => ({
  type: USERS_REQUEST_STARTED,
});
export const usersRequestFailed = (error) => ({
  type: USERS_REQUEST_FAILED, payload: error,
});
export const getUserCurrencies = (currencies) => ({
  type: GET_USER_CURRENCIES,
  payload: currencies,
});
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
export const walletRequestStarted = () => ({
  type: WALLET_REQUEST_STARTED,
});
export const walletRequestFailed = (error) => ({
  type: WALLET_REQUEST_FAILED, payload: error,
});
export const getWalletCurrencies = (currencies) => ({
  type: GET_WALLET_CURRENCIES,
  payload: currencies,
});
export const getWalletUserId = (userId) => ({
  type: GET_WALLET_USER_ID,
  payload: userId,
});
export const getIdToEdit = (IdToEdit) => ({
  type: GET_ID_TO_EDIT,
  payload: IdToEdit,
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
