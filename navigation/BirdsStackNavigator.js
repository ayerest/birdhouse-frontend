import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import BirdODexScreen from '../screens/BirdODexScreen';
import BirdsList from '../components/BirdsList';
import BirdDetailsScreen, { screenOptions as birdDetailsScreenOptions } from '../screens/BirdDetailsScreen';
import AddFieldEntryForm from '../components/AddFieldEntryForm';
import { screenOptions } from './ScreenOptions';
import defaultNavOptions from './DefaultNavOptions';

const BirdsStackNavigator = createStackNavigator();

export const BirdsNavigator = () => {
    return (
        <BirdsStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <BirdsStackNavigator.Screen
                name="BirdieDex"
                component={BirdODexScreen}
                options={screenOptions}
            />
            <BirdsStackNavigator.Screen name="View Birds" component={BirdsList} />
            <BirdsStackNavigator.Screen
                name="Bird Details"
                component={BirdDetailsScreen}
                options={birdDetailsScreenOptions}
            />
            <BirdsStackNavigator.Screen
                name="Add Sighting"
                component={AddFieldEntryForm}
            />
        </BirdsStackNavigator.Navigator>
    );
}
