
import { GET_FACT } from '../actions/factoids';

const initialState = {
    fact: "",
}

const factoidsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FACT:
            return {
                ...state,
                fact: action.fact
            };
        default:
            return state;
    }
}

export default factoidsReducer;