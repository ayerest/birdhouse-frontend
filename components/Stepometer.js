import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  StyleSheet, Text, View, Alert,
} from 'react-native';
import { Pedometer } from 'expo-sensors';
import * as stepsActions from '../store/actions/steps';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  input: {
    height: 30,
    backgroundColor: Colors.myColor,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 5,
  },
  label: {
    alignSelf: 'center',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  center: {
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'Roboto-Condensed',
    fontSize: 18,
    padding: 2,
  },
});

const Stepometer = () => {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let everyStepYouTake = false;
    const watchSteps = () => {
      everyStepYouTake = Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
        dispatch(stepsActions.currentSteps(result.steps));
      });
    };
    const verifyPedometer = async () => {
      const result = await Pedometer.isAvailableAsync();
      if (!result) {
        Alert.alert('You do not have access to use the pedometer feature.');
        return false;
      }
      return true;
    };
    const initializePedometer = async () => {
      const hasPermission = await verifyPedometer();
      if (!hasPermission) {
        return;
      }
      try {
        watchSteps();
      } catch (err) {
        throw new Error(err.message);
      }
    };
    let mounted = true;
    if (mounted) {
      initializePedometer();
      if (everyStepYouTake) {
        return everyStepYouTake.remove();
      }
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return (
    <View style={styles.center}>
      <Text style={styles.text}>
        Current Step Count:
        {currentStepCount}
      </Text>
    </View>
  );
};

export default Stepometer;
