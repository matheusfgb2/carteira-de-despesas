import { GET_EMAIL } from '../actions/user';

const INITIAL_STATE = { email: '' };

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
