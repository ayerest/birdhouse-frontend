import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { TextInput, StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as stepsActions from '../store/actions/steps';
import { Pedometer } from 'expo-sensors';
// import {useFocusEffect} from 'react-navigation-hooks';


const Stepometer = props => {
    const [currentStepCount, setCurrentStepCount] = useState(0)
    // const [error, setError] = useState()
    // const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    // useFocusEffect(useCallback(()=> {
    //     return () => {
    //         dispatch(stepsActions.updateSteps(currentStepCount));
    //     }
    // }, []));
    
    useEffect(() => {
        const loadMyStepCount = async () => {
            // setIsLoading(true)
            await dispatch(stepsActions.getMySteps());
            // setIsLoading(false)
        }
        loadMyStepCount();
    }, [dispatch, stepCount]);


    useEffect(() => {
        initialzePedometer();
        
    }, [dispatch, stepCount])

    const user = useSelector(state => {
        return state.user.user
    })
    

    const verifyPedometer = async () => {
        const result = await Pedometer.isAvailableAsync();
        if (!result) {
            Alert.alert("You do not have access to use the pedometer feature.", [{ text: "Okay" }]);
            return false;
        }
        return true;
    }

    const initialzePedometer = async () => {
        const hasPermission = await verifyPedometer();
        if (!hasPermission) {
            return;
        }
        try {
            watchSteps();
        } catch (err) {
            console.log(err.message)
        }
    }
    
    const stepCount = useSelector(state => {
        return state.steps.myTotalSteps
    })

    const currentSteps = useSelector(state => {
        return state.steps.myNewSteps
    })
    
    const watchSteps = () => {
        Pedometer.watchStepCount(result => {
            setCurrentStepCount(result.steps)
            dispatch(stepsActions.currentSteps(result.steps))
        });
    }

    const updateMySteps = async () => {
        try {
            await dispatch(stepsActions.updateSteps(currentStepCount));
            setCurrentStepCount(0);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View>
            <Text>Current Steps Taken: {currentStepCount} </Text>
            {/* <Text>Total Steps Taken: {stepCount + currentSteps}</Text> */}
            {/* <Button title="Update my steps!" onPress={updateMySteps}/> */}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        backgroundColor: 'ghostwhite',
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
    }
});

export default Stepometer;
