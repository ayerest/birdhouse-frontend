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
        case 'LOGOUT':
            return {
                user: null,
                token: null
            }
        default:
            return state;
    }
}

export default authReducer;