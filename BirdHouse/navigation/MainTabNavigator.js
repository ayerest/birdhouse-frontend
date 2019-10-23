import React from 'react';
import { Platform, SafeAreaView, Button, View, Image } from 'react-native';
import { createStackNavigator, createAppContainer,
createSwitchNavigator, createDrawerNavigator, DrawerItems} from 'react-navigation';
import {useDispatch} from 'react-redux';
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
  MyBadges: BadgesScreen,
  BadgeDetails: BadgeDetailsScreen
})

const Pictures = createStackNavigator({
  MyPhotos: PicturesScreen
})

const FieldEntries = createStackNavigator({
  FieldEntries: FieldEntriesScreen,
  EntryInfo: FieldEntryDetailsScreen,
  FieldEntry: FieldEntryDetailsScreen,
  BirdStuff: BirdDetailsScreen
})

const Birds = createStackNavigator({
  BirdieDex: BirdODexScreen,
  BirdsList: BirdsList,
  BirdDetails: BirdDetailsScreen
})

const Main = createStackNavigator({
  Main: MainViewScreen,
  GeoMap: GeoMap,
  StaticMap: StaticMap,
  FieldDetails: FieldEntryDetailsScreen,
  AddEntry: AddFieldEntryForm,
  BirdInfo: BirdDetailsScreen
})

const MenuNavigator = createDrawerNavigator({
  Home: Main,
  "Field Entries": FieldEntries,
  BirdieDex: Birds,
  "My Badges": Badges,
  "My Photos": Pictures,
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
  Auth: AuthScreen
})

const SwitchMenu = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Menu: MenuNavigator
})


export default createAppContainer(SwitchMenu);
