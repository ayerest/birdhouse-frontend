import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BadgesScreen from '../screens/BadgesScreen';
import BadgeCard from '../components/BadgeCard';
import BadgeDetailsScreen from '../screens/BadgeDetailsScreen';
import screenOptions from './ScreenOptions';
import defaultNavOptions from './DefaultNavOptions';

const BadgesStackNavigator = createStackNavigator();

const BadgesNavigator = () => (
  <BadgesStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <BadgesStackNavigator.Screen
      name="My Badges"
      component={BadgesScreen}
      options={screenOptions}
    />
    <BadgesStackNavigator.Screen
      name="My Badge"
      component={BadgeCard}
    />
    <BadgesStackNavigator.Screen
      name="Badge Details"
      component={BadgeDetailsScreen}
    />
  </BadgesStackNavigator.Navigator>
);

export default BadgesNavigator;
