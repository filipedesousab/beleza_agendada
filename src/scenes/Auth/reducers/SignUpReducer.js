import {
  CHANGE_SIGNUP_NAME,
  CHANGE_SIGNUP_LASTNAME,
  CHANGE_SIGNUP_EMAIL,
  CHANGE_SIGNUP_PASSWORD,
  CHANGE_SIGNUP_REPASSWORD,
  CHANGE_SIGNUP_SEX,
  REGISTERING,
} from '../actions/types';

const INITIAL_STATE = {
  signUpName: 'Filipe',
  signUpLastname: 'de Sousa',
  signUpEmail: 'filipegame07@gmail.com',
  signUpPassword: '123456',
  signUpRepassword: '123456',
  signUpSex: 'm',
  registering: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SIGNUP_NAME:
      return { ...state, signUpName: action.payload };
    case CHANGE_SIGNUP_LASTNAME:
      return { ...state, signUpLastname: action.payload };
    case CHANGE_SIGNUP_EMAIL:
      return { ...state, signUpEmail: action.payload };
    case CHANGE_SIGNUP_PASSWORD:
      return { ...state, signUpPassword: action.payload };
    case CHANGE_SIGNUP_REPASSWORD:
      return { ...state, signUpRepassword: action.payload };
    case CHANGE_SIGNUP_SEX:
      return { ...state, signUpSex: action.payload };
    case REGISTERING:
      return { ...state, registering: action.payload };
    default:
      return state;
  }
};
