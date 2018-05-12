import {
  SERVICE_LIST,
  MODIFY_REGISTERING,
  MODIFY_SCHEDULING_SERVICE,
  MODIFY_SCHEDULING_DATE,
} from '../actions/types';

const INITIAL_STATE = {
  serviceIndex: '',
  schedulingDate: '',
  registering: false,
  listServices: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SERVICE_LIST:
      console.log(action);
      return { ...state, listServices: action.payload };
    case MODIFY_REGISTERING:
      return { ...state, registering: action.payload };
    case MODIFY_SCHEDULING_SERVICE:
      return { ...state, serviceIndex: action.payload };
    case MODIFY_SCHEDULING_DATE:
      return { ...state, schedulingDate: action.payload };
    default:
      return state;
  }
};
