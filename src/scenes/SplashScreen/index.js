import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import { colors, styleActivityIndicator } from '../../style';
import { modifyUserData } from '../../actions/VariablesActions';

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  modifyUserData: PropTypes.func.isRequired,
};

class SplashScreen extends Component {
  componentWillMount() {
    if (!firebase.apps.length) {
      // Initialize Firebase
      firebase.initializeApp({
        apiKey: 'AIzaSyDnNgJka_lhAk41lVj0PuOAZUPp3lgz9NA',
        authDomain: 'beleza-agendada.firebaseapp.com',
        databaseURL: 'https://beleza-agendada.firebaseio.com',
        projectId: 'beleza-agendada',
        storageBucket: 'beleza-agendada.appspot.com',
        messagingSenderId: '943431556979',
      });
    }

    firebase.auth().languageCode = 'pt-br';
    // Fica aguardando o usuário autenticar em algum momento
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.modifyUserData(() => {
          this.props.navigation.navigate('App');
        });
      } else {
        this.props.navigation.navigate('Auth');
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backgroundAuth }}>
        <ActivityIndicator {...styleActivityIndicator.larger.default} />
      </View>
    );
  }
}

SplashScreen.propTypes = propTypes;

const mapDispatchToProps = dispatch => bindActionCreators({ modifyUserData }, dispatch);

export default connect(null, mapDispatchToProps)(SplashScreen);
