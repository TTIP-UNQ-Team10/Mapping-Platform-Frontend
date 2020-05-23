export const USER_TYPES = {
    LOGIN_USER_SUCCESS_ACTION : "LOGIN_USER_SUCCESS_ACTION",
    LOGIN_USER_ERROR_ACTION : "LOGIN_USER_ERROR_ACTION",
    LOGOUT_USER_ACTION : "LOGOUT_USER_ACTION"
}

const initialUserState = {
    isLogged: false,
    user: {
        id: null,
        name: "",
        email: "",
        authToken: null
    }
}

export const getInitialUserState = () => initialUserState

export const user = (state = initialUserState, action) => {
    switch(action.type) {
        case USER_TYPES.LOGIN_USER_SUCCESS_ACTION: {
          return { isLogged: true, user: action.payload }
        }
        case USER_TYPES.LOGIN_USER_ERROR_ACTION: {
          return { user: { id: null, name: "", email: "", authToken: null }, isLogged: false }
        }
        case USER_TYPES.LOGOUT_USER_ACTION: {
          return { user: { id: null, name: "", email: "", authToken: null }, isLogged: false }
        }
        default:
            return state
    }
};
