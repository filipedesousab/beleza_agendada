import { Alert } from 'react-native';
import firebase from 'firebase';
import base64 from 'base-64';

import {
  CHANGE_LOGIN_EMAIL,
  CHANGE_LOGIN_PASSWORD,
  LOADING_LOGIN,
} from './types';

export const changeEmail = email => ({ type: CHANGE_LOGIN_EMAIL, payload: email });

export const changePassword = password => ({ type: CHANGE_LOGIN_PASSWORD, payload: password });

export const login = (callbackSuccess) => (dispatch, getState) => {
  const { email, password } = getState().Login;

  if (email === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de email vazio.');
  } else if (password === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de senha vazio.');
  } else {
    dispatch({ type: LOADING_LOGIN, payload: true });

    firebase.auth().signInWithEmailAndPassword(email.trim(), password)
      .then(() => {
        callbackSuccess();
        dispatch({ type: LOADING_LOGIN, payload: false });
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
          Alert.alert('Beleza Agendada informa:', 'Email ou senha inválido!');
          // dispatch({ type: 'ERROR_LOGIN', payload: 'Email ou senha inválido!' });
        } else if (error.code === 'auth/network-request-failed') {
          Alert.alert('Falha inesperada', 'Ocorreu alguma falha na conexão com o servidor. Verifique sua conexão com a internet.');
          // dispatch({ type: 'ERROR_LOGIN', payload: 'Ocorreu alguma falha na conexão com o servidor. Verifique sua conexão com a internet.' });
        } else {
          // Alert.alert(error.code, error.message);
          Alert.alert('Falha inesperada', 'Ocorreu alguma falha ao tentar autenticar. Por favor, tente novamente mais tarde.');
        }
        dispatch({ type: LOADING_LOGIN, payload: false });
      });
  }
};
