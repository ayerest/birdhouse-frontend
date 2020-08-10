import React, { useEffect, useState } from 'react';
import {
  View, ScrollView, Text, StyleSheet, Switch, Platform, Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { Pedometer } from 'expo-sensors';
import MenuButton from '../components/MenuButton';
import GeoMap from '../components/GeoMap';
import Stepometer from '../components/Stepometer';
import { getMyEntries, getSharedEntries } from '../store/actions/entries';
import { getMyBirds } from '../store/actions/birds';
import SharedEntries from '../components/SharedEntries';
import * as stepsActions from '../store/actions/steps';
import StaticMap from '../components/StaticMap';
import AvatarButton from '../components/AvatarButton';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  steps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapExtras: {
    marginTop: 10,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  label: {
    fontFamily: 'Roboto-Condensed',
    fontSize: 18,
    padding: 2,
  },
  text: {
    fontFamily: 'Roboto-Condensed',
    fontSize: 16,
    paddingTop: 10,
  },
});

const MainViewScreen = (props) => {
  const [showShares, setShowShares] = useState(false);
  const [liveView, setLiveView] = useState(true);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const sharedEntries = useSelector((state) => state.entries.sharedEntries);

  useEffect(() => {
    const verifyPedometer = async () => {
      const result = await Pedometer.isAvailableAsync();
      if (!result) {
        Alert.alert('You do not have access to use the pedometer feature.');
        return false;
      }
      return true;
    };
    const getSteps = async () => {
      const end = new Date();
      const start = new Date(user.last_login);

      if (end.getDate() !== start.getDate()) {
        Pedometer.getStepCountAsync(start, end).then((result) => {
          dispatch(stepsActions.updateSteps(result.steps));
        });
      }
    };

    const loadUserSteps = async () => {
      const getPermission = await verifyPedometer();
      if (!getPermission) {
        return;
      }
      try {
        getSteps();
      } catch (err) {
        Alert.alert(err.message);
      }
    };
    if (!!user && user.last_login) {
      loadUserSteps();
    }
  }, [user, dispatch]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(getSharedEntries());
      dispatch(getMyEntries());
      dispatch(getMyBirds());
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const handleShowSharesOnMap = () => {
    setShowShares(true);
    setLiveView(false);
  };

  const handleHideOnMap = () => {
    setShowShares(false);
    setLiveView(!liveView);
  };

  const handleToggleShares = () => {
    setShowShares(false);
  };

  const handleLiveViewToggle = () => {
    setShowShares(false);
    setLiveView(!liveView);
  };

  return (
    <ScrollView contentContainerStyle={{ height: '100%' }}>
      {sharedEntries.length > 0
        ? (
          <SharedEntries
            hideOnMap={handleHideOnMap}
            showOnMap={handleShowSharesOnMap}
            sharedEntries={sharedEntries}
          />
        )
        : null}
      <View style={styles.steps}>
        <Stepometer />
        <View style={styles.row}>
          <Text style={styles.label}>Toggle Live View</Text>
          <Switch
            style={styles.share}
            value={liveView}
            onValueChange={handleLiveViewToggle}
          />
        </View>
      </View>
      <View style={styles.screen}>
        <View style={styles.mapExtras}>
          <Text style={styles.text}>See a bird? Tap the map!</Text>
        </View>
        {showShares || !liveView
          ? <StaticMap hideOnMap={handleHideOnMap} {...props} />
          : (
            <GeoMap
              toggleShares={handleToggleShares}
              hideOnMap={handleHideOnMap}
              showShares={showShares}
              {...props}
            />
          )}
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  const user = navData.route.params ? navData.route.params.user : {};

  return {
    headerTitle: 'BirdHouse',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={MenuButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
          onPress={() => { navData.navigation.toggleDrawer(); }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <AvatarButton handleClick={() => {
        navData.navigation.navigate({
          name: 'My Account',
          params: {
            user,
          },
        });
      }}
      />
    ),
  };
};

export default MainViewScreen;
