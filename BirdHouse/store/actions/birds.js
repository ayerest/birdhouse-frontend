// export const SET_BIRDS = 'SET_BIRDS'

export const fetchBirdCategories = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        try {
            const response = await fetch('http://localhost:3000/birds', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error("error")
            }

            const categoriesData = await response.json();
            
            dispatch({ type: 'SET_CATEGORIES', birdCategories: categoriesData })
        } catch(err) {
            throw err;
        }
    }
}

export const fetchBirds = (category) => {
    // console.log(category, "category in fetch?")
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch('http://localhost:3000/birds', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "category": category,
                    "user": user
                })
            })

            if (!response.ok) {
                throw new Error("error")
            }

            const birdData = await response.json();
            // console.log("json rendering", birdData)

            dispatch({ type: 'SET_BIRDS', categoryBirds: birdData })
        } catch (err) {
            throw err;
        }
    }
}



export const getBird = (birdId) => {
    // console.log(birdId, "bird ID in fetch?")
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`http://localhost:3000/birds/${birdId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })

            if (!response.ok) {
                throw new Error("error")
            }

            const birdData = await response.json();
            // console.log("coming back from fetch", birdData)

            dispatch({ type: 'GET_BIRD', singleBird: birdData })
        } catch (err) {
            throw err;
        }
    }
}



export const searchBirds = (searchTerm) => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch('http://localhost:3000/bird_entries', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "searchTerm": searchTerm,
                    "user": user
                })
            })

            if (!response.ok) {
                throw new Error("error")
            }

            const birdData = await response.json();

            dispatch({ type: 'SEARCH_BIRDS', filteredBirds: birdData })
        } catch (err) {
            throw err;
        }
    }
}


export const getMyBirds = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch('http://localhost:3000/bird_images', {
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
                throw new Error("error")
            }

            const birdData = await response.json();

            dispatch({ type: 'MY_BIRDS', myBirds: birdData })
        } catch (err) {
            throw err;
        }
    }
}