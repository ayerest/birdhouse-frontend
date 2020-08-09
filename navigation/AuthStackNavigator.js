import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import defaultNavOptions from './DefaultNavOptions';

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => (
  <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <AuthStackNavigator.Screen name="BirdHouse" component={AuthScreen} />
  </AuthStackNavigator.Navigator>
);

export default AuthNavigator;
