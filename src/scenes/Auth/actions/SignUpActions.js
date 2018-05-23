import { Alert } from 'react-native';
import firebase from 'firebase';
import base64 from 'base-64';

import {
  CHANGE_SIGNUP_NAME,
  CHANGE_SIGNUP_SEX,
  CHANGE_SIGNUP_BIRTHDATE,
  CHANGE_SIGNUP_DDD,
  CHANGE_SIGNUP_PHONE,
  CHANGE_SIGNUP_ADDRESS,
  CHANGE_SIGNUP_NEIGHBORHOOD,
  CHANGE_SIGNUP_ZIPCODE,
  CHANGE_SIGNUP_CITY,
  CHANGE_SIGNUP_EMAIL,
  CHANGE_SIGNUP_USERNAME,
  CHANGE_SIGNUP_PASSWORD,
  CHANGE_SIGNUP_REPASSWORD,
  REGISTERING,
} from './types';

export const changeName = name => ({ type: CHANGE_SIGNUP_NAME, payload: name });

export const changeSex = sex => ({ type: CHANGE_SIGNUP_SEX, payload: sex });

export const changeBirthDate = birthDate => ({ type: CHANGE_SIGNUP_BIRTHDATE, payload: birthDate });

export const changeDdd = ddd => ({ type: CHANGE_SIGNUP_DDD, payload: ddd });

export const changePhone = phone => ({ type: CHANGE_SIGNUP_PHONE, payload: phone });

export const changeAddress = address => ({ type: CHANGE_SIGNUP_ADDRESS, payload: address });

export const changeNeighborhood = neighborhood => ({ type: CHANGE_SIGNUP_NEIGHBORHOOD, payload: neighborhood });

export const changeZipCode = zipCode => ({ type: CHANGE_SIGNUP_ZIPCODE, payload: zipCode });

export const changeCity = city => ({ type: CHANGE_SIGNUP_CITY, payload: city });

export const changeEmail = email => ({ type: CHANGE_SIGNUP_EMAIL, payload: email });

export const changeUsername = username => ({ type: CHANGE_SIGNUP_USERNAME, payload: username });

export const changePassword = password => ({ type: CHANGE_SIGNUP_PASSWORD, payload: password });

export const changeRepassword = repassword => ({ type: CHANGE_SIGNUP_REPASSWORD, payload: repassword });

export const register = () => (dispatch, getState) => {
  const {
    signUpName,
    signUpUsername,
    signUpEmail,
    signUpPassword,
    signUpRepassword,
    signUpSex,
  } = getState().SignUp;

  if (signUpName === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de nome vazio.');
  } else if (signUpName.length < 3) {
    Alert.alert('Beleza Agendada informa:', 'Campo de nome deve conter no mínimo 3(três) caracteres.');
  } else if (signUpUsername === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de sobrenome vazio.');
  } else if (signUpUsername.length < 3) {
    Alert.alert('Beleza Agendada informa:', 'Campo de sobrenome deve conter no mínimo 3(três) caracteres.');
  } else if (signUpSex === '') {
    Alert.alert('Beleza Agendada informa:', 'Selecione o sexo');
  } else if (signUpEmail === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de email vazio. Preencha o email corretamente.');
  } else if (signUpPassword.length < 6) {
    Alert.alert('Beleza Agendada informa:', 'A senha deve conter no mínimo 6(seis) caracteres.');
  } else if (signUpPassword !== signUpRepassword || signUpPassword === '') {
    Alert.alert('Beleza Agendada informa:', 'As senhas não conferem, por favor digite-as corretamente.');
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
          username: signUpUsername,
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
