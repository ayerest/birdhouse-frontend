import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import PicturesScreen, { screenOptions as picturesScreenOptions } from '../screens/PicturesScreen';
import FieldEntryDetailsScreen, { screenOptions as fieldEntryDetailsScreenOptions } from "../screens/FieldEntryDetailsScreen";
import BirdDetailsScreen, { screenOptions as birdDetailsScreenOptions } from '../screens/BirdDetailsScreen';
import AddFieldEntryForm from '../components/AddFieldEntryForm';
import defaultNavOptions from './DefaultNavOptions';

const PicturesStackNavigator = createStackNavigator();

export const PicturesNavigator = () => {
    return (
        <PicturesStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <PicturesStackNavigator.Screen
                name="My Photos"
                component={PicturesScreen}
                options={picturesScreenOptions}
            />
            <PicturesStackNavigator.Screen
                name="Bird Sighting"
                component={FieldEntryDetailsScreen}
                options={fieldEntryDetailsScreenOptions}
            />
            <PicturesStackNavigator.Screen
                name="Bird Details"
                component={BirdDetailsScreen}
                options={birdDetailsScreenOptions}
            />
            <PicturesStackNavigator.Screen
                name="AddSighting"
                component={AddFieldEntryForm}
            />
        </PicturesStackNavigator.Navigator>
    );
};


// old set up:

// const Pictures = createStackNavigator({
//   MyPhotos: {
//     screen: PicturesScreen,
//     navigationOptions: {
//       title: 'My Photos',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 20,
//         fontWeight: '400'
//       }
//     }
//   },
//   FieldEntryInfo: FieldEntryDetailsScreen,
//   BirdieInfo: BirdDetailsScreen,
// })