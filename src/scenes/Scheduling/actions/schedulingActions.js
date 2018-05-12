import { Alert } from 'react-native';
import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';

import {
  SERVICE_LIST,
  MODIFY_REGISTERING,
  MODIFY_SCHEDULING_SERVICE,
  MODIFY_SCHEDULING_DATE,
} from './types';

export const getServices = () => (dispatch) => {
  const database = firebase.database();
  database.ref(`/TB_SERVICO`).on('value', (snapshot) => {
    let arrayServices = []
    _.mapValues(snapshot.val(), (value, key) => {
      arrayServices.push({ ...value, key });
    });

    dispatch({ type: SERVICE_LIST, payload: arrayServices });
  });
};

export const changeService = serviceIndex => ({ type: MODIFY_SCHEDULING_SERVICE, payload: serviceIndex });

export const changeDate = date => ({ type: MODIFY_SCHEDULING_DATE, payload: date });

export const registerScheduling = () => (dispatch, getState) => {
  const { listServices, serviceIndex, schedulingDate } = getState().Scheduling;

  if (serviceIndex === '') {
    Alert.alert('Beleza Agendada informa:', 'Selecione um serviço.');
  } else if (schedulingDate === '') {
    Alert.alert('Beleza Agendada informa:', 'Selecione uma data.');
  } else {
    const { email } = getState().Variables.user;
    const emailB64 = base64.encode(email);
    const service = listServices[serviceIndex];

    firebase.database().ref(`TB_ATENDIMENTO/${emailB64}`).push({ description: service.description, serviceId: service.key, schedulingDate })
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
