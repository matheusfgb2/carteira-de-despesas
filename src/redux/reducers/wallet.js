import {
  SAVE_EXPENSES, EDIT_EXPENSE, DELETE_EXPENSE, GET_TOTAL_OF_EXPENSES,
} from '../actions';

import {
  REQUEST_STARTED,
  CURRENCIES_SUCCESSFUL,
  REQUEST_FAILED,
  EXPENSE_SUCCESSFUL,
} from '../actions/thunks';

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
      expenses: [...state.expenses, action.payload],
    };
  case REQUEST_FAILED:
    return { ...state, isFetching: false, errorMessage: action.payload };

  case GET_TOTAL_OF_EXPENSES:
    return {
      ...state,
      totalOfExpenses: state.expenses.reduce((total, expense) => {
        const { currency } = expense;
        const rating = expense.exchangeRates[currency].ask;
        const finalValue = Number(rating) * Number(expense.value);
        return total + finalValue;
      }, 0),
    };
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

  default:
    return state;
  }
};

export default wallet;
