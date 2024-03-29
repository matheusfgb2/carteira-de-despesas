import {
  WALLET_REQUEST_STARTED,
  WALLET_REQUEST_FAILED,
  GET_WALLET_USER_ID,
  GET_WALLET_CURRENCIES,
  GET_EXPENSE_ID_TO_EDIT,
  SAVE_NEW_EXPENSE,
  SAVE_EDITED_EXPENSE,
  DELETE_EXPENSE,
  SHOW_EXPENSE_FORM,
} from '../actions/actionTypes';

import { handleExpenses } from '../helpers';

const INITIAL_STATE = {
  walletUserId: '',
  currencies: [],
  expenses: [],
  isEditMode: false,
  idToEdit: '',
  isFetching: false,
  errorMessage: '',
  isFormVisible: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_REQUEST_STARTED:
    return { ...state, isFetching: true };
  case WALLET_REQUEST_FAILED:
    return { ...state, isFetching: false, errorMessage: action.payload };
  case GET_WALLET_USER_ID:
    return { ...state,
      walletUserId: action.payload,
      expenses: JSON.parse(localStorage.getItem(action.payload)) || [] };
  case GET_WALLET_CURRENCIES:
    return { ...state, isFetching: false, currencies: action.payload };
  case GET_EXPENSE_ID_TO_EDIT:
    return { ...state, isEditMode: true, idToEdit: action.payload };
  case SAVE_NEW_EXPENSE:
    return { ...state,
      isFetching: false,
      isFormVisible: false,
      expenses: handleExpenses(action.payload, state) };
  case SAVE_EDITED_EXPENSE:
    return { ...state,
      isEditMode: false,
      isFormVisible: false,
      expenses: handleExpenses(action.payload, state),
      idToEdit: '' };
  case DELETE_EXPENSE:
    return { ...state, expenses: handleExpenses(action.payload, state) };
  case SHOW_EXPENSE_FORM:
    return { ...state, isFormVisible: action.payload };
  default:
    return state;
  }
};

export default wallet;
