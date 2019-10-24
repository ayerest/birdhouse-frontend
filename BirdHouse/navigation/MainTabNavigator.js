import React from 'react';
import { Platform, SafeAreaView, Button, View, Image } from 'react-native';
import { createStackNavigator, createAppContainer,
createSwitchNavigator, createDrawerNavigator, DrawerItems} from 'react-navigation';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../store/actions/auth';
import AddFieldEntryForm from '../components/AddFieldEntryForm';

import HomeScreen from '../screens/HomeScreen';
import FieldEntriesScreen from '../screens/FieldEntriesScreen';
import FieldEntryDetailsScreen from '../screens/FieldEntryDetailsScreen';
import BirdODexScreen from '../screens/BirdODexScreen';
import BirdsList from '../components/BirdsList';
import BirdDetailsScreen from '../screens/BirdDetailsScreen';
import MainViewScreen from '../screens/MainViewScreen';
import BadgesScreen from '../screens/BadgesScreen';
import PicturesScreen from '../screens/PicturesScreen';
import GeoMap from '../components/GeoMap';
import StaticMap from '../components/StaticMap';

import Colors from '../constants/Colors';
import AuthScreen from '../screens/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import BadgeDetailsScreen from '../screens/BadgeDetailsScreen';
import MyAccountScreen from '../screens/MyAccountScreen';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


const HomeStack = createStackNavigator(
    {
    Home: HomeScreen,
  },
  config
);

const Badges = createStackNavigator({
  MyBadges: {
    screen: BadgesScreen,
    navigationOptions: {
      title: 'My Badges',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 21,
        fontWeight: '400'
      }
    }
  },
  BadgeDetails: BadgeDetailsScreen
})

const Pictures = createStackNavigator({
  MyPhotos: {
    screen: PicturesScreen,
    navigationOptions: {
      title: 'My Photos',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 21,
        fontWeight: '400'
      }
    }
  },
})

const FieldEntries = createStackNavigator({
  FieldEntries: {
    screen: FieldEntriesScreen,
    navigationOptions: {
      title: 'My Field Entries',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 21,
        fontWeight: '400'
      }
    }
  },
  EntryInfo: {screen: FieldEntryDetailsScreen,
  navigationOptions: {
    title: 'Field Entry',
    headerTitleStyle: {
      fontFamily: 'Fred-Great',
      fontSize: 21,
      fontWeight: '400'
    }
  }
},
  FieldEntry: {
    screen: FieldEntryDetailsScreen,
    navigationOptions: {
      title: 'Field Entry',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 21,
        fontWeight: '400'
      }
    }
  },
  BirdStuff: BirdDetailsScreen
})

const Birds = createStackNavigator({
  BirdieDex: {
    screen: BirdODexScreen,
    navigationOptions: {
      title: 'BirdieDex',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 21,
        fontWeight: '400'
      }
    }
  },
  BirdsList: BirdsList,
  BirdDetails: BirdDetailsScreen
})

const Main = createStackNavigator({
  Main: {
    screen: MainViewScreen,
    navigationOptions: {
      title: 'BirdHouse',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 21,
        fontWeight: '400'
      }
    }},
  GeoMap: GeoMap,
  StaticMap: StaticMap,
  FieldDetails: FieldEntryDetailsScreen,
  AddEntry: AddFieldEntryForm,
  BirdInfo: BirdDetailsScreen,
  BirdStuff: BirdDetailsScreen
})

const Account = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: {
      title: 'My Account',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 21,
        fontWeight: '400'
      }
    }
  },
})

const MenuNavigator = createDrawerNavigator({
  Home: Main,
  "Field Entries": FieldEntries,
  BirdieDex: Birds,
  "My Badges": Badges,
  "My Photos": Pictures,
  "My Account": Account
}, {
  contentComponent: props => {
    const dispatch = useDispatch();
    return <View style={{flex: 1}}>
      <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
        <Image style={{ height: 80, width: 80 }} source={require("../assets/images/birdhouse_logo_drawn.png")} />
      <DrawerItems {...props} />
      <Button title="Logout" onPress={() => {
        dispatch(authActions.logout());
        props.navigation.navigate("Auth")
        }}/>
      </SafeAreaView>
    </View>
  }
})

const AuthNavigator = createStackNavigator({
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      title: 'BirdHouse',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 21,
        fontWeight: '400'
      }
    }
  },
})

const SwitchMenu = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Menu: MenuNavigator
})


export default createAppContainer(SwitchMenu);
