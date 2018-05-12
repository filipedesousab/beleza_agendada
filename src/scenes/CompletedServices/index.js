import React, { Component } from 'react';
import { View, Text, Button, TextInput, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors, textStyles } from '../../style';

export default class AuthSignUp extends Component {
  static navigationOptions = {
    title: 'Serviços Finalizados',
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
        ? <Icon name="playlist-add-check" size={30} color={colors.button} />
        : <Icon name="playlist-add-check" size={30} color={colors.dark} />
    ),
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
