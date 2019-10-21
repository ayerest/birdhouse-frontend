import { base } from './base_url'
import { AsyncStorage } from 'react-native';


// export const playAudio = (soundObject) => {
//     return dispatch({ type: 'PLAY_AUDIO', audio: soundObject })
// }

export const stopAudio = () => {
    return async (dispatch, getState) => {
        const currentSound = getState().audio.currentSound
        const playingAudio = getState().audio.playingAudio
        await currentSound.stopAsync();
        return dispatch({type: 'STOP_AUDIO'})
    }
}


export const playAudio = (soundObject) => {
   
    return async (dispatch, getState) => {
        const currentSound = getState().audio.currentSound
        const playingAudio = getState().audio.playingAudio
        if (!!playingAudio) {
            
            await currentSound.stopAsync();
            soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
            await soundObject.playAsync();
            return dispatch({ type: 'PLAY_AUDIO', audio: soundObject })
        } 
         else {
            soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
            await soundObject.playAsync();
            return dispatch({type: 'PLAY_AUDIO', audio: soundObject })
        }
    }
}

const _onPlaybackStatusUpdate = (playbackStatus) => {
    return async (dispatch, getState) => {
        const currentSound = getState().audio.currentSound
        const playingAudio = getState().audio.playingAudio
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
            // setPlayingAudio(true);

        } else {
            // Update your UI for the paused state
            // soundObject.playAsync();
            // return dispatch({ type: 'STOP_AUDIO' })

        }

        if (playbackStatus.isBuffering) {
            // Update your UI for the buffering state
            console.log("is buffering!")
            // setPlayingAudio(true);

        }

        if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            // The player has just finished playing and will stop. Maybe you want to play something else?
            console.log("is finished!")
            return dispatch({ type: 'STOP_AUDIO' })

        }

    }
}
}

