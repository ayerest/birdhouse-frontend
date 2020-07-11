import { SET_MY_LOCATION } from '../actions/location';

const initialState = {
    myLocation: null,
}

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_LOCATION:
            return {
                ...state,
                myLocation: action.newLoc
            };
        default:
            return state;
    }
}

export default locationReducer;