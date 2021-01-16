import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import screenOptions from './ScreenOptions';
import BirdHouseBottomTabs from './BottomTabNavigator';
import defaultNavOptions from './DefaultNavOptions';

const MainStackNavigator = createStackNavigator();
// TODO: either refactor the bottom tab nav stack or remove it

const MainNavigator = () => (
  <MainStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <MainStackNavigator.Screen
      name="BirdHouse"
      component={BirdHouseBottomTabs}
      options={screenOptions}
    />
  </MainStackNavigator.Navigator>
);

export default MainNavigator;
