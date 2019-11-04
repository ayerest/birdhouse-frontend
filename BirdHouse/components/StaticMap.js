import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator, Button, Image } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useDispatch, useSelector } from 'react-redux';
import ENV from '../env';
import MapView, { Marker, Callout } from 'react-native-maps';
import AddFieldEntryForm from './AddFieldEntryForm';
import Colors from '../constants/Colors';
import { NavigationEvents } from 'react-navigation';



const StaticMap = (props) => {
    const [activeMarker, setActiveMarker] = useState(null);
    const [newMarker, setNewMarker] = useState(null);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [visible, setVisible] = useState(true);
    const [follow, setFollow] = useState(true);
    const [mapRegion, setMapRegion] = useState(null)


    const sharedEntries = useSelector(state => {
        return state.entries.sharedEntries
    })

    const user = useSelector(state => {
        return state.user.user
    })

    useEffect(() => {
        let points = [];
        if (sharedEntries.length > 0) {
            points = sharedEntries.map(entry => {
            return { latitude: entry.latitude, longitude: entry.longitude }
        })
        }
        points.length > 0 ?
        getNewMapRegion(points) : displayMapHandler();
    }, [sharedEntries]);

    // useEffect(() => {
    //     setVisible(true)
    // }, [newMarker])

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
            const location = await Location.getCurrentPositionAsync({ timeout: 10000 });
            // const location = await
            // Location.watchPositionAsync({accuracy: 1, timeInterval: 120000}, () => {})
            //at this point I can set the marker state with the same lat long so a marker shows up initially
            setNewMarker({ latitude: location.coords.latitude, longitude: location.coords.longitude })   
            // setCurrentLocation({
            //     lat: location.coords.latitude,
            //     lng: location.coords.longitude
            // })

            setMapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            })   


        } catch (err) {
            Alert.alert("Unable to access current location.", "Please try again later.")
        }
       
        setIsGettingLocation(false);
    }

    // let mapRegion = {
    //     latitude: (!!currentLocation ? currentLocation.lat : 46.6062),
    //     longitude: (!!currentLocation ? currentLocation.lng : -122.306417),
    //     latitudeDelta: 0.0,
    //     longitudeDelta: 0.0
    // }

    const addMarkerHandler = (event) => {
        let mapTouchEvent = event
        // props.hideOnMap()
        // setCurrentLocation({ lat: mapTouchEvent.nativeEvent.coordinate.latitude, lng: mapTouchEvent.nativeEvent.coordinate.longitude})
        // mapRegion.latitude = mapTouchEvent.nativeEvent.coordinate.latitude;
        // mapRegion.longitude = mapTouchEvent.nativeEvent.coordinate.longitude;
        let lat = mapTouchEvent.nativeEvent.coordinate.latitude
        let lng = mapTouchEvent.nativeEvent.coordinate.longitude
        setNewMarker({ latitude: lat, longitude: lng })

    }



    // handleModalClose = () => {
    //     setVisible(false)
    // }

    const getNewMapRegion = (points) => {
        // points should be an array of { latitude: X, longitude: Y }
        setIsGettingLocation(true);
        let minX, maxX, minY, maxY;

        // init first point
        ((point) => {
            minX = point.latitude;
            maxX = point.latitude;
            minY = point.longitude;
            maxY = point.longitude;
        })(points[0]);

        // calculate rect
        points.map((point) => {
            minX = Math.min(minX, point.latitude);
            maxX = Math.max(maxX, point.latitude);
            minY = Math.min(minY, point.longitude);
            maxY = Math.max(maxY, point.longitude);
        });

        const midX = (minX + maxX) / 2;
        const midY = (minY + maxY) / 2;
        const deltaX = (maxX - minX + 0.1);
        const deltaY = (maxY - minY + 0.1);
        setMapRegion({
            latitude: midX,
            longitude: midY,
            latitudeDelta: deltaX,
            longitudeDelta: deltaY
        });
        setIsGettingLocation(false);
    }


    const renderMarkers = () => {

        // let points = sharedEntries.map(entry => {
        //     return { latitude: entry.latitude, longitude: entry.longitude }
        // })
        // setFollow(false);
    

        return sharedEntries.map(entry => {
            return (<Marker key={entry.id} {...props} title="Bird Alert" coordinate={{ latitude: entry.latitude, longitude: entry.longitude }} onPress={() => {
                props.navigation.navigate({
                    routeName: 'FieldDetails', params: {
                        entry: entry,
                        user: props.navigation.state.params.user
                    }
                })
            }}>
                <Image style={{height: 50, width: 50}} source={require('../assets/images/share-bird.png')} />
            </Marker>)
        })
    }
 
    return (
        <View style={styles.mapContainer}>
              
            {/* <NavigationEvents
                onWillFocus={displayMapHandler}
            /> */}
            {!!isGettingLocation ? <ActivityIndicator /> :
                <MapView style={styles.map} initialRegion={mapRegion} onPress={addMarkerHandler}>
                    {sharedEntries.length > 0 ? 
                    renderMarkers() : null }
                    {!!newMarker ?
                        <Marker {...props}   title="New Bird Sighting" coordinate={newMarker} onPress={() => {
                            props.navigation.navigate({
                                routeName: 'AddEntry', params: {
                                    onHandleModalClose: handleModalClose,
                                    visible: visible,
                                    coords: newMarker
                                }
                            })
                        }}>
                            <Image style={{ height: 50, width: 50 }} source={require('../assets/images/birdicon.png')} />
                        </Marker>
                        : null }
                </MapView>
            }
        </View>
    )
}

StaticMap.navigationOptions = (navigationData) => {
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

export default StaticMap;
