import firebase from 'firebase';
import base64 from 'base-64';

export const setEvaluation = ({ key, evaluation }, callbackSuccess) => (dispatch) => {
  const { currentUser } = firebase.auth();
  const emailB64 = base64.encode(currentUser.email.trim());

  if (currentUser.email) {
    firebase.database().ref(`/TB_ATENDIMENTO/${emailB64}`)
      .child(key)
      .child('evaluation')
      .set(evaluation)
      .then(() => {
        if (callbackSuccess) callbackSuccess();
      });
  }
};

export default () => false;
