import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { screenOptions as mainViewScreenOptions } from "../screens/MainViewScreen";
import { BirdHouseBottomTabs } from './BottomTabNavigator'
import defaultNavOptions from './DefaultNavOptions';

const MainStackNavigator = createStackNavigator();

export const MainNavigator = () => {
    return (
      <MainStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <MainStackNavigator.Screen
          name="BirdHouse"
          component={BirdHouseBottomTabs}
          options={mainViewScreenOptions}
        />
      </MainStackNavigator.Navigator>
    );
};

// Old set up: 

// const Main = createStackNavigator({
//   Main: {
//     screen: MainViewScreen,
//     navigationOptions: {
//       title: 'BirdHouse',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 21,
//         fontWeight: '400'
//       }
//     }},
//   GeoMap: GeoMap,
//   StaticMap: StaticMap,
//   FieldDetails: FieldEntryDetailsScreen,
//   AddEntry: {
//     screen: AddFieldEntryForm,
//     navigationOptions: {
//       title: 'Add Bird Sighting',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 19,
//         fontWeight: '400'
//       }
//     }
//   },
//   BirdInfo: BirdDetailsScreen,
//   BirdStuff: BirdDetailsScreen,
// })