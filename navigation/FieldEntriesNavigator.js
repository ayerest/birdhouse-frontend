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
                name="AddSighting"
                component={AddFieldEntryForm}
            />
        </FieldEntriesStackNavigator.Navigator>
    );
};
