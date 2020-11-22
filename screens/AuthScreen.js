import React, { useState, useEffect } from 'react';
import {
  View, KeyboardAvoidingView, Keyboard,
  TouchableWithoutFeedback, SafeAreaView,
  StyleSheet, Alert, Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { createAccount, userLogin } from '../store/actions/auth';
import Colors from '../constants/Colors';
import SignupLoginPrompt from '../components/SignupLoginPrompt';
import SignupPrompt from '../components/SignupPrompt';
import LoginPrompt from '../components/LoginPrompt';
import BirdHouseLogo from '../assets/images/birdhouse_logo_drawn.png';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.myColor,
  },
  input: {
    width: '90%',
    backgroundColor: Colors.myColor,
    padding: 10,
    alignSelf: 'center',
  },
  authContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
  label: {
    paddingTop: 10,
    textAlign: 'center',
    fontFamily: 'Roboto-Condensed',
    fontSize: 18,
  },
  logo: {
    alignSelf: 'center',
    flex: 1,
    resizeMode: 'contain',
  },
  inner: {
    padding: 5,
    flex: 1,
    justifyContent: 'flex-end',
  },
});

const AuthScreen = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error);
    }
  }, [error]);

  const imageSelectedHandler = (image) => {
    setAvatar(image);
  };

  const signupHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(createAccount(username, password, avatar));
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const loginHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(userLogin(username, password));
    } catch (err) {
      setError(err.message);
      setAvatar(false);
      setIsLoading(false);
    }
  };

  const birdHouseLogo = () => (
    <Image style={styles.logo} source={BirdHouseLogo} />);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={15}
      style={styles.screen}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.authContainer}>
              {birdHouseLogo()}
              {
                (!login && !signup)
                && <SignupLoginPrompt setLogin={setLogin} setSignup={setSignup} />
              }
              {
                (!login && signup)
                && (
                <SignupPrompt
                  signupHandler={signupHandler}
                  isLoading={isLoading}
                  username={username}
                  setLogin={setLogin}
                  setSignup={setSignup}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  imageSelectedHandler={imageSelectedHandler}
                />
                )
              }
              {
                (!signup && login)
                && (
                <LoginPrompt
                  loginHandler={loginHandler}
                  isLoading={isLoading}
                  username={username}
                  setLogin={setLogin}
                  setSignup={setSignup}
                  setUsername={setUsername}
                  setPassword={setPassword}
                />
                )
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
