import {
  MODIFY_SCHEDULING_SERVICE,
  MODIFY_SCHEDULING_DATE,
} from './types';

export const changeService = serviceId => ({ type: MODIFY_SCHEDULING_SERVICE, payload: serviceId });
export const changeDate = date => ({ type: MODIFY_SCHEDULING_DATE, payload: date });
