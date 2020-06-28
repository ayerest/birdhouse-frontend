import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import uuid from 'uuid';
import Card from '../components/Card';
import MapView, { Marker } from 'react-native-maps';
import AvatarButton from '../components/AvatarButton';
import moment from 'moment';
import Colors from '../constants/Colors';

const FieldEntryDetailsScreen = props => {

    const entryDate = moment(props.route.entry.date).format('MMMM Do YYYY, h:mm:ss a');

    const renderFieldEntryImage = (image) => {
        return <View>
            <Image style={styles.image} source={{uri: image.item.img_url}}/>
        </View>
    }

    return (

        <Card style={styles.screen}>
            <ScrollView contentContainerStyle={{paddingBottom: 300}}>
                    <Text style={styles.right}>{entryDate}</Text> 
                        <TouchableOpacity style={styles.imageContainer} onPress={() => {
                            if (props.navigation.state.name === 'FieldEntry') { 
                            props.navigation.navigate({
                                name: 'BirdStuff', params: {
                                    birdId: props.route.entry.bird.id,
                                    birdName: props.route.entry.bird.common_name,
                                    user: props.route.entry.user
                                }
                            })}
                            else {
                                props.navigation.navigate({
                                    name: 'BirdieInfo', params: {
                                        birdId: props.route.entry.bird.id,
                                        birdName: props.route.entry.bird.common_name,
                                        user: props.route.entry.user
                                    }
                                }) 
                            }}}>
                            <Text style={styles.birdDetails}>{props.route.entry.bird.common_name}</Text>
                            {props.route.entry.images.length > 0 ? 
                                <FlatList keyExtractor={(item, index) => uuid()} data={props.route.entry.images} renderItem={renderFieldEntryImage} numColumns={1} /> : <Image style={styles.image} source={require('../assets/images/birdicon.png')}></Image>
                            }
                        </TouchableOpacity>
                    <View style={styles.flex}>
                        <Text style={styles.notes}>Notes:</Text>
                        <Text style={styles.text}>{props.route.entry.notes}</Text>
                    </View>
                    <View style={styles.mapContainer}>
                        <MapView style={styles.map} region={{
                            latitude: props.route.entry.latitude,
                            longitude: props.route.entry.longitude,
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.03}}>
                            <Marker coordinate={{latitude: props.route.entry.latitude, longitude: props.route.entry.longitude}}>
                            <Image style={{ height: 50, width: 50 }} source={require('../assets/images/birdicon.png')} />
                            </Marker>
                        </MapView>
                    </View>
                </ScrollView>
            </Card>
    )
}

export const screenOptions = navData => {
    return {
        headerRight: () => (
            <AvatarButton handleClick={() => {
                navData.navigation.navigate({
                    name: 'MyAccount', params: {
                    }
                })
            }} />
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    image: {
        width: Dimensions.get('window').width * 0.85,
        height: Dimensions.get('window').height * 0.4,
        resizeMode: 'cover',
        borderRadius: 20,
        justifyContent: 'center',
        marginTop: 0
    }, 
    map: {
        height: '100%',
        width: '100%',
        flex: 1,
        borderRadius: 20,
    },
    mapContainer: {
        height: '80%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        fontFamily: 'Roboto-Condensed',
        fontSize: 18,
        padding: 2,
        alignSelf: 'center'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontFamily: 'Roboto-Condensed',
        fontSize: 18,
    },
    notes: {
        fontFamily: 'Roboto-Condensed',
        fontSize: 20,
        padding: 10,
    },
    birdDetails: {
        fontFamily: 'Roboto-Condensed',
        fontSize: 20,
        color: Colors.linkColor,
        padding: 10,
    },
    flex: {
        flex: 1,
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default FieldEntryDetailsScreen;