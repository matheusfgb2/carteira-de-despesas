import {
  SAVE_EXPENSES, EDIT_EXPENSE,
  GET_TOTAL_OF_EXPENSES, DELETE_EXPENSE,
} from '../actions';

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
    return { ...state, isFetchingCur: false, errorMessage: action.payload };

  case E_R_REQUEST_STARTED:
    return { ...state, isFetchingER: true };
  case E_R_REQUEST_SUCCESSFUL:
    return { ...state, isFetchingER: false };
  case E_R_REQUEST_FAILED:
    return { ...state, isFetchingER: false, errorMessage: action.payload };

  case SAVE_EXPENSES:
    return {
      ...state,
      editor: false,
      expenses: action.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
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
