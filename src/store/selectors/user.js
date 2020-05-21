export const selectUserState = state => state.userState

export const selectUserIsLogged = state => selectUserState(state).isLogged

export const selectUserAuthToken = state => selectUserState(state).user.authToken
