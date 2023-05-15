import { SAVE_EXPENSE, EDIT_EXPENSE,
  GET_TOTAL_OF_EXPENSES, DELETE_EXPENSES } from '../actions';
import {
  CUR_REQUEST_STARTED,
  CUR_REQUEST_SUCCESSFUL,
  CUR_REQUEST_FAILED,

  E_R_REQUEST_STARTED,
  E_R_REQUEST_SUCCESSFUL,
  E_R_REQUEST_FAILED,
} from '../actions/thunks';

import { reduceExpenses } from '../../helpers';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalOfExpenses: 0,
  editor: false,
  idToEdit: 0,
  isFetchingCur: false,
  isFetchingER: false,
  errorMessage: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CUR_REQUEST_STARTED:
    return { ...state, isFetchingCur: true };
  case CUR_REQUEST_SUCCESSFUL:
    return { ...state, isFetchingCur: false, currencies: action.payload };
  case CUR_REQUEST_FAILED:
    return { ...state, isFetchingCur: false, errorMessage: action.payload.message };

  case E_R_REQUEST_STARTED:
    return { ...state, isFetchingER: true };
  case E_R_REQUEST_SUCCESSFUL:
    return { ...state, isFetchingER: false };
  case E_R_REQUEST_FAILED:
    return { ...state, isFetchingER: false, errorMessage: action.payload.message };

  case SAVE_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: (state.expenses.length > 0) ? [...state.expenses, ...action.payload]
        : action.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: action.payload === '' ? [] : (
        state.expenses.filter(({ id }) => id !== action.payload)),
    };
  case GET_TOTAL_OF_EXPENSES:
    return {
      ...state,
      totalOfExpenses: reduceExpenses(state.expenses),
    };

  default:
    return state;
  }
};

export default wallet;
