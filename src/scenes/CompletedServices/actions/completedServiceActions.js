import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';

import { SCHEDULING_LIST_COMPLETED } from './types';

export const listScheduleingCompleted = () => (dispatch) => {
  const { currentUser } = firebase.auth();
  const emailB64 = base64.encode(currentUser.email.trim());

  if (currentUser.email) {
    firebase.database().ref(`/TB_ATENDIMENTO/${emailB64}`)
      .on('value', (snapshot) => {
        let arrayScheduling = []
        _.mapValues(snapshot.val(), (value, key) => {
          if (value.status === 'r') arrayScheduling.push({ ...value, key });
        });
        dispatch({ type: SCHEDULING_LIST_COMPLETED, payload: arrayScheduling });
      });
  }
};

export default () => false;
