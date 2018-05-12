import React from 'react';
import { Dimensions, Text, View } from 'react-native';

import { colors, textStyles } from '../../../style';

export default ListItem = props => {
  const { width } = Dimensions.get('window');

  return (
    <View style={{ height: 80, width: width-10, backgroundColor: '#fafafa', margin: 5 }}>
      <Text style={{ margin: 5, ...textStyles.default }}>Serviço: {props.item.description}</Text>
      <Text style={{ margin: 5, ...textStyles.default }}>Data agendada: {props.item.schedulingDate}</Text>
    </View>
  )
};
