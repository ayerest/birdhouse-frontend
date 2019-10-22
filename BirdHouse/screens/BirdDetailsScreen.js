import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, Platform, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import uuid from 'uuid';
import * as birdsActions from '../store/actions/birds';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import Card from '../components/Card';
import * as audioActions from '../store/actions/audio';
import {NavigationEvents} from 'react-navigation';


const BirdDetailsScreen = props => {
   
    const dispatch = useDispatch();

    useEffect(() => {
        const loadBird = async () => {
            const birdId = props.navigation.getParam('birdId')
            dispatch(birdsActions.getBird(birdId));
        }
        loadBird();
    }, [dispatch, singleBird]);

    const singleBird = useSelector(state => {
        return state.birds.singleBird
    })

    const handlePlayAudio = async () => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync({uri: singleBird.birdcall});
            // handlePlayingMultiAudio(soundObject)
            await dispatch(audioActions.playAudio(soundObject))

            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    }

    const audio = useSelector(state => {
        return state.audio.currentSound
    })

    const handleBackButtonClick = async () => {
        
        if (props.navigation.getParam('onComingBack')) {
            const goBack = props.navigation.getParam('onComingBack');
            goBack();
        }
        await audio.stopAsync();
        props.navigation.goBack()
    }

    const handleLeaving = async () => {
        if (audio) {
            await audio.stopAsync();
            dispatch(audioActions.stopAudio)
        }
        props.navigation.goBack()
    }
    

    return (
        <View style={styles.screen}>
            <NavigationEvents
                
                onWillBlur={handleLeaving}
            />
            <ScrollView>                
                <Feather style={styles.center} name="volume-2" size={25} onPress={handlePlayAudio} />
                <Image style={styles.image} source={{uri: singleBird.img_url}}></Image> 
                <Card>
                    <Text>{singleBird.details}</Text>
                </Card>
                 
                {!!singleBird.range_map ?<Image style={styles.image} source={{ uri: singleBird.range_map}}></Image> : null}
                       
                <Button title="Go Back" onPress={handleBackButtonClick} />
                
            </ScrollView>
        </View>
    )
}

BirdDetailsScreen.navigationOptions = (navigationData) => {
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
        resizeMode: "cover",
        height: 300,
        width: '95%',
        alignSelf: "center",
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    center: {
        alignSelf: "center"
    }
})

export default BirdDetailsScreen;