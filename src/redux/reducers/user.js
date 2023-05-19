import { CREATE_USER, GET_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
  users: JSON.parse(localStorage.getItem('users')) || [],
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_USER:
    localStorage.setItem(
      'users',
      JSON.stringify([...state.users, { ...action.payload }]),
    );
    return {
      ...state,
      users: [...state.users, { ...action.payload }],
    };

  case GET_EMAIL:
    return {
      ...state,
      email: action.payload,
    };

  default:
    return state;
  }
};

export default user;
