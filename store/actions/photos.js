import { base1 } from '../../env';

const MY_PHOTOS = 'MY_PHOTOS';

const getMyPhotos = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`${base1}/images`, {
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

            const photosData = await response.json();

            dispatch({ type: MY_PHOTOS, myPhotos: photosData })
        } catch (err) {
            throw err;
        }
    }
}

export {
    MY_PHOTOS,
    getMyPhotos,
}