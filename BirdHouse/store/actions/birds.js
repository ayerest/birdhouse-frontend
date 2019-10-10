export const SET_BIRDS = 'SET_BIRDS'

export const fetchBirds = () => {
    return async dispatch => {
        try {

            const response = await fetch('http://localhost:3000/birds')

            if (!response.ok) {
                throw new Error("error")
            }

            const birdData = await response.json();
    
            
            dispatch({ type: 'SET_BIRDS', birds: birdData })
        } catch(err) {
            throw err;
        }
    }
}