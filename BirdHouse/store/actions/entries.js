import { AsyncStorage } from 'react-native';
import { base } from './base_url'


export const postNewEntry = (date, bird, notes, image, latitude, longitude, share) => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`http://${base}/field_entries`, {
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
                console.log(errorData)
                const errorType = errorData.message
                throw new Error("You must select a bird using the search bar to submit your sighting!")
            }

            const entryData = await response.json();


            dispatch({ type: 'CREATE_FIELD_ENTRY', entry: entryData })
        } catch (err) {
            throw err;
        }
    }
}

export const getMyEntries = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`http://${base}/entries`, {
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

            dispatch({ type: 'MY_ENTRIES', entries: entriesData })
        } catch (err) {
            throw err;
        }
    }
}

export const getSharedEntries = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`http://${base}/shared_entries`, {
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
            dispatch({ type: 'SHARED_ENTRIES', entries: entriesData })
        } catch (err) {
            throw err;
        }
    }
}


export const dismissSharedEntries = () => {
    return { type: "DISMISS" }
}