import React, { Component } from 'react';
import { Button, View, Text, TextInput } from 'react-native';

import colors from '../../style/colors';

export default class AuthLogin extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backgroundAuth }}>
        <Text style={{ fontSize: 40, marginVertical: 30 }}>Tela de Login</Text>
        <TextInput
          style={{ width: 300 }}
          placeholder="Insira o e-mail"
          keyboardType="email-address"
          onChangeText={() => false}
        />
        <TextInput
          style={{ width: 300 }}
          placeholder="Insira a senha"
          secureTextEntry
          onChangeText={() => false}
        />
        <View style={{ flexDirection: 'row', marginVertical: 30 }}>
          <View style={{ marginHorizontal: 20, width: 120 }}>
            <Button
              title='Login'
              color={colors.button}
              onPress={() => this.props.navigation.navigate('App')}
            />
          </View>
          <View style={{ marginHorizontal: 20, width: 120 }}>
            <Button
              title='Cadastre-se'
              color={colors.button}
              onPress={() => this.props.navigation.navigate('AuthSignUp') }
            />
          </View>
        </View>
        <View style={{ marginVertical: 30, width: 150 }}>
          <Button
            style={{ flex: 1 }}
            title='Esqueci senha'
            color={colors.button}
            onPress={() => this.props.navigation.navigate('ResetPassword')}
          />
        </View>
      </View>
    );
  }
};
