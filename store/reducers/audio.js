import { PLAY_AUDIO, STOP_AUDIO } from '../actions/audio';

const initialState = {
    currentSound: null,
    playingAudio: false
}

const audioReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAY_AUDIO:
            return {
                ...state,
                currentSound: action.audio,
                playingAudio: true
            };
        case STOP_AUDIO:
            return {
                ...state,
                currentSound: null,
                playingAudio: false
            }
        default:
            return state;
    }
}

export default audioReducer;