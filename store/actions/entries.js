import { base1 } from '../../env';

const CREATE_FIELD_ENTRY = 'CREATE_FIELD_ENTRY';
const MY_ENTRIES = 'MY_ENTRIES';
const DISMISS = 'DISMISS';
const SHARED_ENTRIES = 'SHARED_ENTRIES';

const postNewEntry = (date, bird, notes, image, latitude, longitude, share) => {
    return async (dispatch, getState) => {
        const token = getState().user.token;
        const user = getState().user.user;
        try {
            const response = await fetch(`${base1}/field_entries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "user": user,
                    "date": date,
                    "bird": bird,
                    "notes": notes,
                    "image": image,
                    "latitude": latitude,
                    "longitude": longitude,
                    "share": share
                })
            })

            if (!response.ok) {
                const errorData = await response.json();
                const errorType = errorData.message;
            }

            const entryData = await response.json();

            dispatch({ type: CREATE_FIELD_ENTRY, entry: entryData });
        } catch (err) {
            throw err;
        }
    }
}

const getMyEntries = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token;
        const user = getState().user.user;
        try {
            const response = await fetch(`${base1}/entries`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": user
                })
            })

            if (!response.ok) {
                throw new Error("error in entries action")
            }

            const entriesData = await response.json();

            dispatch({ type: MY_ENTRIES, entries: entriesData })
        } catch (err) {
            throw err;
        }
    }
}

const getSharedEntries = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token;
        const user = getState().user.user;
        try {
            const response = await fetch(`${base1}/shared_entries`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": user
                })
            })

            if (!response.ok) {
                throw new Error("error in entries action")
            }

            const entriesData = await response.json();
            dispatch({ type: SHARED_ENTRIES, entries: entriesData })
        } catch (err) {
            throw err;
        }
    }
}


const dismissSharedEntries = () => {
    return { type: "DISMISS" }
}

export {
    CREATE_FIELD_ENTRY,
    postNewEntry,
    MY_ENTRIES,
    getMyEntries,
    SHARED_ENTRIES,
    getSharedEntries,
    dismissSharedEntries,
    DISMISS,
}