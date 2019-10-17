import { AsyncStorage } from 'react-native';
import { base } from './base_url'


export const getMyBadges = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`http://${base}/badges`, {
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
                throw new Error("error in entries action")
            }

            const badgesData = await response.json();
            // console.log(badgesData, "did I get data back?")

            dispatch({ type: 'MY_BADGES', myBadges: badgesData })
        } catch (err) {
            throw err;
        }
    }
}