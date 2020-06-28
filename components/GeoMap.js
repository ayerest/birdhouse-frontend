import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';
import LocationLogic from './LocationLogic';

const GeoMap = (props) => {
    const [newMarker, setNewMarker] = useState(null);
    const [isGettingLocation, setIsGettingLocation] = useState(true);
    const [visible, setVisible] = useState(true);
    const [follow, setFollow] = useState(!props.showShares);
    const myLocation = useSelector((state) => state.location.myLocation); 

    useEffect(() => {
        setVisible(true);
    }, [newMarker])

    let mapRegion = {
        latitude: (!!myLocation ? myLocation.lat : 46.6062),
        longitude: (!!myLocation ? myLocation.lng :-122.306417),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }

    const loadingLocation = () => {
        setIsGettingLocation(false);
    }

    const addMarkerHandler = (event) => {
        let mapTouchEvent = event;
        let lat = mapTouchEvent.nativeEvent.coordinate.latitude;
        let lng = mapTouchEvent.nativeEvent.coordinate.longitude;
        setNewMarker({latitude: lat, longitude: lng });
    }

    handleModalClose = () => {
        setVisible(false);
    }

    return (
        <View style={styles.mapContainer}>
            <LocationLogic stillLoading={loadingLocation} />
            {isGettingLocation && !myLocation ? <ActivityIndicator size="large" color={Colors.linkColor} /> : 
                <MapView showsUserLocation={follow} followsUserLocation={follow} style={styles.map} initialRegion={mapRegion} onPress={addMarkerHandler}>
                    {( !!newMarker ?
                        <Marker {...props} title="New Bird Sighting" coordinate={newMarker} onPress={() => {
                            props.navigation.navigate({
                                name: 'Add Entry', params: {
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
