import {
  CREATE_USER, DELETE_USER, EDIT_USER, GET_USER_CURRENCIES,
  USERS_REQUEST_FAILED, USERS_REQUEST_STARTED,
} from '../actions/actionTypes';
import { handleUsers } from '../helpers';

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
    return {
      ...state,
      userList: handleUsers(action.payload.userData, state.userList),
    };
  case EDIT_USER:
    return {
      ...state,
      userList: handleUsers(action.payload.userData),
    };
  case DELETE_USER:
    return {
      ...state,
      userList: handleUsers(action.payload.userId),
    };
  default:
    return state;
  }
};

export default users;
