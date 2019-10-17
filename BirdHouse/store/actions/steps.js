import { base } from './base_url'

export const getMySteps = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`http://${base}/steps`, {
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
            console.log(stepsData, "what did I get back?")

            dispatch({ type: 'GET_STEPS', mySteps: stepsData })
        } catch (err) {
            throw err;
        }
    }
}


export const updateSteps = (steps) => {
    console.log(steps)
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`http://${base}/steps`, {
                method: "PATCH",
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
            console.log(stepsData, "did I get data back?")

            dispatch({ type: 'UPDATE_STEPS', steps: stepsData })
        } catch (err) {
            throw err;
        }
    }
}