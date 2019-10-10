// fetch post request for sign up goes here

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
                throw new Error("Sign up did not complete successfully.")
            }

            const signupData = await response.json();
            dispatch({ type: "SIGNUP", payload: signupData})
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
                throw new Error("Login unsuccessful. Please try again.")
            }

            const loginData = await response.json();
            dispatch({ type: "LOGIN", payload: loginData })
        }
    }
}

export const logout = (currentuser) => {
   return {type: "LOGOUT", payload: currentuser}
}
