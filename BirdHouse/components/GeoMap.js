import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Alert, ActivityIndicator, Image} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useDispatch, useSelector } from 'react-redux';
import ENV from '../env';
import MapView, {Marker, Callout} from 'react-native-maps';
import AddFieldEntryForm from './AddFieldEntryForm';
import Colors from '../constants/Colors';
import { NavigationEvents } from 'react-navigation';



const GeoMap = (props) => {
    const [activeMarker, setActiveMarker] = useState(null);
    const [newMarker, setNewMarker] = useState(null);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [visible, setVisible] = useState(true);
    const [follow, setFollow] = useState(!props.showShares);


    const sharedEntries = useSelector(state => {
        return state.entries.sharedEntries
    })
   
    useEffect(() => {
        displayMapHandler()
    }, [displayMapHandler]);  

    useEffect(() => {
        setVisible(true)
    }, [newMarker])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert("Please grant location permissions to use the map feature.");
            return false;
        }
        return true;
    }

    const displayMapHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        try {
           setIsGettingLocation(true);
           const location = await Location.getCurrentPositionAsync({timeout: 10000});
        
            // setNewMarker({ latitude: location.coords.latitude, longitude: location.coords.longitude })
            setCurrentLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
            

        } catch (err) {
            Alert.alert("Unable to access current location.", "Please try again later.")
        }
        setIsGettingLocation(false);
    }

    let mapRegion = {
        latitude: (!!currentLocation ? currentLocation.lat : 46.6062),
        longitude: (!!currentLocation ? currentLocation.lng :-122.306417),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }

    const addMarkerHandler = (event) => {
        let mapTouchEvent = event
        // setCurrentLocation({ lat: mapTouchEvent.nativeEvent.coordinate.latitude, lng: mapTouchEvent.nativeEvent.coordinate.longitude})
        // mapRegion.latitude = mapTouchEvent.nativeEvent.coordinate.latitude;
        // mapRegion.longitude = mapTouchEvent.nativeEvent.coordinate.longitude;
        let lat = mapTouchEvent.nativeEvent.coordinate.latitude
        let lng = mapTouchEvent.nativeEvent.coordinate.longitude
        setNewMarker({latitude: lat, longitude: lng })

    }

   

    handleModalClose = () => {
        setVisible(false)
    }

    return (
        <View style={styles.mapContainer}>
            {/* <NavigationEvents
                onWillFocus={displayMapHandler}
            /> */}
            {isGettingLocation && !currentLocation ? <ActivityIndicator /> : 
                <MapView showsUserLocation={follow} followsUserLocation={follow} style={styles.map} initialRegion={mapRegion} onPress={addMarkerHandler}>
                    {( !!newMarker ?
                        <Marker {...props} title="New Field Entry" coordinate={newMarker} onPress={() => {
                            props.navigation.navigate({
                                routeName: 'AddEntry', params: {
                                    onHandleModalClose: handleModalClose,
                                    visible: visible,
                                    coords: newMarker
                                }
                            })
                        }}><Image style={{height: 50, width: 50}}source={require('../assets/images/birdicon.png')} />
                    </Marker>
                     : null)}
                </MapView>
            }
        </View>
    )
}

GeoMap.navigationOptions = (navigationData) => {
    // const bird_id = navigationData.navigation.getParam('birdId')
    // const bird_name = navigationData.navigation.getParam('birdName')

    return {
        
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        height: '100%',
        width: '100%'
    }, 
    map: {
        flex: 1
    },
    mapExtras: {
    
    },
    center: {
        textAlign: "center"
    },
    modal: {

    },
    button: {
        backgroundColor: Colors.myColor
    }
})

export default GeoMap;
