//need to import data with entries
const initialState = {
    entries: [],
    filteredEntries: [],
    favoriteEntries: []
}

const entriesReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CREATE_FIELD_ENTRY":
            return {
                ...state, 
                entries: state.entries.concat(action.entry)
            };
        default:
            return state;
    }
}

export default entriesReducer;