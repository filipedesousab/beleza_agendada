import { combineReducers } from 'redux';

import Variables from './reducers/VariablesReducer';
import SignUp from './scenes/Auth/reducers/SignUpReducer';
import Login from './scenes/Auth/reducers/LoginReducer';
import Scheduling from './scenes/Scheduling/reducers/schedulingReducer';

export default combineReducers({
  Variables,
  SignUp,
  Login,
  Scheduling,
});
