import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, Platform, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import uuid from 'uuid';
import * as birdsActions from '../store/actions/birds';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';


const BirdDetailsScreen = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        const loadBird = async () => {
            // let birdId = props.navigation.birdId
            const birdId = props.navigation.getParam('birdId')
            console.log(props, "props in bird details")
            console.log(birdId)
            dispatch(birdsActions.getBird(birdId));
        }
        loadBird();
    }, [dispatch, singleBird]);

    const singleBird = useSelector(state => {
        // console.log(state.birds.singleBird, "single bird")
        return state.birds.singleBird
    })

    const handlePlayAudio = async () => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync({uri: singleBird.birdcall});
            await soundObject.playAsync();
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    }

    return (
        <View style={styles.screen}>
            <ScrollView>
                <Text>The Bird Details Screen!</Text>
                
                <View>
                    <Text>{singleBird.common_name}</Text>
                    <Feather name="volume-2" size={25} onPress={handlePlayAudio} />
                    <View styles={styles.row}>
                        <View>
                            <Image style={styles.image} source={{uri: singleBird.img_url}}></Image>
                            <Image style={styles.image} source={{ uri: singleBird.range_map}}></Image>
                        </View>
                        <Text>{singleBird.details}</Text>
                    </View>
                    <Button title="Go Back" onPress={() => {props.navigation.goBack()}} />
                </View>
                
            </ScrollView>
        </View>
    )
}

BirdDetailsScreen.navigationOptions = (navigationData) => {
    // console.log(navigationData)
    const bird_name = navigationData.navigation.getParam('birdName')

    return {
        headerTitle: bird_name,
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 200,
        width: 200
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
})

export default BirdDetailsScreen;