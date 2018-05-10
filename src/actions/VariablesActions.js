import { Alert, Dimensions, PixelRatio } from 'react-native';
import base64 from 'base-64';
import firebase from 'firebase';

import { MODIFY_USER_DATA } from './types';

export const modifyUserData = callback => (dispatch) => {
  const email = firebase.auth().currentUser.email;
  const emailB64 = base64.encode(email);

  firebase.database().ref(`TB_CLIENTE/${emailB64}`).once('value')
    .then(snapshot => {
      dispatch({ type: MODIFY_USER_DATA, payload: { email, name: snapshot.val().name, lastname: snapshot.val().lastname } });
      callback();
    })
    .catch(() => {
      Alert.alert('', 'Falha ao obter dados do usuário. Tente novamente mais tarde.');
    });
}
