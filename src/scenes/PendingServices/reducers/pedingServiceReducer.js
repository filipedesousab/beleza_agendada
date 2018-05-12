import { SCHEDULING_LIST } from '../actions/types';

const INITIAL_STATE = { schedules: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCHEDULING_LIST:
      return { ...state, schedules: action.payload };
    default:
      return state;
  }
};
