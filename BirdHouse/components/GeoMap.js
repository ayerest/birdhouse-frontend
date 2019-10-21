import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Alert, ActivityIndicator, Button} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ENV from '../env';
import MapView, {Marker, Callout} from 'react-native-maps';
import AddFieldEntryForm from './AddFieldEntryForm';
import Colors from '../constants/Colors'


const GeoMap = (props) => {
    const [activeMarker, setActiveMarker] = useState(null);
    const [newMarker, setNewMarker] = useState(null);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [visible, setVisible] = useState(true)


    useEffect(() => {
        displayMapHandler()
    }, [displayMapHandler]);  

    useEffect(() => {
        setVisible(true)
    }, [newMarker])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert("Please grant location permissions to use the map feature.", [{ text: "Okay" }]);
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
        // const location = await
        // Location.watchPositionAsync({accuracy: 1, timeInterval: 120000}, () => {})
        //at this point I can set the marker state with the same lat long so a marker shows up initially
            setNewMarker({ latitude: location.coords.latitude, longitude: location.coords.longitude })
            setCurrentLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })

        } catch (err) {
            Alert.alert("Unable to access current location.", "Please try again later.", [{text: "Okay"}])
        }
        setIsGettingLocation(false);
    }

    const mapRegion = {
        latitude: (!!currentLocation ? currentLocation.lat : 46.6062),
        longitude: (!!currentLocation ? currentLocation.lng :-122.306417),
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0321
    }

    const addMarkerHandler = (event) => {
        let mapTouchEvent = event
        let lat = mapTouchEvent.nativeEvent.coordinate.latitude
        let lng = mapTouchEvent.nativeEvent.coordinate.longitude
        setNewMarker({latitude: lat, longitude: lng })
    }

   

    handleModalClose = () => {
        setVisible(false)
    }

    return (
        <View style={styles.mapContainer}>
            <View style={styles.mapExtras}>
                <Button style={styles.button} title={"Refresh Map"} onPress={displayMapHandler}/>
                <Text style={styles.center}>See a bird?</Text>
                <Text style={styles.center}>Tap the bird marker to document your sighting!</Text>
            </View>
            {isGettingLocation && !currentLocation ? <ActivityIndicator /> : 
                <MapView style={styles.map} region={mapRegion} onPress={addMarkerHandler}>
                   
                    {!!newMarker ? 
                        <Marker {...props} image={require('../assets/images/birdicon.png')} title="New Field Entry" coordinate={newMarker} onPress={() => {
                            props.navigation.navigate({
                                routeName: 'AddEntry', params: {
                                    onHandleModalClose: handleModalClose,
                                    visible: visible,
                                    coords: newMarker
                                }
                            })
                        }}>
                        {/* <Callout >
                                <AddFieldEntryForm {...props} onHandleModalClose={handleModalClose} visible={visible} coords={newMarker}/>
                        </Callout> */}
                    </Marker> : null
                    }
                </MapView>
            }
        </View>
    )
}

GeoMap.navigationOptions = (navigationData) => {
    // const bird_id = navigationData.navigation.getParam('birdId')
    // const bird_name = navigationData.navigation.getParam('birdName')

    return {
        headerTitle: "Map View",
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
