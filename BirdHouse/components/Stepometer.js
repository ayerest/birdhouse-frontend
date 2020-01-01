import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as stepsActions from '../store/actions/steps';
import { Pedometer } from 'expo-sensors';
import Colors from '../constants/Colors';


const Stepometer = props => {
    const [currentStepCount, setCurrentStepCount] = useState(0);
    const dispatch = useDispatch();
    let everyStepYouTake = false;

    useEffect(() => {
        initializePedometer();
        if (everyStepYouTake) {
            return everyStepYouTake.remove();
        };
    }, [initializePedometer])
    
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
    }
    
    const verifyPedometer = async () => {
        const result = await Pedometer.isAvailableAsync();
        if (!result) {
            Alert.alert("You do not have access to use the pedometer feature.");
            return false;
        }
        return true;
    }
    
    const watchSteps = () => {
        everyStepYouTake = Pedometer.watchStepCount(result => {
            setCurrentStepCount(result.steps);
            dispatch(stepsActions.currentSteps(result.steps));
        });
    }

    return (
        <View style={styles.center}>
            <Text style={styles.text}>Current Step Count: {currentStepCount} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        backgroundColor: Colors.myColor,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '90%',
        alignSelf: "center",
        marginBottom: 5
    },
    label: {
        alignSelf: 'center',
        fontSize: 16
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    center: {
        alignSelf: 'center'
    },
    text: {
        fontFamily: 'Roboto-Condensed',
        fontSize: 18,
        padding: 2
    }
});

export default Stepometer;
