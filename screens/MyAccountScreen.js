import React, { useEffect, useState } from 'react';
import {
  ScrollView, Text, Image, StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Pedometer } from 'expo-sensors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';
import { getMyEntries } from '../store/actions/entries';
import { getMyBirds } from '../store/actions/birds';
import * as stepsActions from '../store/actions/steps';
import Card from '../components/Card';

// TODO: refactor stylesheet and move to another file
// TODO: fix antipattern in useeffect

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '80%',
    width: '90%',
    backgroundColor: Colors.myColor,
  },
  image: {
    height: '40%',
    width: '80%',
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginRight: 10,
    alignSelf: 'center',
    fontFamily: 'Roboto-Condensed',
  },
  username: {
    fontSize: 32,
    fontFamily: 'Fred-Great',
  },
});

const MyAccountScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const steppage = useSelector((state) => state.steps);
  const myBirds = useSelector((state) => state.birds.myBirds);
  const myEntries = useSelector((state) => state.entries.entries);

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
    const loadBirdsAndSightings = async () => {
      await Promise.all(dispatch(getMyEntries()), dispatch(getMyBirds()));
    };
    let mounted = true;
    if (mounted) {
      if (!!user && user.last_login) {
        loadUserSteps();
      }
      loadBirdsAndSightings();
      setIsLoading(false);
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, user]);

  return (
    <ScrollView
      contentContainerStyle={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isLoading && (
        <ActivityIndicator size="large" color={Colors.linkColor} />
      )}
      {!isLoading && (
        <Card style={styles.screen}>
          <Text style={styles.username}>
            {user.username}
          </Text>
          <Image style={styles.image} source={{ uri: user.avatar }} />
          <Text style={styles.label}>
            {user.step_count + steppage.myNewSteps}
            {' '}
            Total Steps!
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate({
                name: 'My Sightings',
                params: {},
              });
            }}
          >
            <Text style={styles.label}>
              You have documented
              {' '}
              {myEntries.length}
              {' '}
              bird sightings in the field!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate({
                name: 'BirdieDex',
              });
            }}
          >
            <Text style={styles.label}>
              You have seen
              {' '}
              {myBirds.length}
              {' '}
              bird species!
            </Text>
          </TouchableOpacity>
        </Card>
      )}
    </ScrollView>
  );
};

MyAccountScreen.defaultProps = {
  navigation: '',
};

MyAccountScreen.propTypes = {
  navigation: PropTypes.instanceOf(Object),
};

export default MyAccountScreen;
