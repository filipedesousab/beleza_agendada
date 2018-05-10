import { combineReducers } from 'redux';

import Variables from './reducers/VariablesReducer';
import SignUp from './scenes/Auth/reducers/SignUpReducer';

export default combineReducers({
  Variables,
  SignUp,
});
