import {
  REQUEST_STARTED, CURRENCIES_SUCCESSFUL, EXPENSE_SUCCESSFUL, REQUEST_FAILED,
  SAVE_EDITED_EXPENSE, GET_ID_TO_EDIT, DELETE_EXPENSE, GET_USER_ID,
} from '../actions';

import { updateExpenses } from '../helpers';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: '',
  isFetching: false,
  errorMessage: '',
  userId: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_STARTED:
    return {
      ...state, isFetching: true };
  case CURRENCIES_SUCCESSFUL:
    return {
      ...state,
      isFetching: false,
      currencies: action.payload,
    };
  case EXPENSE_SUCCESSFUL:
    return {
      ...state,
      isFetching: false,
      expenses: updateExpenses(state.userId, state.expenses, null, action.payload),
    };
  case REQUEST_FAILED:
    return { ...state, isFetching: false, errorMessage: action.payload };
  case GET_USER_ID:
    return {
      ...state,
      userId: action.payload,
      expenses: JSON.parse(localStorage.getItem(action.payload)) || [],
    };
  case GET_ID_TO_EDIT:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: (
        updateExpenses(state.userId, state.expenses, state.idToEdit, action.payload)
      ),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: updateExpenses(state.userId, state.expenses, action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
