import { base } from './base_url'

export const getFact = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        try {
            const response = await fetch(`http://${base}/factoids`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })

            if (!response.ok) {
                throw new Error("error in steps action")
            }

            const fact = await response.json();

            return dispatch({ type: 'GET_FACT', fact: fact })
        } catch (err) {
            throw err;
        }
    }
}