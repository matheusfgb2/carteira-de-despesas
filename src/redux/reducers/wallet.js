import {
  REQUEST_STARTED, CURRENCIES_SUCCESSFUL, EXPENSE_SUCCESSFUL, REQUEST_FAILED,
  SAVE_EDITED_EXPENSE, GET_ID_TO_EDIT, DELETE_EXPENSE,
} from '../actions';

import { updateExpenses } from '../helpers';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: '',
  isFetching: false,
  errorMessage: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_STARTED:
    return { ...state, isFetching: true };
  case CURRENCIES_SUCCESSFUL:
    return {
      ...state,
      isFetching: false,
      currencies: action.payload[1],
      expenses: JSON.parse(localStorage.getItem(action.payload[0])) || [],
    };
  case EXPENSE_SUCCESSFUL:
    return {
      ...state,
      isFetching: false,
      expenses: updateExpenses(action.payload, state.expenses),
    };
  case REQUEST_FAILED:
    return { ...state, isFetching: false, errorMessage: action.payload };
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
      expenses: updateExpenses(action.payload, state.expenses, state.idToEdit),
      idToEdit: '',
    };
  case DELETE_EXPENSE:
    console.log(state.idToEdit);
    return {
      ...state,
      expenses: updateExpenses(action.payload, state.expenses),
    };
  default:
    return state;
  }
};

export default wallet;
