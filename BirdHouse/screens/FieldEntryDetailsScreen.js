import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import uuid from 'uuid';
import Card from '../components/Card';
// import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';


const FieldEntryDetailsScreen = props => {

    console.log(props.navigation.state.params.entry.notes)
    const renderFieldEntryImage = (image) => {
        return <View>
            <Image style={styles.image} source={{uri: image.item.img_url}}/>
        </View>
    }

    return (
        <View style={styles.screen}>

        <Card>
            <ScrollView >
                    <Text style={styles.right}>{props.navigation.state.params.entry.date.slice(0, 10)}</Text>
                    <View style={styles.center}>
                        <TouchableOpacity style={styles.imageContainer} onPress={() => {
                            props.navigation.navigate({
                                routeName: 'BirdStuff', params: {
                                    birdId: props.navigation.state.params.entry.bird.id,
                                    birdName: props.navigation.state.params.entry.bird.common_name,
                                }
                            })}}>

                            <Text>{props.navigation.state.params.entry.bird.common_name}</Text>
                            {props.navigation.state.params.entry.images.length > 0 ? 
                                <FlatList keyExtractor={(item, index) => uuid()} data={props.navigation.state.params.entry.images} renderItem={renderFieldEntryImage} numColumns={1} /> : <Image style={styles.image} source={require('../assets/images/birdicon.png')}></Image>
                            }
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.label}>Notes:</Text>
                        <Text>{props.navigation.state.params.entry.notes}</Text>
                    </View>
                    <View style={styles.mapContainer}>
                        <MapView style={styles.map} region={{
                            latitude: props.navigation.state.params.entry.latitude,
                            longitude: props.navigation.state.params.entry.longitude,
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.03}}>
                            <Marker coordinate={{latitude: props.navigation.state.params.entry.latitude, longitude: props.navigation.state.params.entry.longitude}}>
                            <Image style={{ height: 50, width: 50 }} source={require('../assets/images/birdicon.png')} />
                            </Marker>
                        </MapView>
                        {/* <Image source={{ uri: this.state.mapSnapshot.uri }} /> */}
                        {/* <TouchableOpacity onPress={this.takeSnapshot}>
                            Take Snapshot
                        </TouchableOpacity> */}
                    </View>
                </ScrollView>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    image: {
        width: Dimensions.get('window').width * .8,
        height: Dimensions.get('window').height * 0.3,
        resizeMode: 'contain'
    }, 
    map: {
        flex: 1
    },
    mapContainer: {
        height: '100%',
        width: '100%'
    },
    center: {
        alignItems: 'center'
    },
    right: {
        alignSelf: 'flex-end'
    },
    imageContainer: {
        width: '80%',
        height: '100%'
    }
})

export default FieldEntryDetailsScreen;