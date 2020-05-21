import {
  USER_TYPES
} from '../reducers/user'

export const createLoginSuccessAction = user => ({
  type: USER_TYPES.LOGIN_USER_SUCCESS_ACTION,
  payload: user
})

export const createLoginErrorAction = user => ({
  type: USER_TYPES.LOGIN_USER_ERROR_ACTION,
  payload: user
})

export const createLogoutAction = () => ({
  type: USER_TYPES.LOGOUT_USER_ACTION
})

export const UserAction = {
  createLogoutAction,
  createLoginErrorAction,
  createLoginSuccessAction
}
