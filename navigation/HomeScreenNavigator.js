import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainViewScreen from '../screens/MainViewScreen';
import GeoMap from '../components/GeoMap';
import StaticMap from '../components/StaticMap';
import FieldEntryDetailsScreen from '../screens/FieldEntryDetailsScreen';
import BirdDetailsScreen, {
  screenOptions as birdDetailsScreenOptions,
} from '../screens/BirdDetailsScreen';
import AddFieldEntryForm from '../components/AddFieldEntryForm';
import screenOptions from './ScreenOptions';
import defaultNavOptions from './DefaultNavOptions';

const HomeScreenStackNavigator = createStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <HomeScreenStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <HomeScreenStackNavigator.Screen
        name="BirdHouse"
        component={MainViewScreen}
        options={screenOptions}
      />
      <HomeScreenStackNavigator.Screen name="Live Map" component={GeoMap} />
      <HomeScreenStackNavigator.Screen name="Map View" component={StaticMap} />
      <HomeScreenStackNavigator.Screen
        name="Field Sighting Details"
        component={FieldEntryDetailsScreen}
        options={screenOptions}
      />
      <HomeScreenStackNavigator.Screen
        name="Add Entry"
        component={AddFieldEntryForm}
      />
      <HomeScreenStackNavigator.Screen
        name="Bird Details"
        component={BirdDetailsScreen}
        options={birdDetailsScreenOptions}
      />
    </HomeScreenStackNavigator.Navigator>
  );
};

export default HomeScreenNavigator;
