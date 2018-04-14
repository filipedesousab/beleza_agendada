import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../style/colors';

export default class AuthSignUp extends Component {
  static navigationOptions = {
    title: 'Serviços Pendentes',
    header: null,
    tabBarIcon: ({ focused, tintColor }) => (
      focused
        ? <Icon name="list" size={30} color={colors.button} />
        : <Icon name="list" size={30} color="#000" />
    ),
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ fontSize: 40 }}>Tela de Serviços Pendentes</Text>
      </View>
    );
  }
};
