import React, { Component } from 'react';
import { FlatList, View, Text, Button, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { colors, textStyles } from '../../style';
import ListItem from './components/ListItem';
import { listScheduleingCompleted } from './actions/completedServiceActions';

class CompletedServices extends Component {
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

  componentWillMount() {
    this.props.listScheduleingCompleted();
  }

  render() {
    const RenderListView = () => {
      if (this.props.schedulesCompleted.length > 0) {
        return (
          <FlatList
            data={this.props.schedulesCompleted}
            renderItem={({item}) => <ListItem item={item} navigation={this.props.navigation} />}
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
// this.props.navigation.navigate('Evaluation')

const mapStateToProps = state =>  ({
  schedulesCompleted: state.CompletedServices.schedulesCompleted,
});

const mapDispatchToProps = dispatch => bindActionCreators({ listScheduleingCompleted }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompletedServices);
