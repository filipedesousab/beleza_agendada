import React from 'react';
import { Dimensions, Text, View } from 'react-native';

export default ListItem = props => {
  const { width } = Dimensions.get('window');

  return (
    <View style={{ height: 80, width: width-10, backgroundColor: '#fafafa', margin: 5 }}>
      <Text style={{ fontSize: 20 }}>Serviço: {props.item.serviceId}</Text>
      <Text style={{ fontSize: 20 }}>Data agendada: {props.item.schedulingDate}</Text>
    </View>
  )
};
