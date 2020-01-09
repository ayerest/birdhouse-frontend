import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Platform, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MenuButton from '../components/MenuButton';
import Colors from '../constants/Colors';
import uuid from 'uuid';
import * as entriesActions from '../store/actions/entries';
import EntryCard from '../components/EntryCard';
import MapView, { Marker } from 'react-native-maps';
import AvatarButton from '../components/AvatarButton';
import { NavigationEvents } from 'react-navigation';

const FieldEntriesScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [mapRegion, setMapRegion] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadMyFieldEntries = async () => {
            setIsLoading(true);
            await dispatch(entriesActions.getMyEntries());
            setIsLoading(false);
        }
        loadMyFieldEntries();
    }, [dispatch, fieldEntriesList, displayedEntries]);

    const fieldEntriesList = useSelector(state => {
        return state.entries.entries;
    })
    const [displayIndex, setDisplayIndex] = useState(0);
    const [displayedEntries, setDisplayedEntries] = useState(fieldEntriesList.length > 0 && fieldEntriesList.length < 20 ? fieldEntriesList.slice(displayIndex) : fieldEntriesList.length >= 20 ? fieldEntriesList.slice(displayIndex, 20) : []);

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

    const loadMoreEntries = async () => {
        const indexDiff = fieldEntriesList.length - (displayIndex + 20);
        if (fieldEntriesList.length < 20 || indexDiff === 0) {
            Alert.alert("You do have any older bird sightings")
        } else if (indexDiff < 20) {
            setDisplayedEntries(fieldEntriesList.slice(displayIndex + indexDiff));
            setDisplayIndex(displayIndex + indexDiff);
        } else {
            const temp = displayIndex;
            setDisplayIndex(displayIndex + 20);
            setDisplayedEntries(fieldEntriesList.slice(temp + 20, temp + 40));
        }
    }

    const handleLeaving = () => {
        setDisplayIndex(0);
        setDisplayedEntries(fieldEntriesList.length > 0 && fieldEntriesList.length < 20 ? fieldEntriesList : fieldEntriesList.length >= 20 ? fieldEntriesList.slice(0, 20) : []);
    }

    return (
        // if loading, display spinner, otherwise if no entries, say as much or display entries and map option
            <View style={styles.screen}>
                <NavigationEvents
                    onWillBlur={handleLeaving}
                />
                {isLoading ? <ActivityIndicator size="large" /> : 
                fieldEntriesList.length === 0 ? <Text style={styles.label}>You haven't posted any bird sightings yet!</Text> : !showMap ? <View>
                    <Button title="Show My Sightings on the Map!" onPress={showOnMapHandler} />
                    <FlatList keyExtractor={(item, index) => uuid()} data={displayedEntries} renderItem={renderFieldEntryItem} numColumns={1} />
                    <Button style={styles.loadMore} title="Load older sightings" onPress={loadMoreEntries} />
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

FieldEntriesScreen.navigationOptions = navData => {
    let leftOption = (<HeaderButtons HeaderButtonComponent={MenuButton}>
        <Item title="Menu" iconName={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
            onPress={() => { navData.navigation.toggleDrawer() }} />
    </HeaderButtons>)
    if (navData.navigation.state.routeName === 'BirdieSightings') {
        return {
        headerTitle: "My Bird Sightings",
            headerStyle: {
            backgroundColor: Platform.OS === "ios" ? Colors.myColor : "thistle",
                color: "black"
        },
        headerRight: (
            <AvatarButton handleClick={() => {
                navData.navigation.navigate({
                    routeName: 'MyAccount', params: {
                    }
                })
            }} />)
        }
    } 
    else {
        return {
            headerTitle: "My Bird Sightings",
            headerStyle: {
                backgroundColor: Platform.OS === "ios" ? Colors.myColor : "thistle",
                color: "black"
            },
            headerLeft: leftOption,
            headerRight: (
                <AvatarButton handleClick={() => {
                    navData.navigation.navigate({
                        routeName: 'MyAccount', params: {
                        }
                    })
            }} />)
        }
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
    loadMore: {
        paddingBottom: 12,
        paddingTop: 12
    }
})

export default FieldEntriesScreen;








