import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyAccountScreen from '../screens/MyAccountScreen';
import screenOptions from './ScreenOptions';
import defaultNavOptions from './DefaultNavOptions';
import FieldEntriesNavigator from './FieldEntriesNavigator';
import BirdsNavigator from './BirdsStackNavigator';

const AccountStackNavigator = createStackNavigator();

const AccountNavigator = () => (
  <AccountStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <AccountStackNavigator.Screen
      name="My Account"
      component={MyAccountScreen}
      options={screenOptions}
    />
    <AccountStackNavigator.Screen
      name="My Sightings"
      component={FieldEntriesNavigator}
    />
    <AccountStackNavigator.Screen
      name="BirdieDex"
      component={BirdsNavigator}
    />
  </AccountStackNavigator.Navigator>
);

export default AccountNavigator;
