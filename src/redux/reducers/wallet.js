import {
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
  SAVE_EXPENSE,
  GET_TOTAL_OF_EXPENSES,
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
    return {
      ...state,
      isFetching: true,
    };

  case REQUEST_SUCCESSFUL:
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
      expenses: (
        state.expenses.length > 0 ? (
          [...state.expenses, action.payload]
        ) : [action.payload]
      ),
    };
  case GET_TOTAL_OF_EXPENSES:
    return {
      ...state,
      totalOfExpenses: (
        state.expenses.reduce((total, expense) => {
          const { currency } = expense;
          console.log(typeof currency);
          const rating = expense.exchangeRates[currency].ask;
          const finalValue = (Number(rating) * Number(expense.value)).toFixed(2);
          return total + Number(finalValue);
        }, 0)
      ),
    };
  default:
    return state;
  }
};

export default wallet;
