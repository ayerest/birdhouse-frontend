import { MY_BADGES } from '../actions/badges';

const initialState = {
    myBadges: []
}

const badgesReducer = (state = initialState, action) => {
    switch (action.type) {
        case MY_BADGES:
            return {
                ...state,
                myBadges: action.myBadges
            };
        default:
            return state;
    }
}

export default badgesReducer;