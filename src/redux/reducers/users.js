import { CREATE_USER, GET_USER } from '../actions';

const INITIAL_STATE = {
  userList: JSON.parse(localStorage.getItem('users')) || [],
  user: {},
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
      users: [...state.userList, { ...action.payload }],
    };

  case GET_USER:
    return {
      ...state,
      user: state.userList.find(({ id }) => id === action.payload),
    };

  default:
    return state;
  }
};

export default users;
