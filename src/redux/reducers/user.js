import { CREATE_USER, GET_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  users: JSON.parse(localStorage.getItem('users')) || [],
  currentUser: {},
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

  case GET_USER:
    console.log(action.payload);
    return {
      ...state,
      currentUser: state.users.find(({ id }) => id == action.payload),
    };

  default:
    return state;
  }
};

export default user;
