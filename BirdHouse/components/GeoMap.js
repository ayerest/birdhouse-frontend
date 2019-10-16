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
        //    console.log(location)
        // const location = await
        // Location.watchPositionAsync({accuracy: 1, timeInterval: 120000}, () => {})
        // console.log(location, "location")
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
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421
    }

    const addMarkerHandler = (event) => {
        let mapTouchEvent = event
        console.log(mapTouchEvent, "testing testing")
        let lat = mapTouchEvent.nativeEvent.coordinate.latitude
        let lng = mapTouchEvent.nativeEvent.coordinate.longitude
        setNewMarker({latitude: lat, longitude: lng })
    }

    // const displayFormHandler = (event) => {
    //     // console.log("this marker is clickable", event)
    //     let markerTouchEvent = event
    //     let lat = markerTouchEvent.nativeEvent.coordinate.latitude
    //     let lng = markerTouchEvent.nativeEvent.coordinate.longitude
    // }

    handleModalClose = () => {
        setVisible(false)
    }

    return (
        <View style={styles.mapContainer}>
            <View style={styles.mapExtras}>
                <Button style={styles.button} title={"Refresh Map"} onPress={displayMapHandler}/>
                <Text style={styles.center}>See a bird?</Text>
                <Text style={styles.center}>Tap the map to add a bird marker and then tap the bird marker to add a new entry!</Text>
            </View>
            {isGettingLocation && !currentLocation ? <ActivityIndicator /> : 
                <MapView style={styles.map} region={mapRegion} onPress={addMarkerHandler}>
                   
                    {!!newMarker ? 
                    <Marker image={require('../assets/images/birdicon.png')} title="New Field Entry" coordinate={newMarker}>
                        <Callout >
                            <AddFieldEntryForm onHandleModalClose={handleModalClose} visible={visible} coords={newMarker}/>
                        </Callout>
                    </Marker> : null
                    }
                </MapView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        height: '80%',
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
