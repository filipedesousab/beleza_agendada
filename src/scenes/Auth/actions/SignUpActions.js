import { Alert } from 'react-native';
import firebase from 'firebase';
import base64 from 'base-64';

import {
  CHANGE_SIGNUP_NAME,
  CHANGE_SIGNUP_LASTNAME,
  CHANGE_SIGNUP_EMAIL,
  CHANGE_SIGNUP_PASSWORD,
  CHANGE_SIGNUP_REPASSWORD,
  CHANGE_SIGNUP_SEX,
  REGISTERING,
} from './types';

export const changeName = name => ({ type: CHANGE_SIGNUP_NAME, payload: name });

export const changeLastname = lastname => ({ type: CHANGE_SIGNUP_LASTNAME, payload: lastname });

export const changeEmail = email => ({ type: CHANGE_SIGNUP_EMAIL, payload: email });

export const changePassword = password => ({ type: CHANGE_SIGNUP_PASSWORD, payload: password });

export const changeRepassword = repassword => ({ type: CHANGE_SIGNUP_REPASSWORD, payload: repassword });

export const changeSex = sex => ({ type: CHANGE_SIGNUP_SEX, payload: sex });

export const register = () => (dispatch, getState) => {
  const {
    signUpName,
    signUpLastname,
    signUpEmail,
    signUpPassword,
    signUpRepassword,
    signUpSex,
  } = getState().SignUp;

  if (signUpName === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de nome vazio.');
  } else if (signUpName.length < 3) {
    Alert.alert('Beleza Agendada informa:', 'Campo de nome deve conter no mínimo 3(três) caracteres.');
  } else if (signUpLastname === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de sobrenome vazio.');
  } else if (signUpLastname.length < 3) {
    Alert.alert('Beleza Agendada informa:', 'Campo de sobrenome deve conter no mínimo 3(três) caracteres.');
  } else if (signUpEmail === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de email vazio. Preencha o email corretamente.');
  } else if (signUpPassword.length < 6) {
    Alert.alert('Beleza Agendada informa:', 'A senha deve conter no mínimo 6(seis) caracteres.');
  } else if (signUpPassword !== signUpRepassword || signUpPassword === '') {
    Alert.alert('Beleza Agendada informa:', 'As senhas não conferem, por favor digite-as corretamente.');
  } else if (signUpSex === '') {
    Alert.alert('Beleza Agendada informa:', 'Selecione o sexo');
  } else {
    dispatch({ type: REGISTERING, payload: true });

    const alertFail = () => {
      dispatch({ type: REGISTERING, payload: false });
      Alert.alert('Beleza Agendada informa:', 'Que pena, houve uma falha ao efetuar o cadastro.\nTente novamente mais tarde.');
    };

    const delUsr = () => {
      firebase.auth().currentUser.delete()
        .then(() => {
          firebase.auth().signOut();
          alertFail();
        })
        .catch(() => {
          firebase.auth().currentUser.delete()
            .then(() => {
              firebase.auth().signOut();
              alertFail();
            })
            .catch(() => {
              firebase.auth().signOut();
              alertFail();
            });
        });
    };

    firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword)
      .then(() => {
        const data = {
          name: signUpName,
          lastname: signUpLastname,
          email: signUpEmail,
          userType: 'parceiro',
          ep: 'b64',
        };

        const emailB64 = base64.encode(signUpEmail);

        firebase.database().ref(`TB_CLIENTE/${emailB64}`).set(data)
          .then(() => {
            dispatch({ type: REGISTERING, payload: false });
            Alert.alert('Beleza Agendada informa:', 'Cadastro realizado com sucesso!');
          })
          .catch(() => {
            delUsr();
          });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            dispatch({ type: REGISTERING, payload: false });
            Alert.alert('Beleza Agendada informa:', 'E-mail já cadastrado.');
            break;
          default:
            alertFail();
            break;
        }
      });
  }
};
