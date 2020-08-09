import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View, Text, StyleSheet, Image, SafeAreaView, Dimensions,
} from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as authActions from '../store/actions/auth';
import BadgesNavigator from './BadgesStackNavigator';
import { PicturesNavigator } from './PicturesStackNavigator';
import { FieldEntriesNavigator } from './FieldEntriesNavigator';
import { BirdsNavigator } from './BirdsStackNavigator';
import { AccountNavigator } from './AccountStackNavigator';
import { MainNavigator } from './MainStackNavigator';

const MenuDrawerNavigator = createDrawerNavigator();

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  buttonText: {
    fontFamily: 'Roboto-Condensed',
    fontSize: Dimensions.get('window').width > 350 ? 20 : 18,
    paddingLeft: 8,
    opacity: 0.8,
  },
});

const MenuNavigator = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  return (
    <MenuDrawerNavigator.Navigator
      drawerContent={(props) => (
        <View>
          <SafeAreaView forceInset={{
            top: 'always', horizontal: 'never', alignContent: 'flex-start', alignItems: 'flex-start',
          }}
          >
            <DrawerItemList {...props} user={user} style={{ flex: 1, width: '100%' }} />
            <TouchableOpacity onPress={() => {
              dispatch(authActions.logout());
            }}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      )}
      drawerContentOptions={{
        activeBackgroundColor: 'thistle',
        labelStyle: {
          fontFamily: 'Roboto-Condensed',
          fontSize: Dimensions.get('window').width > 350 ? 20 : 18,
          fontWeight: 'bold',
        },
      }}
    >
      <MenuDrawerNavigator.Screen
        name="Home"
        component={MainNavigator}
        options={{
          drawerIcon: (props) => (
            <Image style={{ height: 50, width: 50 }} source={require('../assets/images/birdhouse_logo_drawn.png')} />
          ),
        }}
      />
      <MenuDrawerNavigator.Screen name="BirdieDex" component={BirdsNavigator} />
      <MenuDrawerNavigator.Screen name="My Sightings" component={FieldEntriesNavigator} />
      <MenuDrawerNavigator.Screen name="My Badges" component={BadgesNavigator} />
      <MenuDrawerNavigator.Screen name="My Photos" component={PicturesNavigator} />
      <MenuDrawerNavigator.Screen name="My Account" component={AccountNavigator} />
    </MenuDrawerNavigator.Navigator>
  );
};

export default MenuNavigator;
