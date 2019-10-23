import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Switch, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MenuButton from '../components/MenuButton';
import GeoMap from '../components/GeoMap'
import Colors from '../constants/Colors';
import Stepometer from '../components/Stepometer';
import { useSelector, useDispatch } from 'react-redux';
import * as entriesActions from '../store/actions/entries';
import SharedEntries from '../components/SharedEntries';
import { Pedometer } from 'expo-sensors';
import * as stepsActions from '../store/actions/steps';
import StaticMap from '../components/StaticMap';
// import { Notifications } from 'expo';
// import registerForPushNotificationsAsync from '../components/RegisterForPushNotificationsAsync';



const MyAccountScreen = props => {

    const user = useSelector(state => {
        return state.user.user
    })

    const dispatch = useDispatch();

    const sharedEntries = useSelector(state => {
        return state.entries.sharedEntries
    })

    useEffect(() => {
        if (!!user && user.last_login) {
            loadUserSteps();
        }
    }, [user, dispatch])

    useEffect(() => {
        dispatch(entriesActions.getSharedEntries())
    }, [dispatch])


    const loadUserSteps = async () => {

        const getPermission = await verifyPedometer();
        if (!getPermission) {
            return;
        }
        try {
            getSteps();
        } catch (err) {
            console.log(err.message)
        }

    }

    const getSteps = async () => {
        const end = new Date();
        const start = new Date(user.last_login);

        if (end.getDate() !== start.getDate()) {
            Pedometer.getStepCountAsync(start, end).then(result => {
                dispatch(stepsActions.updateSteps(result.steps))
            })
        }

    }

    const verifyPedometer = async () => {
        const result = await Pedometer.isAvailableAsync();
        if (!result) {
            Alert.alert("You do not have access to use the pedometer feature.", [{ text: "Okay" }]);
            return false;
        }
        return true;
    }

    return (
        <ScrollView contentContainerStyle={{ height: '100%' }}>
            
            <View style={styles.steps}>
            
            </View>
          
        </ScrollView>
    )
}

MyAccountScreen.navigationOptions = navData => {
    const user = navData.navigation.getParam('user')

    return {
        headerTitle: "My Account",
        headerStyle: {
            backgroundColor: Platform.OS === "ios" ? Colors.myColor : "thistle",
            color: "black"
        },
        headerLeft: <HeaderButtons HeaderButtonComponent={MenuButton}>
            <Item title="Menu" iconName={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                onPress={() => { navData.navigation.toggleDrawer() }} />
        </HeaderButtons>,
        headerRight: (<Image style={{ width: 25, height: 25 }} source={require("../assets/images/birdicon.png")} />)
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        width: '100%'
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-end'
    },
    steps: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mapExtras: {
        marginTop: 10,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default MyAccountScreen;