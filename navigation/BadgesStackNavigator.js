import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import BadgesScreen from '../screens/BadgesScreen.jsx';
import BadgeCard from '../components/BadgeCard';
import BadgeDetailsScreen from '../screens/BadgeDetailsScreen.jsx';
import { screenOptions } from './ScreenOptions'; 
import defaultNavOptions from './DefaultNavOptions';

const BadgesStackNavigator = createStackNavigator();

export const BadgesNavigator = () => {
    return (
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
};
