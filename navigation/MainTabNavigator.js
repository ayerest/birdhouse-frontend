import React from 'react';
import { Dimensions, StyleSheet, Image } from 'react-native';
// import { createStackNavigator, createBottomTabNavigator, createAppContainer,
// createSwitchNavigator, createDrawerNavigator} from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AddFieldEntryForm from '../components/AddFieldEntryForm';
import FieldEntriesScreen, { screenOptions as fieldEntriesScreenOptions } from '../screens/FieldEntriesScreen';
import FieldEntryDetailsScreen, {
  screenOptions as fieldEntryDetailsScreenOptions } from "../screens/FieldEntryDetailsScreen";
import BirdODexScreen, { screenOptions as birdODexScreenOptions } from '../screens/BirdODexScreen';
import BirdsList from '../components/BirdsList';
import BirdDetailsScreen, { screenOptions as birdDetailsScreenOptions } from '../screens/BirdDetailsScreen';
import MainViewScreen from '../screens/MainViewScreen';
import BadgesScreen, { screenOptions as badgesScreenOptions } from '../screens/BadgesScreen';
import PicturesScreen, { screenOptions as picturesScreenOptions } from '../screens/PicturesScreen';
import GeoMap from '../components/GeoMap';
import StaticMap from '../components/StaticMap';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import BadgeCard from '../components/BadgeCard';
import BadgeDetailsScreen from '../screens/BadgeDetailsScreen';
import MyAccountScreen, { screenOptions as myAccountScreenOptions } from '../screens/MyAccountScreen';
import CustomDrawer from './CustomDrawer';
import Colors from '../constants/Colors';
import { Feather } from '@expo/vector-icons';

const BadgesStackNavigator = createStackNavigator();

export const BadgesNavigator = () => {
  return (
    <BadgesStackNavigator.Navigator>
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

const PicturesStackNavigator = createStackNavigator();

export const PicturesNavigator = () => {
  return (
    <PicturesStackNavigator.Navigator>
      <PicturesStackNavigator.Screen
        name="My Photos"
        screen={PicturesScreen}
        options={picturesScreenOptions}
      />
      <PicturesStackNavigator.Screen
        name="My Entry"
        screen={FieldEntryDetailsScreen}
        options={fieldEntryDetailsScreenOptions}
      />
      <PicturesStackNavigator.Screen
        name="Bird Details"
        screen={BirdDetailsScreen}
        options={birdDetailsScreenOptions}
      />
    </PicturesStackNavigator.Navigator>
  );
};

// const Pictures = createStackNavigator({
//   MyPhotos: {
//     screen: PicturesScreen,
//     navigationOptions: {
//       title: 'My Photos',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 20,
//         fontWeight: '400'
//       }
//     }
//   },
//   FieldEntryInfo: FieldEntryDetailsScreen,
//   BirdieInfo: BirdDetailsScreen,
// })

const FieldEntriesStackNavigator = createStackNavigator();

export const FieldEntriesNavigator = () => {
  return (
    <FieldEntriesStackNavigator.Navigator>
      <FieldEntriesStackNavigator.Screen
        name="My Bird Sightings"
        component={FieldEntriesScreen}
        options={fieldEntriesScreenOptions}
      />
      <FieldEntriesStackNavigator.Screen
        name="Bird Sighting"
        component={FieldEntryDetailsScreen}
        options={fieldEntryDetailsScreenOptions}
      />
      <FieldEntriesStackNavigator.Screen
        name="Bird Details"
        component={BirdDetailsScreen}
        options={birdDetailsScreenOptions}
      />
    </FieldEntriesStackNavigator.Navigator>
  );
};

// const FieldEntries = createStackNavigator({
//   FieldEntries: {
//     screen: FieldEntriesScreen,
//     navigationOptions: {
//       title: 'My Bird Sightings',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 17,
//         fontWeight: '400'
//       }
//     }
//   },
//   EntryInfo: {screen: FieldEntryDetailsScreen,
//   navigationOptions: {
//     title: 'Bird Sighting',
//     headerTitleStyle: {
//       fontFamily: 'Fred-Great',
//       fontSize: 20,
//       fontWeight: '400'
//     }
//   }
// },
//   FieldEntry: {
//     screen: FieldEntryDetailsScreen,
//     navigationOptions: {
//       title: 'Bird Sighting',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 20,
//         fontWeight: '400'
//       }
//     }
//   },
//   BirdStuff: BirdDetailsScreen,
// })

const BirdsStackNavigator = createStackNavigator();

export const BirdsNavigator = () => {
  return (
    <BirdsStackNavigator.Navigator>
      <BirdsStackNavigator.Screen
        name="BirdieDex"
        component={BirdODexScreen}
        options={birdODexScreenOptions}
      />
      <BirdsStackNavigator.Screen name="View Birds" component={BirdsList} />
      <BirdsStackNavigator.Screen
        name="Bird Details"
        component={BirdDetailsScreen}
        options={birdDetailsScreenOptions}
      />
      <BirdsStackNavigator.Screen
        name="Add Bird Sighting"
        component={AddFieldEntryForm}
      />
      <BirdsStackNavigator.Screen
        name="Bird Details"
        component={BirdDetailsScreen}
        options={birdDetailsScreenOptions}
      />
    </BirdsStackNavigator.Navigator>
  );
}

// const Birds = createStackNavigator({
//   BirdieDex: {
//     screen: BirdODexScreen,
//     navigationOptions: {
//       title: 'BirdieDex',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 21,
//         fontWeight: '400'
//       },
//     }
//   },
//   BirdsList: BirdsList,
//   BirdDetails: BirdDetailsScreen,
//   AddSighting: {
//     screen: AddFieldEntryForm,
//     navigationOptions: {
//     title: 'Add Bird Sighting',
//     headerTitleStyle: {
//       fontFamily: 'Fred-Great',
//       fontSize: 19,
//       fontWeight: '400'
//     }
//   },
//   BirdInfo: BirdDetailsScreen,
//   BirdStuff: BirdDetailsScreen,
// }})

// const Main = createStackNavigator({
//   Main: {
//     screen: MainViewScreen,
//     navigationOptions: {
//       title: 'BirdHouse',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 21,
//         fontWeight: '400'
//       }
//     }},
//   GeoMap: GeoMap,
//   StaticMap: StaticMap,
//   FieldDetails: FieldEntryDetailsScreen,
//   AddEntry: {
//     screen: AddFieldEntryForm,
//     navigationOptions: {
//       title: 'Add Bird Sighting',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 19,
//         fontWeight: '400'
//       }
//     }
//   },
//   BirdInfo: BirdDetailsScreen,
//   BirdStuff: BirdDetailsScreen,
// })

const AccountStackNavigator = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <AccountStackNavigator.Navigator>
      <AccountStackNavigator.Screen
        name="My Account"
        component={MyAccountScreen}
        options={myAccountScreenOptions}
      />
      <AccountStackNavigator.Screen
        name="Bird Sightings"
        component={FieldEntriesScreen}
        options={fieldEntriesScreenOptions}
      />
      <AccountStackNavigator.Screen
        name="BirdieDex"
        component={BirdODexScreen}
        options={birdODexScreenOptions}
      />
    </AccountStackNavigator.Navigator>
  );
}

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

// const MenuNavigator = createDrawerNavigator({
//   Home: Main, 
//   "Bird Sightings": FieldEntries,
//   BirdieDex: Birds,
//   "My Badges": Badges,
//   "My Photos": Pictures,
//   "My Account": Account,
// },
// {
//   contentComponent: CustomDrawer,
//   drawerWidth: Dimensions.get('window').width / 1.5,
//   contentOptions: {
//     activeBackgroundColor: 'thistle',
//     labelStyle: {
//       fontFamily: 'Roboto-Condensed',
//       fontSize: Dimensions.get('window').width > 350 ? 20 : 18,
//       fontWeight: 'bold'
//     }
//   }
// ,}
// )

// const BirdsNavigator = createBottomTabNavigator({
//   Map: {
//     screen: MenuNavigator,
//     navigationOptions: {
//       tabBarIcon: tabInfo => {
//         return <Feather name="map-pin" size={25} color={Colors.linkColor} />
//       }
//     }
//   },
//   Birdiedex: {
//     screen: Birds,
//     navigationOptions: {
//       tabBarIcon: tabInfo => {
//         return <Feather name="search" size={25} color={Colors.linkColor}/>
//       }
//     }
//   },
// }, {
//   tabBarOptions: {
//     activeTintColor: Colors.linkColor,
//   }
// })

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen name="Authenticate" component={AuthScreen} options={authScreenOptions}/>
    </AuthStackNavigator.Navigator>
  )
}

// const AuthNavigator = createStackNavigator({
//   Auth: {
//     screen: AuthScreen,
//     navigationOptions: {
//       title: 'BirdHouse',
//       headerTitleStyle: {
//         fontFamily: 'Fred-Great',
//         fontSize: 21,
//         fontWeight: '400'
//       }
//     }
//   },
// })

// const SwitchMenu = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Birdsy: BirdsNavigator
// })

const styles = StyleSheet.create({
  stockimage: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').height * 0.05
  },
});

// NOTE TO SELF:  try just map and birdiedex for bottom tab navigation and see what happens?

// export default createAppContainer(SwitchMenu);
