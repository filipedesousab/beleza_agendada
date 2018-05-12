import React, { Component } from 'react';
import { ActivityIndicator, Button, Picker, View, Text, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { colors, styleActivityIndicator, textStyles } from '../../style';

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
    title: 'Cadastre-se',
    headerTitleStyle: { ...textStyles.title },
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
      <ScrollView style={{ flex: 1, padding: 30, paddingBottom: 0, backgroundColor: colors.backgroundAuth }}>
        <View style={{ flex: 1, marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backgroundAuth }}>
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            placeholder="Insira o seu nome"
            value={this.props.name}
            onChangeText={this.props.changeName}
          />
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            placeholder="Insira o seu sobrenome"
            value={this.props.lastname}
            onChangeText={this.props.changeLastname}
          />
          <View style={{ width: 300, flexDirection: 'row' }}>
            <Text style={{ marginVertical: 15, marginHorizontal: 10, ...textStyles.default }}>Sexo</Text>
            <Picker
              style={{ width: 250, ...textStyles.default }}
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
            style={{ width: 300, ...textStyles.default }}
            placeholder="Insira o e-mail"
            keyboardType="email-address"
            value={this.props.email}
            onChangeText={this.props.changeEmail}
          />
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            placeholder="Insira a senha"
            secureTextEntry
            value={this.props.password}
            onChangeText={this.props.changePassword}
          />
          <TextInput
            style={{ width: 300, ...textStyles.default }}
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
      </ScrollView>
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
