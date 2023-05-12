import {
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
} from '../actions/wallet/thunkCurrencies';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
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
  default:
    return state;
  }
};

export default wallet;
