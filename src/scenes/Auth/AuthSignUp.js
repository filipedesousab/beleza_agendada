import React, { Component } from 'react';
import { ActivityIndicator, Button, Picker, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { colors, styleActivityIndicator } from '../../style';

import {
  changeName,
  changeLastname,
  changeEmail,
  changePassword,
  changeRepassword,
  changeSex,
  register,
} from './actions/SignUpActions';

class AuthSignUp extends Component {
  static navigationOptions = {
    title: 'Cadastre-se'
  };

  render() {
    const RenderButton = () => {
      if (this.props.registering) {
        return <ActivityIndicator {...styleActivityIndicator.larger.default} />;
      }
      return (
        <Button
          title='Cadastrar'
          color={colors.button}
          onPress={ this.props.register }
        />
      );
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backgroundAuth }}>
        <Text style={{ fontSize: 40, marginVertical: 30 }}>Tela de Cadastro</Text>
        <TextInput
          style={{ width: 300 }}
          placeholder="Insira o seu nome"
          value={this.props.name}
          onChangeText={this.props.changeName}
        />
        <TextInput
          style={{ width: 300 }}
          placeholder="Insira o seu sobrenome"
          value={this.props.lastname}
          onChangeText={this.props.changeLastname}
        />
        <View style={{ width: 300, flexDirection: 'row' }}>
          <Text style={{ marginVertical: 15, marginHorizontal: 10 }}>Sexo</Text>
          <Picker
            style={{ width: 250 }}
            selectedValue={this.props.sex}
            onValueChange={this.props.changeSex}
          >
            <Picker.Item
              label="Selecione..."
              value=""
            />
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
          value={this.props.email}
          onChangeText={this.props.changeEmail}
        />
        <TextInput
          style={{ width: 300 }}
          placeholder="Insira a senha"
          secureTextEntry
          value={this.props.password}
          onChangeText={this.props.changePassword}
        />
        <TextInput
          style={{ width: 300 }}
          placeholder="Repita a senha"
          secureTextEntry
          value={this.props.repassword}
          onChangeText={this.props.changeRepassword}
        />
        <View style={{ marginVertical: 30 }}>
          <View style={{ marginHorizontal: 20, width: 100 }}>
            <RenderButton />
          </View>
        </View>
      </View>
    );
  }
};

const mapStateToProps = state =>  ({
  sex: state.SignUp.signUpSex,
  email: state.SignUp.signUpEmail,
  lastname: state.SignUp.signUpLastname,
  name: state.SignUp.signUpName,
  password: state.SignUp.signUpPassword,
  repassword: state.SignUp.signUpRepassword,
  registering: state.SignUp.registering,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeName,
  changeLastname,
  changeEmail,
  changePassword,
  changeRepassword,
  changeSex,
  register,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthSignUp);
