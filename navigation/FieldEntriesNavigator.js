import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import FieldEntriesScreen from '../screens/FieldEntriesScreen';
import FieldEntryDetailsScreen from "../screens/FieldEntryDetailsScreen";
import BirdDetailsScreen, { screenOptions as birdDetailsScreenOptions } from '../screens/BirdDetailsScreen';
import AddFieldEntryForm from '../components/AddFieldEntryForm';
import { screenOptions } from './ScreenOptions';
import defaultNavOptions from './DefaultNavOptions';

const FieldEntriesStackNavigator = createStackNavigator();

export const FieldEntriesNavigator = () => {
    return (
        <FieldEntriesStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <FieldEntriesStackNavigator.Screen
                name="My Bird Sightings"
                component={FieldEntriesScreen}
                options={screenOptions}
            />
            <FieldEntriesStackNavigator.Screen
                name="Bird Sighting"
                component={FieldEntryDetailsScreen}
            />
            <FieldEntriesStackNavigator.Screen
                name="Bird Details"
                component={BirdDetailsScreen}
                options={birdDetailsScreenOptions}
            />
            <FieldEntriesStackNavigator.Screen
                name="Add Sighting"
                component={AddFieldEntryForm}
            />
        </FieldEntriesStackNavigator.Navigator>
    );
};

