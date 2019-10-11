import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Alert, ActivityIndicator} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
 

const GeoMap = (props) => {
    const [activeMarker, setActiveMarker] = useState(null)
    const [isGettingLocation, setIsGettingLocation] = useState(false);


    useEffect(() => {
        displayMapHandler()
        console.log(verifyPermissions)
    }, [displayMapHandler]);

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
           const location = await Location.getCurrentPositionAsync({timeout: 6000});
        } catch (err) {
            Alert.alert("Unable to access current location.", "Please try again later.", [{text: "Okay"}])
        }
        setIsGettingLocation(false);
    }

    return (
        <View>
            <Text>Geomap</Text>
            {isGettingLocation ? <ActivityIndicator /> : <Text>supppp</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {

    }, 
    map: {

    },
    marker: {

    },
    modal: {

    }
})

export default GeoMap;
