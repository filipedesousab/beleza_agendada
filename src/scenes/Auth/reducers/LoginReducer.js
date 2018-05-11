import {
  CHANGE_LOGIN_EMAIL,
  CHANGE_LOGIN_PASSWORD,
  LOADING_LOGIN,
} from '../actions/types';

const INITIAL_STATE = {
  email: 'filipegame07@gmail.com',
  password: '123456',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOGIN_EMAIL:
      return { ...state, email: action.payload };
    case CHANGE_LOGIN_PASSWORD:
      return { ...state, password: action.payload };
    case LOADING_LOGIN:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
