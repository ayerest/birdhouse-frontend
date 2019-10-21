import React, { useState } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';
import uuid from 'uuid';
import BirdCard from './BirdCard';
// import { useFocusEffect } from 'react-navigation-hooks';


const AudioPlayer = (props) => {


    const [playingAudio, setPlayingAudio] = useState(false);
    const [currentSound, setCurrentSound] = useState(null)

    const handlePlayAudio = async (soundObject) => {
        if (playingAudio) {
            console.log("what now")
            // console.log(currentSound)
            console.log((currentSound === soundObject))
            await currentSound.stopAsync();

        }
        setCurrentSound(soundObject)
        soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
        await soundObject.playAsync();

        // setPlayingAudio(true);
        console.log(soundObject.onPlaybackStatus)
    }

    const _onPlaybackStatusUpdate = (playbackStatus) => {
        if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            console.log("is not loaded!")
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                // Send Expo team the error on Slack or the forums so we can help you debug!
            }
        } else {
            // Update your UI for the loaded state

            if (playbackStatus.isPlaying) {
                // Update your UI for the playing state
                console.log("is playing!")
                setPlayingAudio(true);

            } else {
                // Update your UI for the paused state
                // soundObject.playAsync();
                setPlayingAudio(false);

            }

            if (playbackStatus.isBuffering) {
                // Update your UI for the buffering state
                console.log("is buffering!")
                setPlayingAudio(true);

            }

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                // The player has just finished playing and will stop. Maybe you want to play something else?
                console.log("is finished!")
                setPlayingAudio(false);
            }

        }
    }


}

export default AudioPlayer;