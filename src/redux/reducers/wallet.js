import {
  REQUEST_STARTED, REQUEST_FAILED, GET_WALLET_USER_ID, GET_CURRENCIES,
  GET_ID_TO_EDIT, SAVE_NEW_EXPENSE, SAVE_EDITED_EXPENSE, DELETE_EXPENSE,
} from '../actions/actionTypes';

import { updateExpenses } from '../helpers';

const INITIAL_STATE = {
  walletUserId: '',
  currencies: [],
  expenses: [],
  isEditMode: false,
  idToEdit: '',
  isFetching: false,
  errorMessage: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_STARTED:
    return { ...state, isFetching: true };
  case REQUEST_FAILED:
    return { ...state, isFetching: false, errorMessage: action.payload };
  case GET_WALLET_USER_ID:
    return { ...state,
      walletUserId: action.payload,
      expenses: JSON.parse(localStorage.getItem(action.payload)) || [] };
  case GET_CURRENCIES:
    return { ...state, isFetching: false, currencies: action.payload };
  case GET_ID_TO_EDIT:
    return { ...state, isEditMode: true, idToEdit: action.payload };
  case SAVE_NEW_EXPENSE:
    return { ...state,
      isFetching: false,
      expenses: updateExpenses(action.payload, state) };
  case SAVE_EDITED_EXPENSE:
    return { ...state,
      isEditMode: false,
      expenses: updateExpenses(action.payload, state),
      idToEdit: '' };
  case DELETE_EXPENSE:
    return { ...state, expenses: updateExpenses(action.payload, state) };
  default:
    return state;
  }
};

export default wallet;
