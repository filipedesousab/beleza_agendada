import { Alert } from 'react-native';
import axios from 'axios';

import { SCHEDULING_LIST } from './types';

export const listScheduleing = () => (dispatch, getState) => {
  const { user } = getState().Variables;
  axios.post(
    'http://beleza-agendada-api.herokuapp.com/Atendimento/listarNaoConcluidos',
    { Id: user.Id },
  )
    .then((response) => {
      const schedulingList = response.data.map((scheduleing) => {
        let arrayDate = scheduleing.DataAgendado.split('-');
        arrayDate[2] = arrayDate[2].split(' ')[0];
        const newDate = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
        return {
          key: scheduleing.Id,
          description: scheduleing.Servico.Descricao,
          schedulingDate: newDate,
        };
      });
      dispatch({ type: SCHEDULING_LIST, payload: schedulingList });
    })
    .catch(error => Alert.alert('Beleza Agendada informa:', 'Falha ao obter a lista dos agendamentos pendentes.'));
};

export const removeScheduleing = key => (dispach) => {
  axios.post(
    'http://beleza-agendada-api.herokuapp.com/Atendimento/cancelar',
    { Id: key },
  )
    .then(() => Alert.alert('Beleza Agendada informa:', 'Agendamento cancelado com sucesso.'))
    .catch(() => Alert.alert('Beleza Agendada informa:', 'Falha ao tentar cancelar o agendamento.'));
};
