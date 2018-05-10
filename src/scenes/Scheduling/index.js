import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { View, Text, Button, Picker, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker'

import colors from '../../style/colors';

import { changeService, changeDate } from './actions/schedulingActions';

class Scheduling extends Component {
  static navigationOptions = {
    title: 'Agendamento',
    header: null,
    tabBarIcon: ({ focused, tintColor }) => (
      focused
        ? <Icon name="event" size={30} color={colors.button} />
        : <Icon name="event" size={30} color="#000" />
    ),
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 30, marginBottom: 30 }}>Agendamento</Text>
        <Text>Selecione o servço</Text>
        <Picker
          selectedValue={this.props.serviceId}
          onValueChange={this.props.changeService}
          style={{ marginBottom: 20 }}
        >
          <Picker.Item
            label="Selecione..."
            value=""
          />
          <Picker.Item
            label="Design de sobrancelhas"
            value="0"
          />
          <Picker.Item
            label="Manicure"
            value="1"
          />
        </Picker>
        <Text>Data de agendamento</Text>
        <DatePicker
          style={{ width: 130 }}
          mode="date"
          date={this.props.schedulingDate}
          placeholder="select date"
          format="DD/MM/YYYY"
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={this.props.changeDate}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            style={{ flex: 1 }}
            title='Agendar'
            color={colors.button}
            onPress={() => false}
          />
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  serviceId: state.Scheduling.serviceId,
  schedulingDate: state.Scheduling.schedulingDate,
});

const mapDispatchToProps = dispach => bindActionCreators({ changeService, changeDate }, dispach);

export default connect(mapStateToProps, mapDispatchToProps)(Scheduling);
