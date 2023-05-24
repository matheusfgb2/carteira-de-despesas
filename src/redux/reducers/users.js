import { CREATE_USER } from '../actions/actionTypes';

const INITIAL_STATE = {
  userList: JSON.parse(localStorage.getItem('user-list')) || [],
};

const users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
