import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import AppNavigator from './routes';

const Root = () => (
  <Provider store={createStore(reducers)}>
    <AppNavigator ref={(nav) => { this.navigator = nav; }} />
  </Provider>
);

export default Root;
