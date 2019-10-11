//need to import data with entries
const initialState = {
    entries: [],
    filteredEntries: [],
    favoriteEntries: []
}

const entriesReducer = (state = initialState, action) => {
    switch(action.type) {
        case "TEST":
            return "test";
        default:
            return state;
    }
}

export default entriesReducer;