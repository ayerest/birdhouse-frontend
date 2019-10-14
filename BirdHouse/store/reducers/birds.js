// import SET_BIRDS from '../actions/birds'

const initialState = {
    birdCategories: [],
    categoryBirds: [],
    filteredBirds: [],
    myBirds: []
}

const birdsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CATEGORIES':
            return {
                ...state,
                birdCategories: action.birdCategories
            };
        case "SET_BIRDS":
            console.log("in reducer", action.categoryBirds)
            return {
                ...state,
                categoryBirds: action.categoryBirds
            }
        case "SEARCH_BIRDS":
            return {
                ...state,
                filteredBirds: action.filteredBirds
            }
        case "MY_BIRDS":
            return {
                ...state,
                myBirds: action.myBirds
            }
        default:
            return state;
    }
}

export default birdsReducer;