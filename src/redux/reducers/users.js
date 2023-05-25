import {
  CREATE_USER, GET_USER_CURRENCIES, USERS_REQUEST_FAILED, USERS_REQUEST_STARTED,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  userList: JSON.parse(localStorage.getItem('user-list')) || [],
  currencies: [],
  isFetching: false,
  errorMessage: '',
};

const users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USERS_REQUEST_STARTED:
    return { ...state, isFetching: true };
  case USERS_REQUEST_FAILED:
    return { ...state, isFetching: false, errorMessage: action.payload };
  case GET_USER_CURRENCIES:
    return { ...state, isFetching: false, currencies: action.payload };
  case CREATE_USER:
    localStorage.setItem(
      'user-list',
      JSON.stringify([...state.userList, { ...action.payload }]),
    );
    return {
      ...state,
      userList: [...state.userList, { ...action.payload }],
    };
  default:
    return state;
  }
};

export default users;
