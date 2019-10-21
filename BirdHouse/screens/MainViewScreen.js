import React, {useEffect, useState} from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Platform, Alert } from 'react-native';
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
// import { Notifications } from 'expo';
// import registerForPushNotificationsAsync from '../components/RegisterForPushNotificationsAsync';



const MainViewScreen = props => {
    const [showShares, setShowShares] = useState(false)
    // const [notification, setNotification] = useState({})
    const user = useSelector(state => {
        return state.user.user
    })

    const dispatch = useDispatch();

    const sharedEntries = useSelector(state => {
        return state.entries.sharedEntries
    })

    // useEffect(() => {
    //     registerForPushNotificationsAsync(user);
    //     _notificationSubscription = Notifications.addListener(_handleNotification);
    // }, [registerForPushNotificationsAsync, user])

    // const _handleNotification = (notification) => {
    //     setNotification({ notification: notification });
    // };
    
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

    const handleShowSharesOnMap = () => {
        console.log("what")
        setShowShares(true);
    }

    const handleHideOnMap = () => {
        setShowShares(false);
    }

    const handleToggleShares = () => {
        setShowShares(false);
    }

    return (
        <ScrollView contentContainerStyle={{height: '100%'}}>
                {sharedEntries.length > 0 ? <SharedEntries hideOnMap={handleHideOnMap} showOnMap={handleShowSharesOnMap} sharedEntries={sharedEntries}/>: null}
            <View style={styles.row}>
                {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Origin: {notification.origin}</Text>
                    <Text>Data: {JSON.stringify(notification.data)}</Text>
                </View> */}
                <Stepometer />
            </View>
            <View style={styles.screen}>
                <GeoMap toggleShares={handleToggleShares} hideOnMap={handleHideOnMap} showShares={showShares} {...props}/>
            </View>
        </ScrollView>
    )
}

MainViewScreen.navigationOptions = navData => {
    const user = navData.navigation.getParam('user')

    return {
        headerTitle: "BirdHouse",
        headerStyle: {
            backgroundColor: Platform.OS === "ios" ? Colors.myColor : "thistle",
            color: "black"
        },
        headerLeft: <HeaderButtons HeaderButtonComponent={MenuButton}>
            <Item title="Menu" iconName= {Platform.OS === "ios" ? "ios-menu" : "md-menu"}
            onPress={() => {navData.navigation.toggleDrawer()}} />
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
        alignItems: "center"
    }
})

export default MainViewScreen;