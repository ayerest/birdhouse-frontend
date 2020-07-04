import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BirdsNavigator } from './BirdsStackNavigator';
import { HomeScreenNavigator } from "./HomeScreenNavigator";
import Colors from '../constants/Colors';
import { Feather, Ionicons } from '@expo/vector-icons';

const BirdHouseBottomTabsNavigator = createBottomTabNavigator();

export const BirdHouseBottomTabs = props => {
    return (
        <BirdHouseBottomTabsNavigator.Navigator>
            <BirdHouseBottomTabsNavigator.Screen name="Map" component={HomeScreenNavigator}/>
            <BirdHouseBottomTabsNavigator.Screen name="BirdieDex" component={BirdsNavigator} />
        </BirdHouseBottomTabsNavigator.Navigator>
    )
}

// const BirdsNavigator = createBottomTabNavigator({
//   Map: {
//     screen: MenuNavigator,
//     navigationOptions: {
//       tabBarIcon: tabInfo => {
//         return <Feather name="map-pin" size={25} color={Colors.linkColor} />
//       }
//     }
//   },
//   Birdiedex: {
//     screen: Birds,
//     navigationOptions: {
//       tabBarIcon: tabInfo => {
//         return <Feather name="search" size={25} color={Colors.linkColor}/>
//       }
//     }
//   },
// }, {
//   tabBarOptions: {
//     activeTintColor: Colors.linkColor,
//   }
// })
