import { SET_BIRDS, SET_CATEGORIES, GET_BIRD, MY_BIRDS, SEARCH_BIRDS } from '../actions/birds'

const initialState = {
    birdCategories: [],
    categoryBirds: [],
    filteredBirds: [],
    myBirds: [],
    singleBird: [],
    currentBirds: []
}

const birdsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                birdCategories: action.birdCategories
            };
        case SET_BIRDS:
            return {
                ...state,
                categoryBirds: action.categoryBirds,
                currentBirds: action.categoryBirds
            }
        case SEARCH_BIRDS:
            return {
                ...state,
                filteredBirds: action.filteredBirds,
                currentBirds: action.categoryBirds
            }
        case MY_BIRDS:
            return {
                ...state,
                myBirds: action.myBirds,
                currentBirds: action.categoryBirds
            }
        case GET_BIRD:
            return {
                ...state,
                singleBird: action.singleBird
            }
        default:
            return state;
    }
}

export default birdsReducer;