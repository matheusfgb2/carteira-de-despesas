import { CREATE_USER, GET_USER_ID } from '../actions';

const INITIAL_STATE = {
  userList: JSON.parse(localStorage.getItem('users')) || [],
  userId: '',
};

const users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_USER:
    localStorage.setItem(
      'users',
      JSON.stringify([...state.userList, { ...action.payload }]),
    );
    return {
      ...state,
      userList: [...state.userList, { ...action.payload }],
    };
  case GET_USER_ID:
    return {
      ...state,
      userId: action.payload,
    };
  default:
    return state;
  }
};

export default users;
