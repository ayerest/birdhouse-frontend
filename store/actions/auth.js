import { AsyncStorage } from 'react-native';
import { base1 } from '../../env';

const SIGNUP = 'SIGNUP';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const AUTHENTICATE = 'AUTHENTICATE';
const SET_AUTOLOGIN = 'SET_AUTOLOGIN';

const setAutologin = () => ({ type: SET_AUTOLOGIN });

const createAccount = (username, password, avatar) => async (dispatch) => {
  const response = await fetch(`${base1}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        password,
        avatar,
      },
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const errorType = errorData.error;
    throw new Error(errorType);
  }

  const signupData = await response.json();
  dispatch({ type: SIGNUP, payload: signupData });
  const expirationDate = new Date(new Date().getTime() + 1200000);
  persistDataToStorage(signupData.jwt, signupData.user, expirationDate);
};

const userLogin = (username, password) => async (dispatch) => {
  const response = await fetch(`${base1}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        password,
      },
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const errorType = errorData.message;
    throw new Error(errorType);
  }

  const loginData = await response.json();
  dispatch({ type: LOGIN, payload: loginData });
  const expirationDate = new Date(new Date().getTime() + 12000000);
  persistDataToStorage(loginData.jwt, loginData.user, expirationDate);
};

const logout = () => {
  // should I add logic to update steps at this point??
  removeDataFromStorage();
  return { type: LOGOUT };
};

const authenticate = (userId, token) => ({ type: AUTHENTICATE, payload: { user: userId, token } });

const persistDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
    userId,
    expiryDate: expirationDate.toISOString(),
  }));
};

const removeDataFromStorage = () => {
  AsyncStorage.clear();
};

export {
  LOGIN,
  LOGOUT,
  AUTHENTICATE,
  SIGNUP,
  SET_AUTOLOGIN,
  createAccount,
  userLogin,
  logout,
  authenticate,
  setAutologin,
};
