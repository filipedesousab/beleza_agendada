import { SCHEDULING_LIST } from '../actions/types';

const INITIAL_STATE = { services: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCHEDULING_LIST:
      return { ...state, services: action.payload };
    default:
      return state;
  }
};
