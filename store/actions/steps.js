import { base1 } from '../../env';

const GET_STEPS = 'GET_STEPS';
const NEW_STEPS = 'NEW_STEPS';
const UPDATE_STEPS = 'UPDATE_STEPS';

const getMySteps = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`${base1}/steps`, {
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
                throw new Error("error in steps action")
            }

            const stepsData = await response.json();

            dispatch({ type: GET_STEPS, mySteps: stepsData })
        } catch (err) {
            throw err;
        }
    }
}

const currentSteps = (steps) => {
    return { type: NEW_STEPS, newSteps: steps }
}

const updateSteps = (steps) => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`${base1}/my_steps`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": user,
                    "steps": steps
                })
            })

            if (!response.ok) {
                throw new Error("error in steps action")
            }

            const stepsData = await response.json();
            dispatch({ type: UPDATE_STEPS, steps: stepsData })
        } catch (err) {
            throw err;
        }
    }
}

export {
    GET_STEPS,
    getMySteps,
    NEW_STEPS,
    currentSteps,
    UPDATE_STEPS,
    updateSteps,
}