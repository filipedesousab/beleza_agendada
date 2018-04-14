import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

export default class AuthSignUp extends Component {
  static navigationOptions = {
    title: 'Avaliação',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ fontSize: 40, marginVertical: 30 }}>Tela de Avaliação</Text>
        <View style={{  marginVertical: 30 }}>

        </View>
        <View style={{ marginVertical: 30, width: 100 }}>

        </View>
      </View>
    );
  }
};
