import { combineReducers } from 'redux';

import Variables from './reducers/VariablesReducer';
import SignUp from './scenes/Auth/reducers/SignUpReducer';
import Scheduling from './scenes/Scheduling/reducers/schedulingReducer';

export default combineReducers({
  Variables,
  SignUp,
  Scheduling,
});
