import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createStackNavigator, createAppContainer,
createSwitchNavigator, createDrawerNavigator, DrawerItems} from 'react-navigation';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth'

// import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
// import SettingsScreen from '../screens/SettingsScreen';
import FieldEntriesScreen from '../screens/FieldEntriesScreen';
import FieldEntryDetailsScreen from '../screens/FieldEntryDetailsScreen';
import BirdODexScreen from '../screens/BirdODexScreen';
import BirdDetailsScreen from '../screens/BirdDetailsScreen';
import MainViewScreen from '../screens/MainViewScreen'
import BadgesScreen from '../screens/BadgesScreen'
// import Logout from '../components/Logout'
import PicturesScreen from '../screens/PicturesScreen'

import Colors from '../constants/Colors'
import AuthScreen from '../screens/AuthScreen';
// import { DrawerNavigatorItems } from 'react-navigation-drawer';

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

// HomeStack.navigationOptions = {
//   tabBarLabel: 'Home',
//   tabBarIcon: ({ focused }) => (
  //     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };

// HomeStack.path = '';

// const SettingsStack = createStackNavigator(
//   {
  //     Settings: SettingsScreen,
  //   },
  //   config
  // );
  
  // SettingsStack.navigationOptions = {
    //   tabBarLabel: 'Settings',
    //   tabBarIcon: ({ focused }) => (
      //     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
//   ),
// };

// SettingsStack.path = '';

const Badges = createStackNavigator({
  MyBadges: BadgesScreen
})

const Pictures = createStackNavigator({
  MyPhotos: PicturesScreen
})

const FieldEntries = createStackNavigator({
  FieldEntries: FieldEntriesScreen,
  FieldEntry: FieldEntryDetailsScreen
})

const Birds = createStackNavigator({
  BirdODex: BirdODexScreen,
  BirdDetails: BirdDetailsScreen
})

const Main = createStackNavigator({
  Main: MainViewScreen
})

const MenuNavigator = createDrawerNavigator({
  Home: Main,
  "Field Entries": FieldEntries,
  BirdODex: Birds,
  "My Badges": Badges,
  "My Photos": Pictures,
}, {
  contentComponent: props => {
    const dispatch = useDispatch();
    return <View style={{flex: 1}}>
      <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
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
  Auth: AuthNavigator,
  Menu: MenuNavigator
})

// const MainNavigator = createBottomTabNavigator({
//   HomeStack,
//   MainView,
//   SettingsStack,
//   FieldEntries,
//   Birds
// }, {
//   defaultNavigationOptions: {
//     headerStyle: {
//       backgroundColor: Platform.OS === 'android' ? Colors.tintColor : 'ghostwhite'
//     }
//   }
// });

// MainNavigator.path = '';


export default createAppContainer(SwitchMenu);
