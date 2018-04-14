import React, { Component } from 'react';
import { Button, Picker, View, Text, TextInput } from 'react-native';

import colors from '../../style/colors';

export default class AuthSignUp extends Component {
  static navigationOptions = {
    title: 'Cadastre-se'
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backgroundAuth }}>
        <Text style={{ fontSize: 40, marginVertical: 30 }}>Tela de Cadastro</Text>
        <TextInput
          style={{ width: 300 }}
          placeholder="Insira o seu nome"
          onChangeText={() => false}
        />
        <TextInput
          style={{ width: 300 }}
          placeholder="Insira o seu sobrenome"
          onChangeText={() => false}
        />
        <View style={{ width: 300, flexDirection: 'row' }}>
          <Text style={{ marginVertical: 15, marginHorizontal: 10 }}>Sexo</Text>
          <Picker
            style={{ width: 250 }}
            selectedValue="f"
            onValueChange={() => false}
          >
            <Picker.Item
              label="Feminino"
              value="f"
            />
            <Picker.Item
              label="Masculino"
              value="m"
            />
          </Picker>
        </View>
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
        <TextInput
          style={{ width: 300 }}
          placeholder="Repita a senha"
          secureTextEntry
          onChangeText={() => false}
        />
        <View style={{ marginVertical: 30 }}>
          <View style={{ marginHorizontal: 20, width: 100 }}>
            <Button
              title='Cadastrar'
              color={colors.button}
              onPress={ () => this.props.navigation.goBack() }
            />
          </View>
        </View>
      </View>
    );
  }
};
