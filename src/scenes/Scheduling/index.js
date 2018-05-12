import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { View, Text, Button, Picker, TextInput, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker'

import { colors, textStyles } from '../../style';

import { changeService, changeDate, registerScheduling } from './actions/schedulingActions';

class Scheduling extends Component {
  static navigationOptions = {
    title: 'Agendamento',
    headerTitleStyle: { ...textStyles.title },
    headerRight: (
      <TouchableHighlight
        onPress={() => firebase.auth().signOut()}
        underlayColor="#fff"
        style={{ marginRight: 10 }}
      >
        <FontAwesome name="sign-out" size={25} color={colors.dark}/>
      </TouchableHighlight>
    ),
    tabBarIcon: ({ focused, tintColor }) => (
      focused
        ? <Icon name="event" size={30} color={colors.button} />
        : <Icon name="event" size={30} color={colors.dark}/>
    ),
  };

  render() {
    return (
      <View style={{ margin: 20, flex: 1 }}>
        <Text style={{ ...textStyles.default }}>Selecione o servço</Text>
        <Picker
          selectedValue={this.props.serviceId}
          onValueChange={this.props.changeService}
          style={{ marginBottom: 20, ...textStyles.default }}
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
        <Text style={{ marginBottom: 10, ...textStyles.default }}>Data de agendamento</Text>
        <DatePicker
          style={{ width: 155 }}
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
        <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            style={{ flex: 1 }}
            title='Agendar'
            color={colors.button}
            onPress={this.props.registerScheduling}
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

const mapDispatchToProps = dispach => bindActionCreators({ changeService, changeDate, registerScheduling }, dispach);

export default connect(mapStateToProps, mapDispatchToProps)(Scheduling);
