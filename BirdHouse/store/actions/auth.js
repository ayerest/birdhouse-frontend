// fetch post request for sign up goes here
import {AsyncStorage} from 'react-native';
export const signup = (username, password, avatar) => {
    if (!!avatar) {
        return async dispatch => {
            const response = await fetch('http://localhost:3000/users', {
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
            const expirationDate = new Date().getTime() + 60000
            persistDataToStorage(signupData.jwt, signupData.user, expirationDate)
        }
    } else {
        return async dispatch => {
            const response = await fetch('http://localhost:3000/login', {
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
                console.log("error from login", errorData)
                const errorType = errorData.message
                throw new Error(errorType)
            }

            const loginData = await response.json();
            console.log("data back from auth", loginData)
            dispatch({ type: "LOGIN", payload: loginData })
            const expirationDate = new Date().getTime() + 60000
            persistDataToStorage(loginData.jwt, loginData.user, expirationDate)
        }
    }
}

export const logout = () => {
   return {type: "LOGOUT"}
}

const persistDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem("userData", JSON.stringify({
        token: token,
        userId: userId,
    }))
}