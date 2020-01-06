//need to import data with entries
const initialState = {
    entries: [],
    filteredEntries: [],
    sharedEntries: []
}

const entriesReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CREATE_FIELD_ENTRY":
            return {
                ...state, 
                entries: state.entries.concat(action.entry)
            };
        case "MY_ENTRIES":
            return {
                ...state,
                entries: action.entries
            }
        case "SHARED_ENTRIES":
            return {
                ...state,
                sharedEntries: action.entries
            }
        case "DISMISS": 
            return {
                ...state,
                sharedEntries: []
            }
        default:
            return state;
    }
}

export default entriesReducer;