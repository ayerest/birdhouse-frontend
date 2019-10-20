import { AsyncStorage } from 'react-native';
import {base} from './base_url'


export const getMyPhotos = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const user = getState().user.user
        try {
            const response = await fetch(`http://${base}/images`, {
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

            dispatch({ type: 'MY_PHOTOS', myPhotos: photosData })
        } catch (err) {
            throw err;
        }
    }
}