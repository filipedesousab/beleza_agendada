import React, { Component } from 'react';
import { View, Text, Button, FlatList, TextInput, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { colors, textStyles } from '../../style';
import ListItem from './components/ListItem';
import { listScheduleing, removeScheduleing } from './actions/pedingServiceActions';

class PeddingServices extends Component {
  static navigationOptions = {
    title: 'Serviços Pendentes',
    headerTitleStyle: { ...textStyles.title },
    headerRight: (
      <TouchableHighlight
        onPress={() => firebase.auth().signOut()}
        underlayColor="#fff"
        style={{ marginRight: 10 }}
      >
        <FontAwesome name="sign-out" size={25} color={colors.dark} />
      </TouchableHighlight>
    ),
    tabBarIcon: ({ focused, tintColor }) => (
      focused
        ? <Icon name="list" size={30} color={colors.button} />
        : <Icon name="list" size={30} color={colors.dark} />
    ),
  };

  componentWillMount() {
    this.props.listScheduleing();
  }

  render() {
    const RenderListView = () => {
      if (this.props.schedules.length > 0) {
        return (
          <FlatList
            data={this.props.schedules}
            renderItem={({item}) => <ListItem item={item} remove={this.props.removeScheduleing} listScheduleing={this.props.listScheduleing}/>}
          />
        );
      }
      return <Text style={{ ...textStyles.default }}>Lista Vazia</Text>;
    };

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <RenderListView />
      </View>
    );
  }
};

const mapStateToProps = state =>  ({
  schedules: state.PendingServices.schedules,
});

const mapDispatchToProps = dispatch => bindActionCreators({ listScheduleing, removeScheduleing }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PeddingServices);
