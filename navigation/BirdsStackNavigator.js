import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import BirdODexScreen, { screenOptions as birdODexScreenOptions } from '../screens/BirdODexScreen';
import BirdsList from '../components/BirdsList';
import BirdDetailsScreen, { screenOptions as birdDetailsScreenOptions } from '../screens/BirdDetailsScreen';
import AddFieldEntryForm from '../components/AddFieldEntryForm';
import defaultNavOptions from './DefaultNavOptions';

const BirdsStackNavigator = createStackNavigator();

export const BirdsNavigator = () => {
    return (
        <BirdsStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <BirdsStackNavigator.Screen
                name="BirdieDex"
                component={BirdODexScreen}
                options={birdODexScreenOptions}
            />
            <BirdsStackNavigator.Screen name="View Birds" component={BirdsList} />
            <BirdsStackNavigator.Screen
                name="BirdDetails"
                component={BirdDetailsScreen}
                options={birdDetailsScreenOptions}
            />
            <BirdsStackNavigator.Screen
                name="AddSighting"
                component={AddFieldEntryForm}
            />
        </BirdsStackNavigator.Navigator>
    );
}

// Old set up: 

// const Birds = createStackNavigator({
//   BirdieDex: {
//     screen: BirdODexScreen,
//     navigationOptions: {
//       title: 'BirdieDex',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 21,
//         fontWeight: '400'
//       },
//     }
//   },
//   BirdsList: BirdsList,
//   BirdDetails: BirdDetailsScreen,
//   AddSighting: {
//     screen: AddFieldEntryForm,
//     navigationOptions: {
//     title: 'Add Bird Sighting',
//     headerTitleStyle: {
//       fontFamily: 'Fred-Great',
//       fontSize: 19,
//       fontWeight: '400'
//     }
//   },
//   BirdInfo: BirdDetailsScreen,
//   BirdStuff: BirdDetailsScreen,
// }})