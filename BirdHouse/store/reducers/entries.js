//need to import data with entries
const initialState = {
    entries: [1,2,3],
    filteredEntries: [1,2,3],
    favoriteEntries: []
}

const entriesReducer = (state = initialState, action) => {
    return state;
}

export default entriesReducer;