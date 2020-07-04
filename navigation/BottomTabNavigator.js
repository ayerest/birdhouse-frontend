import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BirdsNavigator } from './BirdsStackNavigator';
import { HomeScreenNavigator } from "./HomeScreenNavigator";
import Colors from '../constants/Colors';
import { Feather } from '@expo/vector-icons';

const BirdHouseBottomTabsNavigator = createBottomTabNavigator();

export const BirdHouseBottomTabs = props => {
    return (
      <BirdHouseBottomTabsNavigator.Navigator
        tabBarOptions={{
          activeTintColor: Colors.linkColor,
          inactiveTintColor: "gray",
        }}
      >
        <BirdHouseBottomTabsNavigator.Screen
          name="Map"
          component={HomeScreenNavigator}
          options={{
            tabBarLabel: "Map",
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Feather name="map-pin" color={focused ? Colors.linkColor : "grey"} size={25} />
              )
            },
          }}
        />
        <BirdHouseBottomTabsNavigator.Screen
          name="BirdieDex"
          component={BirdsNavigator}
          options={{
            tabBarLabel: "BirdieDex",
            tabBarIcon: ({ focused, color, size }) => (
              <Feather name="search" color={focused ? Colors.linkColor : "grey"} size={25} />
            ),
          }}
        />
      </BirdHouseBottomTabsNavigator.Navigator>
    );
}
