import React, { Component } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { colors } from '../../style';
import ListItem from './components/ListItem';
import { listServices } from './actions/pedingServiceActions';

class PeddingServices extends Component {
  static navigationOptions = {
    title: 'Serviços Pendentes',
    header: null,
    tabBarIcon: ({ focused, tintColor }) => (
      focused
        ? <Icon name="list" size={30} color={colors.button} />
        : <Icon name="list" size={30} color="#000" />
    ),
  };

  componentWillMount() {
    this.props.listServices();
  }

  render() {
    const RenderListView = () => {
      if (this.props.services.length > 0) {
        return (
          <FlatList
            data={this.props.services}
            renderItem={({item}) => <ListItem item={item} />}
          />
        );
      }
      return <Text>Lista Vazia</Text>;
    };

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ fontSize: 30 }}>Serviços Pendentes</Text>
        <RenderListView />
      </View>
    );
  }
};


const mapStateToProps = state =>  ({
  services: state.PendingServices.services,
});

const mapDispatchToProps = dispatch => bindActionCreators({ listServices }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PeddingServices);
