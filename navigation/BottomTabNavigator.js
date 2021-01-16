import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import BirdsNavigator from './BirdsStackNavigator';
import HomeScreenNavigator from './HomeScreenNavigator';
import Colors from '../constants/Colors';

// TODO: bottom tabs should always reset nav stack
// TODO: either refactor or remove

const BirdHouseBottomTabsNavigator = createBottomTabNavigator();

const BirdHouseBottomTabs = () => (
  <BirdHouseBottomTabsNavigator.Navigator
    tabBarOptions={{
      activeTintColor: Colors.linkColor,
      inactiveTintColor: 'gray',
    }}
  >
    <BirdHouseBottomTabsNavigator.Screen
      name="Map"
      component={HomeScreenNavigator}
      options={{
        tabBarLabel: 'Map',
        tabBarIcon: ({ focused }) => (
          <Feather name="map-pin" color={focused ? Colors.linkColor : 'grey'} size={25} />
        ),
      }}
    />
    <BirdHouseBottomTabsNavigator.Screen
      name="BirdieDex"
      component={BirdsNavigator}
      options={{
        tabBarLabel: 'BirdieDex',
        tabBarIcon: ({ focused }) => (
          <Feather name="search" color={focused ? Colors.linkColor : 'grey'} size={25} />
        ),
      }}
    />
  </BirdHouseBottomTabsNavigator.Navigator>
);

export default BirdHouseBottomTabs;
