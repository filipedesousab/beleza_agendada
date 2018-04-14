import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { AuthLogin, AuthSignUp, ResetPassword } from './scenes/Auth';
import Home from './scenes/Home';
import Scheduling from './scenes/Scheduling';
import PendingServices from './scenes/PendingServices';
import CompletedServices from './scenes/CompletedServices';
import Evaluation from './scenes/Evaluation';

const AuthStack = StackNavigator({
  AuthLogin: { screen: AuthLogin, tabBar: { visible: false } },
  AuthSignUp: { screen: AuthSignUp },
  ResetPassword: { screen: ResetPassword },
}, {
  initialRouteName: 'AuthLogin',
  headerMode: 'screen',
});

const AppTabs = TabNavigator({
  Home: { screen: Home },
  Scheduling: { screen: Scheduling },
  PendingServices: { screen: PendingServices },
  CompletedServices: { screen: CompletedServices },
}, {
  initialRouteName: 'Home',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#000',
    inactiveTintColor: '#777',
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: 'rgb(255, 219, 232)',
    },
  },
});

const AppStack = StackNavigator({
  AppTabs: { screen: AppTabs },
  Evaluation: { screen: Evaluation },
}, {
  initialRouteName: 'AppTabs',
  tabBarPosition: 'none',
});

export default SwitchNavigator({
  App: AppStack,
  Auth: AuthStack,
}, {
  initialRouteName: 'Auth',
});
