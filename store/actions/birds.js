import { base1 } from '../../env';

const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_BIRDS = 'SET_BIRDS';
const GET_BIRD = 'GET_BIRD';
const SEARCH_BIRDS = 'SEARCH_BIRDS';
const MY_BIRDS = 'MY_BIRDS';

const fetchBirdCategories = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        try {
            const response = await fetch(`${base1}/birds`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error("error")
            }

            const categoriesData = await response.json();
            
            dispatch({ type: SET_CATEGORIES, birdCategories: categoriesData })
        } catch(err) {
            throw err;
        }
    }
}

const fetchBirds = (category) => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`${base1}/birds`, {
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

            dispatch({ type: SET_BIRDS, categoryBirds: birdData })
        } catch (err) {
            throw err;
        }
    }
}

const getBird = (birdId) => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`${base1}/birds/${birdId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })

            if (!response.ok) {
                throw new Error("error")
            }

            const birdData = await response.json();

            dispatch({ type: GET_BIRD, singleBird: birdData })
        } catch (err) {
            throw err;
        }
    }
}

const searchBirds = (searchTerm) => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`${base1}/bird_entries`, {
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

            dispatch({ type: SEARCH_BIRDS, filteredBirds: birdData })
        } catch (err) {
            throw err;
        }
    }
}

const getMyBirds = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`${base1}/bird_images`, {
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

            dispatch({ type: MY_BIRDS, myBirds: birdData })
        } catch (err) {
            throw err;
        }
    }
}

export {
    MY_BIRDS,
    getMyBirds,
    SEARCH_BIRDS,
    searchBirds,
    GET_BIRD,
    getBird,
    SET_BIRDS,
    fetchBirds,
    SET_CATEGORIES,
    fetchBirdCategories,
}