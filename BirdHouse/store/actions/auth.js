// fetch post request for sign up goes here
import {AsyncStorage} from 'react-native';
import { base1 } from '../../env';

export const signup = (username, password, avatar) => {
    if (!!avatar) {
        return async dispatch => {
            const response = await fetch(`http://${base1}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: {
                    username: username,
                    password: password,
                    avatar: avatar
                    }
                })
            })
            if (!response.ok) {
                const errorData = await response.json();
                const errorType = errorData.error
                throw new Error(errorType)
            }

            const signupData = await response.json();
            dispatch({ type: "SIGNUP", payload: signupData})
            const expirationDate = new Date(new Date().getTime() + 1200000)
            persistDataToStorage(signupData.jwt, signupData.user, expirationDate)
        }
    } else {
        return async dispatch => {
            const response = await fetch(`http://${base1}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password,
                    }
                })
            })
            if (!response.ok) {
                const errorData = await response.json();
                const errorType = errorData.message
                throw new Error(errorType)
            }

            const loginData = await response.json();
            dispatch({ type: "LOGIN", payload: loginData })
            const expirationDate = new Date(new Date().getTime() + 12000000)
            persistDataToStorage(loginData.jwt, loginData.user, expirationDate)
        }
    }
}

export const logout = () => {
    //should I add logic to update steps at this point??
    removeDataFromStorage()
    return {type: "LOGOUT"}
}

export const authenticate = (userId, token) => {
    return {type: "AUTHENTICATE", payload: {user: userId, token: token}}
}

const persistDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem("userData", JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }))
}

const removeDataFromStorage = () => {
    AsyncStorage.clear();
}  