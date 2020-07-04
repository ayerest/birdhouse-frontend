import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import BadgesScreen, { screenOptions as badgesScreenOptions } from '../screens/BadgesScreen';
import BadgeCard from '../components/BadgeCard';
import BadgeDetailsScreen from '../screens/BadgeDetailsScreen';
import defaultNavOptions from './DefaultNavOptions';

const BadgesStackNavigator = createStackNavigator();

export const BadgesNavigator = () => {
    return (
        <BadgesStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <BadgesStackNavigator.Screen
                name="My Badges"
                component={BadgesScreen}
                options={badgesScreenOptions}
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


// old navigation set up:

// const Badges = createStackNavigator({
//   MyBadges: {
//     screen: BadgesScreen,
//     navigationOptions: {
//       title: 'My Badges',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 20,
//         fontWeight: '400'
//       }
//     }
//   },
//   Badge: {screen: BadgeCard,
//   navigationOptions: {
//     title: 'My Badge',
//     headerTitleStyle: {
//       fontFamily: 'Fred-Great',
//       fontSize: 19,
//       fontWeight: '400'
//     }
//   }},
//   BadgeDetails: BadgeDetailsScreen
// })