import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import uuid from 'uuid';
import Card from '../components/Card';
import MapView, { Marker } from 'react-native-maps';
import AvatarButton from '../components/AvatarButton';


const FieldEntryDetailsScreen = props => {

    const renderFieldEntryImage = (image) => {
        return <View>
            <Image style={styles.image} source={{uri: image.item.img_url}}/>
        </View>
    }

    return (

        <Card style={styles.screen}>
            <ScrollView contentContainerStyle={{paddingBottom: 50}}>
                    <Text style={styles.right}>{props.navigation.state.params.entry.date.slice(0, 10)}</Text> 
                        <TouchableOpacity style={styles.imageContainer} onPress={() => {
                            if (props.navigation.state.routeName === 'FieldEntry') { 
                            props.navigation.navigate({
                                routeName: 'BirdStuff', params: {
                                    birdId: props.navigation.state.params.entry.bird.id,
                                    birdName: props.navigation.state.params.entry.bird.common_name,
                                    user: props.navigation.state.params.entry.user
                                }
                            })}
                            else {
                                props.navigation.navigate({
                                    routeName: 'BirdieInfo', params: {
                                        birdId: props.navigation.state.params.entry.bird.id,
                                        birdName: props.navigation.state.params.entry.bird.common_name,
                                        user: props.navigation.state.params.entry.user
                                    }
                                }) 
                            }}}>

                            <Text style={styles.text}>{props.navigation.state.params.entry.bird.common_name}</Text>
                            {props.navigation.state.params.entry.images.length > 0 ? 
                                <FlatList keyExtractor={(item, index) => uuid()} data={props.navigation.state.params.entry.images} renderItem={renderFieldEntryImage} numColumns={1} /> : <Image style={styles.image} source={require('../assets/images/birdicon.png')}></Image>
                            }
                        </TouchableOpacity>
                    <View style={styles.flex}>
                        <Text style={styles.text}>Notes:</Text>
                        <Text style={styles.text}>{props.navigation.state.params.entry.notes}</Text>
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
                    </View>
                </ScrollView>
            </Card>
    )
}

FieldEntryDetailsScreen.navigationOptions = navData => {
    return {
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

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    image: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.3,
        resizeMode: 'contain',
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 0
    }, 
    map: {
        height: '100%',
        width: '100%',
        flex: 1
    },
    mapContainer: {
        height: '80%',
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        alignSelf: 'flex-end',
        fontFamily: 'Roboto-Condensed',
        fontSize: 18,
        padding: 2,
    },
    imageContainer: {
        width: '90%',
        height: '90%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontFamily: 'Roboto-Condensed',
        fontSize: 18,
    },
    flex: {
        flex: 1,
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FieldEntryDetailsScreen;