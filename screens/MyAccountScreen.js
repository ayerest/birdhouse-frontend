import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Image, StyleSheet, Platform, Alert, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MenuButton from '../components/MenuButton';
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { getMyEntries } from '../store/actions/entries';
import { getMyBirds } from '../store/actions/birds';
import { Pedometer } from 'expo-sensors';
import * as stepsActions from '../store/actions/steps';
import Card from '../components/Card';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MyAccountScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    
    const user = useSelector(state => {
        return state.user.user
    });

    const steps = useSelector(state => {
        return state.steps.myTotalSteps
    });

    const myBirds = useSelector(state => {
        return state.birds.myBirds;
    });

    const myEntries = useSelector(state => {
        return state.entries.entries;
    })

    useEffect(() => {
        if (!!user && user.last_login) {
            loadUserSteps();
        }
        loadBirdsAndSightings();
        setIsLoading(false);
    }, [dispatch]);

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
            Alert.alert("You do not have access to use the pedometer feature.");
            return false;
        }
        return true;
    }

    const loadBirdsAndSightings = async () => {
        await Promise.all(dispatch(getMyEntries()),
        dispatch(getMyBirds()));
    }

    return (
        <ScrollView contentContainerStyle={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            
            {isLoading ? <ActivityIndicator size="large" color={Colors.linkColor}/>
                     : 
                <Card style={styles.screen}>
                    <Text style={styles.label}>{user.username} Account Information</Text>
                    <Image style={styles.image} source={{ uri: user.avatar }}></Image>
                    <Text style={styles.label}>{steps} Total Steps!</Text>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate({
                            routeName: 'BirdieSightings', params: {
                            }
                        })
                        }}>
                        <Text style={styles.label}>You have documented {myEntries.length} bird sightings in the field!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate({
                            routeName: 'BirdODex',
                        })}}>

                        <Text style={styles.label}>You have seen {myBirds.length} bird species!</Text>
                    </TouchableOpacity>
                </Card> }
          
        </ScrollView>
    )
}

MyAccountScreen.navigationOptions = navData => {

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
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '80%',
        width: '90%',
        backgroundColor: Colors.myColor
    },
    image: {
        height: '40%',
        width: '80%',
        resizeMode: 'cover',
        borderWidth: 1,
        borderRadius: 50
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginRight: 10,
        alignSelf: "center",
        fontFamily: 'Roboto-Condensed',
    }
})

export default MyAccountScreen;