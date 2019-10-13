// import SET_BIRDS from '../actions/birds'

const initialState = {
    birdCategories: [],
    categoryBirds: [],
    filteredBirds: []
}

const birdsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CATEGORIES':
            return {
                birdCategories: action.birdCategories
            };
        case "SET_BIRDS":
            return {
                categoryBirds: action.categoryBirds
            }
        case "SEARCH_BIRDS":
            return {
                filteredBirds: action.filteredBirds
            }
        default:
            return state;
    }
}

export default birdsReducer;