
const initialState = {
    myTotalSteps: 0,
    myNewSteps: 0
}

const stepsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_STEPS':
            return {
                ...state,
                myTotalSteps: action.mySteps
            };
        case 'UPDATE_STEPS':
            return {
                ...state,
                myNewSteps: action.steps.newSteps,
                myTotalSteps: action.steps.totalSteps
            }
        case 'NEW_STEPS':
            return {
                ...state,
                myNewSteps: action.newSteps
            }
        default:
            return state;
    }
}

export default stepsReducer;