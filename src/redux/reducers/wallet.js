import { reduceExpenses } from '../../helpers';

import {
  REQUEST_STARTED,
  EXCHANGE_RATES_REQUEST_SUCCESSFUL,
  CURRENCIES_REQUEST_SUCCESSFUL,
  REQUEST_FAILED,

  SAVE_EXPENSE,
  GET_TOTAL_OF_EXPENSES,
  DELETE_EXPENSE,
} from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalOfExpenses: 0,
  editor: false,
  idToEdit: 0,
  isFetching: false,
  errorMessage: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_STARTED:
    return { ...state, isFetching: true };
  case EXCHANGE_RATES_REQUEST_SUCCESSFUL:
    return { ...state, isFetching: false };
  case CURRENCIES_REQUEST_SUCCESSFUL:
    return {
      ...state,
      isFetching: false,
      currencies: action.payload,
    };
  case REQUEST_FAILED:
    return {
      ...state,
      isFetching: false,
      errorMessage: action.payload.message,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: (state.expenses.length > 0) ? [...state.expenses, action.payload]
        : [action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case GET_TOTAL_OF_EXPENSES:
    return { ...state, totalOfExpenses: reduceExpenses(state.expenses) };
  default:
    return state;
  }
};

export default wallet;
