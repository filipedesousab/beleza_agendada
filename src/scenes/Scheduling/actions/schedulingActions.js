import { Alert } from 'react-native';
import firebase from 'firebase';
import base64 from 'base-64';

import {
  MODIFY_REGISTERING,
  MODIFY_SCHEDULING_SERVICE,
  MODIFY_SCHEDULING_DATE,
} from './types';

export const changeService = serviceId => ({ type: MODIFY_SCHEDULING_SERVICE, payload: serviceId });
export const changeDate = date => ({ type: MODIFY_SCHEDULING_DATE, payload: date });

export const registerScheduling = () => (dispatch, getState) => {
  const { serviceId, schedulingDate } = getState().Scheduling;

  if (serviceId === '') {
    Alert.alert('Beleza Agendada informa:', 'Selecione um serviço.');
  } else if (schedulingDate === '') {
    Alert.alert('Beleza Agendada informa:', 'Selecione uma data.');
  } else {
    const { email } = getState().Variables.user;
    const emailB64 = base64.encode(email);

    firebase.database().ref(`TB_ATENDIMENTO/${emailB64}`).push({ serviceId, schedulingDate })
      .then(() => {
        Alert.alert('Beleza Agendada informa:', 'Serviço agendado');
        dispatch({ type: MODIFY_REGISTERING, payload: false });
      })
      .catch(() => {
        Alert.alert('Beleza Agendada informa:', 'Falha ao registrar o serviço');
        dispatch({ type: MODIFY_REGISTERING, payload: false });
      });
  }
};
