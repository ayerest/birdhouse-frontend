const initialState = {
    user: null,
    token: null
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SIGNUP':
            return {
                user: action.payload.user,
                token: action.payload.jwt
            }
        case 'LOGIN':
            return {
                user: action.payload.user,
                token: action.payload.jwt
            }
        case "AUTHENTICATE":
            // console.log("auth reducer", action.payload.user)
            return {
                user: action.payload.user,
                token: action.payload.token
            }
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}

export default authReducer;