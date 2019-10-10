import SET_BIRDS from '../actions/birds'

const initialState = {
    birds: [],
    filteredBirds: [1, 2, 3],
    favoriteBirds: []
}

const birdsReducer = (state = initialState, action) => {
    // console.log(action.birds)
    switch(action.type) {
        case 'SET_BIRDS':
            return {
                birds: action.birds
            };
        default:
            return state;
    }
}

export default birdsReducer;