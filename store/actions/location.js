const SET_MY_LOCATION = 'SET_MY_LOCATION';

const setMyLocation = (coords) => {
    return { type: 'SET_MY_LOCATION', newLoc: coords }
};

export {
    SET_MY_LOCATION,
    setMyLocation,
}