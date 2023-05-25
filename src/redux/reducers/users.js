import { GET_NEW_USER_CURRENCIES, CREATE_USER } from '../actions/actionTypes';

const INITIAL_STATE = {
  userList: JSON.parse(localStorage.getItem('user-list')) || [],
  currencies: [],
};

const users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_NEW_USER_CURRENCIES:
    return { ...state, currencies: action.payload };
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
