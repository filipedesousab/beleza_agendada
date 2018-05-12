import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';

import { SERVICE_LIST } from './types';

export const listServices = () => (dispatch, getState) => {
  const { currentUser } = firebase.auth();
  const emailB64 = base64.encode(currentUser.email.trim());

  if (currentUser.email) {
    firebase.database().ref(`/TB_ATENDIMENTO/${emailB64}`)
    .on('value', snapshot => {
      let arrayServices = []
      _.mapValues(snapshot.val(), (value, key) => {
        arrayServices.push({ ...value, key });
      });

      dispatch({ type: SERVICE_LIST, payload: arrayServices });
    });
  }
};
