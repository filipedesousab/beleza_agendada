import {
  MODIFY_REGISTERING,
  MODIFY_SCHEDULING_SERVICE,
  MODIFY_SCHEDULING_DATE,
} from '../actions/types';

const INITIAL_STATE = {
  serviceId: '',
  schedulingDate: '',
  registering: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFY_REGISTERING:
      return { ...state, registering: action.payload };
    case MODIFY_SCHEDULING_SERVICE:
      return { ...state, serviceId: action.payload };
    case MODIFY_SCHEDULING_DATE:
      return { ...state, schedulingDate: action.payload };
    default:
      return state;
  }
};
