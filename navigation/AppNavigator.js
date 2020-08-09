import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import MenuNavigator from './MenuDrawerNavigator';
import AuthNavigator from './AuthStackNavigator';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.user.token);
  const didTryAutoLogin = useSelector((state) => !!state.user.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <MenuNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
