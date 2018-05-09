import { MODIFY_USER_DATA } from '../actions/types';

const INITIAL_STATE = {
  user: {
    email: '',
    name: '',
    lastname: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFY_USER_DATA:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
