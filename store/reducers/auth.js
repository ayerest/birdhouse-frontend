import {
  LOGIN, LOGOUT, AUTHENTICATE, SIGNUP, SET_AUTOLOGIN,
} from '../actions/auth';

const initialState = {
  user: null,
  token: null,
  didTryAutoLogin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        didTryAutoLogin: true,
        user: action.payload.user,
        token: action.payload.jwt,
      };
    case LOGIN:
      return {
        user: action.payload.user,
        token: action.payload.jwt,
        didTryAutoLogin: true,
      };
    case AUTHENTICATE:
      return {
        user: action.payload.user,
        token: action.payload.token,
        didTryAutoLogin: true,
      };
    case SET_AUTOLOGIN:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};

export default authReducer;
