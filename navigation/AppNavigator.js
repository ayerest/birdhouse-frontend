import React from 'react';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import MainViewScreen from "../screens/MainViewScreen";

import { BadgesNavigator } from './MainTabNavigator';

// const BirdHouseStack = createStackNavigator();

const AppNavigator = (props) => {
  return <NavigationContainer>
    <BadgesNavigator />
  </NavigationContainer>;
};

// export default createAppContainer(
//   createSwitchNavigator({
//     // You could add another route here for authentication.
//     // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//     Main: MainTabNavigator,
//   })
// );

export default AppNavigator;
