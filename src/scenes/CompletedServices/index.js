import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../style/colors';

export default class AuthSignUp extends Component {
  static navigationOptions = {
    title: 'Serviços Completos',
    header: null,
    tabBarIcon: ({ focused, tintColor }) => (
      focused
        ? <Icon name="playlist-add-check" size={30} color={colors.button} />
        : <Icon name="playlist-add-check" size={30} color="#000" />
    ),
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ fontSize: 40 }}>Tela de Serviços Completos</Text>
        <View style={{ marginVertical: 30, width: 200 }}>
          <Button
            title='Avaliar serviço'
            color={colors.button}
            onPress={() => this.props.navigation.navigate('Evaluation')}
          />
        </View>
      </View>
    );
  }
};
