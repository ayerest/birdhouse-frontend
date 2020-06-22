import React from 'react';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import MainViewScreen from "../screens/MainViewScreen";
import { useDispatch, useSelector } from "react-redux";

import { MenuNavigator, AuthNavigator } from './MainTabNavigator';
import StartupScreen from '../screens/StartupScreen';

// const BirdHouseStack = createStackNavigator();

const AppNavigator = (props) => {
  const isAuth = useSelector(state => !!state.user.token);
  const didTryAutoLogin = useSelector(state => !!state.user.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <MenuNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

// export default createAppContainer(
//   createSwitchNavigator({
//     // You could add another route here for authentication.
//     // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//     Main: MainTabNavigator,
//   })
// );

export default AppNavigator;
