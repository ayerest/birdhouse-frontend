import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from "../screens/AuthScreen";
import defaultNavOptions from './DefaultNavOptions';

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AuthStackNavigator.Screen name="BirdHouse" component={AuthScreen} />
        </AuthStackNavigator.Navigator>
    )
}