import { base1 } from '../../env';

const MY_BADGES = 'MY_BADGES'

const getMyBadges = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`${base1}/badges`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": user,
                })
            })

            if (!response.ok) {
                throw new Error("error in entries action")
            }

            const badgesData = await response.json();

            dispatch({ type: MY_BADGES, myBadges: badgesData })
        } catch (err) {
            throw err;
        }
    }
}

export {
    getMyBadges,
    MY_BADGES,
}