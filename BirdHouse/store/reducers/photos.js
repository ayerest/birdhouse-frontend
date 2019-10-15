
const initialState = {
    myPhotos: []
}

const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MY_PHOTOS':
            return {
                ...state,
                myPhotos: action.myPhotos
            };
        default:
            return state;
    }
}

export default photosReducer;