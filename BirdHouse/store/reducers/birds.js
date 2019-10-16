// import SET_BIRDS from '../actions/birds'

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
        case 'SET_CATEGORIES':
            return {
                ...state,
                birdCategories: action.birdCategories
            };
        case "SET_BIRDS":
            // console.log("in reducer", action.categoryBirds)
            return {
                ...state,
                categoryBirds: action.categoryBirds,
                currentBirds: action.categoryBirds
            }
        case "SEARCH_BIRDS":
            return {
                ...state,
                filteredBirds: action.filteredBirds,
                currentBirds: action.categoryBirds
            }
        case "MY_BIRDS":
            return {
                ...state,
                myBirds: action.myBirds,
                currentBirds: action.categoryBirds
            }
        case "GET_BIRD":
            return {
                ...state,
                singleBird: action.singleBird
            }
        default:
            return state;
    }
}

export default birdsReducer;