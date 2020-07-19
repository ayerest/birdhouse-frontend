import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Platform, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MenuButton from '../components/MenuButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';
import uuid from 'uuid';
import * as entriesActions from '../store/actions/entries';
import EntryCard from '../components/EntryCard';
import MapView, { Marker } from 'react-native-maps';
import AvatarButton from '../components/AvatarButton';

const FieldEntriesScreen = props => {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [mapRegion, setMapRegion] = useState(null);
    const [displayIndex, setDisplayIndex] = useState(0);
    const dispatch = useDispatch();
    const fieldEntriesList = useSelector((state) => state.entries.entries);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            setIsLoading(true);
            loadMyFieldEntries();
        }
        return () => mounted = false;
    }, [dispatch]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            handleLeaving();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const subscribe = navigation.addListener('focus', () => {
            handlePageLoad();
        });

        return subscribe;
    }, [navigation]);

    const loadMyFieldEntries = async () => {
        setIsLoading(true);
        await dispatch(entriesActions.getMyEntries());
        setIsLoading(false);
    }

    const handlePageLoad = () => {
        loadMyFieldEntries();
    }

    const renderFieldEntryItem = (fieldentry) => {
        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    navigation.navigate({
                        name: 'Bird Sighting', 
                        params: {
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
                navigation.navigate({
                    name: 'Bird Sighting', params: {
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

    const loadMoreEntries = async () => {
        const indexDiff = fieldEntriesList.length - (displayIndex + 10);
        if (fieldEntriesList.length < 10 || indexDiff === 0) {
            Alert.alert("You do have any older bird sightings")
        } else if (indexDiff < 10) {
            setDisplayIndex(displayIndex + indexDiff);
        } else {
            setDisplayIndex(displayIndex + 10);
        }
    }

    const loadRecentEntries = () => {
        setDisplayIndex(0);
    }

    const handleLeaving = () => {
        setDisplayIndex(0);
    }

    return (
        // if loading, display spinner, otherwise if no entries, say as much or display entries and map option
        <View style={styles.screen}>
            {isLoading ? <ActivityIndicator size="large" color={Colors.linkColor} /> : 
            fieldEntriesList.length === 0 ? <Text style={styles.label}>You haven't posted any bird sightings yet!</Text> : !showMap ? <View>
                <Button title="Show My Sightings on the Map!" onPress={showOnMapHandler} />
                <View style={styles.row}>
                    <Button style={styles.older} title="Older" onPress={loadMoreEntries} />
                    {displayIndex > 0 ? <Button  title="Recent" onPress={loadRecentEntries} /> : null }
                </View>
                <FlatList keyExtractor={(item, index) => uuid()} data={fieldEntriesList.slice(displayIndex, displayIndex + 10)} renderItem={renderFieldEntryItem} numColumns={1} />
                </View> : <View style={styles.mapContainer}>
                    <Button title="Hide Map" onPress={hideMapHandler} />
                    <MapView style={styles.map} region={mapRegion}>
                        {renderMarkers()}
                    </MapView>
            </View>
            }
        </View>
    )
}

export const screenOptions = navData => {
    let leftOption = (<HeaderButtons HeaderButtonComponent={MenuButton}>
        <Item title="Menu" iconName={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
            onPress={() => { navData.navigation.toggleDrawer() }} />
    </HeaderButtons>)
    return {
        headerTitle: "My Bird Sightings",
        headerLeft: () => leftOption,
        headerRight: () => (
            <AvatarButton handleClick={() => {
                navData.navigation.navigate({
                    name: 'MyAccount', params: {
                    }
                })
        }} />)
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapContainer: {
        height: '98%',
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
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
    },
    older: {
        // justifyContent: 'center',
    }
})

export default FieldEntriesScreen;








