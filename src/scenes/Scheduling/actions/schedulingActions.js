import { Alert } from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import base64 from 'base-64';
import _ from 'lodash';

import {
  SERVICE_LIST,
  MODIFY_REGISTERING,
  MODIFY_SCHEDULING_SERVICE,
  MODIFY_SCHEDULING_DATE,
  REGISTERING_SCHEDULING,
  MODIFY_SCHEDULING_PROFESSIONAL_LIST,
  MODIFY_SCHEDULING_PROFESSIONAL,
  MODIFY_SCHEDULING_ADDRESS,
  MODIFY_SCHEDULING_NEIGHBORHOOD,
  MODIFY_SCHEDULING_ZIPCODE,
  MODIFY_SCHEDULING_CITY,
  MODIFY_SCHEDULING_CITY_LIST,
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

export const changeProfessional = professional => ({ type: MODIFY_SCHEDULING_PROFESSIONAL, payload: professional });

export const changeAddress = address => ({ type: MODIFY_SCHEDULING_ADDRESS, payload: address });

export const changeNeighborhood = neighborhood => ({ type: MODIFY_SCHEDULING_NEIGHBORHOOD, payload: neighborhood });

export const changeZipCode = zipCode => ({ type: MODIFY_SCHEDULING_ZIPCODE, payload: zipCode });

export const changeCity = city => ({ type: MODIFY_SCHEDULING_CITY, payload: city });

export const getCities = () => (dispatch) => {
  axios.post('http://beleza-agendada-api.herokuapp.com/Municipio/listarPorEstado/', { "Uf": "PE" })
    .then((response) => {
      dispatch({ type: MODIFY_SCHEDULING_CITY_LIST, payload: response.data });
    })
    .catch((error) => {
      Alert.alert('Beleza Agendada informa:', 'Não foi possível carrgar as cidades.');
    });
}

export const getProfessionals = () => (dispatch) => {
  axios.post('http://beleza-agendada-api.herokuapp.com/Municipio/listarPorEstado/', { "Uf": "PE" })
    .then((response) => {
      dispatch({ type: MODIFY_SCHEDULING_PROFESSIONAL_LIST, payload: [{ Id: 1, Nome: 'Josefa Maria' }] });
    })
    .catch((error) => {
      Alert.alert('Beleza Agendada informa:', 'Não foi possível carrgar as cidades.');
    });
}


export const registerScheduling = () => (dispatch, getState) => {
  const { listServices, serviceIndex, schedulingDate } = getState().Scheduling;

  if (serviceIndex === null) {
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

export const registerScheduling2 = () => (dispatch, getState) => {
  dispatch({ type: REGISTERING_SCHEDULING, payload: true });

  const {
    serviceIndex,
    professional,
    schedulingDate,
    address,
    neighborhood,
    zipCode,
    city,
  } = getState().Scheduling;

  if (serviceIndex === null) {
    Alert.alert('Beleza Agendada informa:', 'Selecione um serviço.');
  } else if (professional === null) {
    Alert.alert('Beleza Agendada informa:', 'Selecione um profissional.');
  } else if (schedulingDate === '') {
    Alert.alert('Beleza Agendada informa:', 'Selecione uma data.');
  } else if (address === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de endereço vazio.');
  } else if (neighborhood === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de bairro vazio.');
  } else if (zipCode === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de Cep vazio.');
  } else if (city === null) {
    Alert.alert('Beleza Agendada informa:', 'Selecione a cidade');
  } else {
    const { user } = getState().Variables;
    const newDate = schedulingDate.split('/');
    const data = {
      Cliente: user.id,
      Profissional: professional,
      Servico: 1,
      DataAgendado: `${newDate[2]}-${newDate[1]}-${newDate[0]}`,
      Endereco: address,
      Bairro: neighborhood,
      Cep: zipCode,
      Municipio: city,
    };

    axios.post('http://beleza-agendada-api.herokuapp.com/Atendimento/inserir/', data)
      .then((response) => {
        console.log(response);
        dispatch({ type: REGISTERING_SCHEDULING, payload: false });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Beleza Agendada informa:', 'Não foi possível registrar o agendamento.');
      });
  }
};
