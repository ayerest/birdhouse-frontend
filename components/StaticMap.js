import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';
import LocationLogic from './LocationLogic';

const StaticMap = (props) => {
    const [newMarker, setNewMarker] = useState(null);
    const [isGettingLocation, setIsGettingLocation] = useState(true);
    const [visible, setVisible] = useState(true);
    const [mapRegion, setMapRegion] = useState(null);
    const myLocation = useSelector((state) => state.location.myLocation); 
    const sharedEntries = useSelector(state => {
        return state.entries.sharedEntries;
    })

    handleModalClose = () => {
        setVisible(false);
    }

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


    const displayMapHandler = async () => {
        try {
            //at this point I can set the marker state with the same lat long so a marker shows up initially
            setNewMarker({ latitude: myLocation.lat, longitude: myLocation.lng });
            setMapRegion({
                latitude: myLocation.lat,
                longitude: myLocation.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            })   
        } catch (err) {
            Alert.alert("Unable to access current location.", "Please try again later.");
        }       
    }

    const addMarkerHandler = (event) => {
        let mapTouchEvent = event;
        let lat = mapTouchEvent.nativeEvent.coordinate.latitude;
        let lng = mapTouchEvent.nativeEvent.coordinate.longitude;
        setNewMarker({ latitude: lat, longitude: lng });
    }

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

    const loadingLocation = () => {
        setIsGettingLocation(false);
    }
 
    return (
        <View style={styles.mapContainer}>
            <LocationLogic stillLoading={loadingLocation}/>
            {!!isGettingLocation ? <ActivityIndicator size="large" color={Colors.linkColor} /> :
                <MapView style={styles.map} initialRegion={mapRegion} onPress={addMarkerHandler}>
                    {sharedEntries.length > 0 ? 
                    renderMarkers() : null }
                    {!!newMarker ?
                        <Marker {...props}   title="New Bird Sighting" coordinate={newMarker} onPress={() => {
                            props.navigation.navigate({
                                routeName: 'AddEntry', params: {
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

// StaticMap.navigationOptions = (navigationData) => {
//     return {
//         headerTitle: "Map View",
//     }
// }

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
