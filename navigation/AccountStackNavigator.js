import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import MyAccountScreen, { screenOptions as myAccountScreenOptions } from '../screens/MyAccountScreen';
import FieldEntriesScreen, { screenOptions as fieldEntriesScreenOptions } from '../screens/FieldEntriesScreen';
import BirdODexScreen, { screenOptions as birdODexScreenOptions } from '../screens/BirdODexScreen';
import defaultNavOptions from './DefaultNavOptions';


const AccountStackNavigator = createStackNavigator();

export const AccountNavigator = () => {
    return (
        <AccountStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AccountStackNavigator.Screen
                name="My Account"
                component={MyAccountScreen}
                options={myAccountScreenOptions}
            />
            <AccountStackNavigator.Screen
                name="My Sightings"
                component={FieldEntriesScreen}
            />
            <AccountStackNavigator.Screen
                name="BirdieDex"
                component={BirdODexScreen}
            />
        </AccountStackNavigator.Navigator>
    );
}

// Old set up: 

// const Account = createStackNavigator({
//   MyAccount: {
//     screen: MyAccountScreen,
//     navigationOptions: {
//       title: 'My Account',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 21,
//         fontWeight: '400'
//       }
//     }
//   },
//   BirdieSightings: FieldEntriesScreen,
//   BirdODex: BirdODexScreen,
// })