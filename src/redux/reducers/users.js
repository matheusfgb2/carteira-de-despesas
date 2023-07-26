import { CREATE_USER, DELETE_USER, EDIT_USER } from '../actions/actionTypes';

import { handleUsers } from '../helpers';

const INITIAL_STATE = {
  userList: JSON.parse(localStorage.getItem('user-list')) || [],
};

const users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
