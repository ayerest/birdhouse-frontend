import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Switch, Platform, Alert, ActivityIndicator } from 'react-native';
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
import Card from '../components/Card';
// import { Notifications } from 'expo';
// import registerForPushNotificationsAsync from '../components/RegisterForPushNotificationsAsync';



const MyAccountScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    
    const user = useSelector(state => {
        return state.user.user
    })

    const steps = useSelector(state => {
        return state.steps.myTotalSteps
    })

    const sharedEntries = useSelector(state => {
        return state.entries.sharedEntries
    })

    useEffect(() => {
        if (!!user && user.last_login) {
            loadUserSteps();
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(entriesActions.getSharedEntries())
    }, [dispatch])


    const loadUserSteps = async () => {
        setIsLoading(true);
        const getPermission = await verifyPedometer();
        if (!getPermission) {
            setIsLoading(false);
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
        setIsLoading(false);
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
        <ScrollView contentContainerStyle={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            
                {user && !isLoading ? 
                    <Card style={styles.screen}>
                        <Text>{user.username} Account Information</Text>
                        <Image style={styles.image} source={{uri: user.avatar}}></Image>
                        <Text>{steps} Total Steps!</Text>
                        <Text>You have documented {user.field_entries.length} bird sightings in the field!</Text>
                        <Text>You have seen {user.birds.length} bird species!</Text>
                    </Card>
                     : <ActivityIndicator /> }
          
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
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '80%',
        width: '90%',
        backgroundColor: 'ghostwhite'
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
    },
    image: {
        height: '40%',
        width: '60%',
        resizeMode: 'cover',
        borderWidth: 1,
        borderRadius: 50
    }
})

export default MyAccountScreen;