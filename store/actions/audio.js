const STOP_AUDIO = 'STOP_AUDIO';
const PLAY_AUDIO = 'PLAY_AUDIO';

const stopAudio = () => async (dispatch, getState) => {
  const { currentSound } = getState().audio;
  const { playingAudio } = getState().audio;
  await currentSound.stopAsync();
  return dispatch({ type: 'STOP_AUDIO' });
};

const playAudio = (soundObject) => async (dispatch, getState) => {
  const { currentSound } = getState().audio;
  const { playingAudio } = getState().audio;
  if (playingAudio) {
    await currentSound.stopAsync();
    soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await soundObject.playAsync();
    return dispatch({ type: 'PLAY_AUDIO', audio: soundObject });
  }

  soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  await soundObject.playAsync();
  return dispatch({ type: 'PLAY_AUDIO', audio: soundObject });
};

const onPlaybackStatusUpdate = (playbackStatus) => async (dispatch, getState) => {
  const { currentSound } = getState().audio;
  const { playingAudio } = getState().audio;
  if (!playbackStatus.isLoaded) {
    // Update your UI for the unloaded state
    console.log('is not loaded!');
    if (playbackStatus.error) {
      console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
      // Send Expo team the error on Slack or the forums so we can help you debug!
    }
  } else {
    // Update your UI for the loaded state

    if (playbackStatus.isPlaying) {
      // Update your UI for the playing state
      console.log('is playing!');
      // setPlayingAudio(true);
    } else {
      // Update your UI for the paused state
      // soundObject.playAsync();
      // return dispatch({ type: 'STOP_AUDIO' })

    }

    if (playbackStatus.isBuffering) {
      // Update your UI for the buffering state
      console.log('is buffering!');
      // setPlayingAudio(true);
    }

    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
      // The player has just finished playing and will stop. Maybe you want to play something else?
      console.log('is finished!');
      return dispatch({ type: 'STOP_AUDIO' });
    }
  }
};

export {
  STOP_AUDIO,
  stopAudio,
  PLAY_AUDIO,
  playAudio,
};
