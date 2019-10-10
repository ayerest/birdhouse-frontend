export const SET_BIRDS = 'SET_BIRDS'

export const fetchBirds = () => {
    return async dispatch => {
        const response = await fetch('http://localhost:3000/birds')
        const birdData = await response.json();

        
        console.log(birdData.length)
        dispatch({ type: 'SET_BIRDS', birds: birdData })
    }
}