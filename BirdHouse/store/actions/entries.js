
export const postNewEntry = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch('http://localhost:3000/fieldentries', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({

                })
            })

            if (!response.ok) {
                throw new Error("error")
            }

            const entryData = await response.json();


            dispatch({ type: 'CREATE_FIELD_ENTRY', entry: entryData })
        } catch (err) {
            throw err;
        }
    }
}

export const getFieldEntries = () => {

}