import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, Platform, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import uuid from 'uuid';
import * as birdsActions from '../store/actions/birds';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import Card from '../components/Card';
import * as audioActions from '../store/actions/audio'


const BirdDetailsScreen = props => {
    console.log(props.navigation.getParam('onComingBack'))
    // const [playingAudio, setPlayingAudio] = useState(false);
    // const [currentSound, setCurrentSound] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadBird = async () => {
            // let birdId = props.navigation.birdId
            const birdId = props.navigation.getParam('birdId')
            dispatch(birdsActions.getBird(birdId));
        }
        loadBird();
    }, [dispatch, singleBird]);

    const singleBird = useSelector(state => {
        return state.birds.singleBird
    })

    // const handlePlayingMultiAudio = async (soundObject) => {
    //     if (playingAudio) {
    //         console.log("what now")
    //         // console.log(currentSound)
    //         console.log((currentSound === soundObject))
    //         await currentSound.stopAsync();

    //     }
    //     setCurrentSound(soundObject)
    //     soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
    //     await soundObject.playAsync();

    //     // setPlayingAudio(true);
    //     console.log(soundObject.onPlaybackStatus)
    // }

    // const _onPlaybackStatusUpdate = (playbackStatus) => {
    //     if (!playbackStatus.isLoaded) {
    //         // Update your UI for the unloaded state
    //         console.log("is not loaded!")
    //         if (playbackStatus.error) {
    //             console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
    //             // Send Expo team the error on Slack or the forums so we can help you debug!
    //         }
    //     } else {
    //         // Update your UI for the loaded state

    //         if (playbackStatus.isPlaying) {
    //             // Update your UI for the playing state
    //             console.log("is playing!")
    //             setPlayingAudio(true);

    //         } else {
    //             // Update your UI for the paused state
    //             // soundObject.playAsync();
    //             setPlayingAudio(false);

    //         }

    //         if (playbackStatus.isBuffering) {
    //             // Update your UI for the buffering state
    //             console.log("is buffering!")
    //             setPlayingAudio(true);

    //         }

    //         if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
    //             // The player has just finished playing and will stop. Maybe you want to play something else?
    //             console.log("is finished!")
    //             setPlayingAudio(false);
    //         }

    //     }
    // }

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
    

    return (
        <View style={styles.screen}>
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