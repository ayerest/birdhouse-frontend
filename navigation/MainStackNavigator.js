import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { screenOptions } from "./ScreenOptions";
import { BirdHouseBottomTabs } from './BottomTabNavigator'
import defaultNavOptions from './DefaultNavOptions';

const MainStackNavigator = createStackNavigator();

export const MainNavigator = () => {
    return (
      <MainStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <MainStackNavigator.Screen
          name="BirdHouse"
          component={BirdHouseBottomTabs}
          options={screenOptions}
        />
      </MainStackNavigator.Navigator>
    );
};