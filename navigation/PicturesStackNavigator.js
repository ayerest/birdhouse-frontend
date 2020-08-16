import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PicturesScreen from '../screens/PicturesScreen';
import FieldEntryDetailsScreen from '../screens/FieldEntryDetailsScreen';
import BirdDetailsScreen, { screenOptions as birdDetailsScreenOptions } from '../screens/BirdDetailsScreen';
import AddFieldEntryForm from '../components/AddFieldEntryForm';
import defaultNavOptions from './DefaultNavOptions';
import screenOptions from './ScreenOptions';

const PicturesStackNavigator = createStackNavigator();

const PicturesNavigator = () => (
  <PicturesStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <PicturesStackNavigator.Screen
      name="My Photos"
      component={PicturesScreen}
      options={screenOptions}
    />
    <PicturesStackNavigator.Screen
      name="Bird Sighting"
      component={FieldEntryDetailsScreen}
    />
    <PicturesStackNavigator.Screen
      name="Bird Details"
      component={BirdDetailsScreen}
      options={birdDetailsScreenOptions}
    />
    <PicturesStackNavigator.Screen
      name="Add Sighting"
      component={AddFieldEntryForm}
    />
  </PicturesStackNavigator.Navigator>
);

export default PicturesNavigator;
