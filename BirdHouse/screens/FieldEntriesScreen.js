import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Platform, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MenuButton from '../components/MenuButton';
import Colors from '../constants/Colors';
import uuid from 'uuid';
import * as entriesActions from '../store/actions/entries';
import EntryCard from '../components/EntryCard';
import MapView, { Marker } from 'react-native-maps';
import AvatarButton from '../components/AvatarButton';




const FieldEntriesScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [mapRegion, setMapRegion] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        const loadMyFieldEntries = async () => {
            setIsLoading(true);
            await dispatch(entriesActions.getMyEntries());
            setIsLoading(false);
        }
        loadMyFieldEntries();
    }, [dispatch, fieldEntriesList]);

    const fieldEntriesList = useSelector(state => {
        return state.entries.entries
    })

    const renderFieldEntryItem = (fieldentry) => {
        return (
            
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'FieldEntry', params: {
                            entryId: fieldentry.item.id,
                            entryName: `${fieldentry.item.date}`,
                            entry: fieldentry.item
                        }
                    })
                }}
                >
                <EntryCard notes={fieldentry.item.notes} fieldentry={fieldentry.item}/>
            </TouchableOpacity> 
        )
    }

    const getNewMapRegion = (points) => {
        // points should be an array of { latitude: X, longitude: Y }
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
    }

    const renderMarkers = () => {
        return fieldEntriesList.map(entry => {
            return (<Marker key={entry.id} {...props} title="My Sighting" coordinate={{ latitude: entry.latitude, longitude: entry.longitude }} onPress={() => {
                props.navigation.navigate({
                    routeName: 'EntryInfo', params: {
                        entry: entry
                    }
                })
            }}>
                <Image style={{ height: 50, width: 50 }} source={require('../assets/images/birdicon.png')} />
            </Marker>)
        })
    }

    const showOnMapHandler = () => {
        let points = fieldEntriesList.map(entry => {
            return { latitude: entry.latitude, longitude: entry.longitude }
        })
        if (points.length == 0) {
            return;
        } else {

            getNewMapRegion(points);
            setShowMap(true);
        }
    }

    const hideMapHandler = () => {
        setShowMap(false);
    }

    return (
            <View style={styles.screen}>
                {!isLoading && fieldEntriesList.length == 0 ? <Text style={styles.label}>You haven't posted any bird sightings yet!</Text> : null}
                {!isLoading ? !showMap ? 
                
                <Button title="Show My Sightings on the Map!" onPress={showOnMapHandler} /> :
                <Button title="Hide Map" onPress={hideMapHandler} />  : null }
                {showMap && !!mapRegion ? 
                    <View style={styles.mapContainer}>
                        <MapView style={styles.map} region={mapRegion}>
                            {renderMarkers()}
                        </MapView>
                    </View>
                : null}
                {isLoading ? <ActivityIndicator size="large" /> : <FlatList keyExtractor={(item, index) => uuid()} data={fieldEntriesList} renderItem={renderFieldEntryItem} numColumns={1} />}
            </View>
    )
}

FieldEntriesScreen.navigationOptions = navData => {
    const user = navData.navigation.getParam('user')
    console.log("user in field entries", navData)

    return {
        headerTitle: "My Field Entries",
        headerStyle: {
            backgroundColor: Platform.OS === "ios" ? Colors.myColor : "thistle",
            color: "black"
        },
        headerLeft: <HeaderButtons HeaderButtonComponent={MenuButton}>
            <Item title="Menu" iconName={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                onPress={() => { navData.navigation.toggleDrawer() }} />
        </HeaderButtons>,
        headerRight: (
            <AvatarButton handleClick={() => {
                navData.navigation.navigate({
                    routeName: 'MyAccount', params: {
                    }
                })
            }} />
        )
    }
}
            {/* <TouchableOpacity onPress={() => {
                navData.navigation.navigate({
                    routeName: 'MyAccount', params: {
                        user: user
                    }
                })
            }}>
                {user ?
                    <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={{ uri: user.avatar }} /> : <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={require('../assets/images/birdicon.png')} />}
            </TouchableOpacity> */}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapContainer: {
        height: '92%',
        width: '100%',
    },
    map: {
        flex: 1
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginRight: 10,
        alignSelf: "center",
        fontFamily: 'Roboto-Condensed',
    }
})

export default FieldEntriesScreen;








