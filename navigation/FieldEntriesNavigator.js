import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import FieldEntriesScreen, { screenOptions as fieldEntriesScreenOptions } from '../screens/FieldEntriesScreen';
import FieldEntryDetailsScreen, { screenOptions as fieldEntryDetailsScreenOptions } from "../screens/FieldEntryDetailsScreen";
import BirdDetailsScreen, { screenOptions as birdDetailsScreenOptions } from '../screens/BirdDetailsScreen';
import AddFieldEntryForm from '../components/AddFieldEntryForm';
import defaultNavOptions from './DefaultNavOptions';

const FieldEntriesStackNavigator = createStackNavigator();

export const FieldEntriesNavigator = () => {
    return (
        <FieldEntriesStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <FieldEntriesStackNavigator.Screen
                name="My Bird Sightings"
                component={FieldEntriesScreen}
                options={fieldEntriesScreenOptions}
            />
            <FieldEntriesStackNavigator.Screen
                name="Bird Sighting"
                component={FieldEntryDetailsScreen}
            />
            <FieldEntriesStackNavigator.Screen
                name="Bird Details"
                component={BirdDetailsScreen}
            />
            <FieldEntriesStackNavigator.Screen
                name="Add Sighting"
                component={AddFieldEntryForm}
            />
        </FieldEntriesStackNavigator.Navigator>
    );
};


// Old set up:

// const FieldEntries = createStackNavigator({
//   FieldEntries: {
//     screen: FieldEntriesScreen,
//     navigationOptions: {
//       title: 'My Bird Sightings',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 17,
//         fontWeight: '400'
//       }
//     }
//   },
//   EntryInfo: {screen: FieldEntryDetailsScreen,
//   navigationOptions: {
//     title: 'Bird Sighting',
//     headerTitleStyle: {
//       fontFamily: 'Fred-Great',
//       fontSize: 20,
//       fontWeight: '400'
//     }
//   }
// },
//   FieldEntry: {
//     screen: FieldEntryDetailsScreen,
//     navigationOptions: {
//       title: 'Bird Sighting',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 20,
//         fontWeight: '400'
//       }
//     }
//   },
//   BirdStuff: BirdDetailsScreen,
// })
