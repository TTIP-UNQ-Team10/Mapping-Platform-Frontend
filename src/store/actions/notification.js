import {  NOTIFICATION_TYPES } from '../reducers/notification'

export const createShowSuccessNotificationAction = notification => ({
  type: NOTIFICATION_TYPES.SHOW_SUCCESS_NOTIFICATION_ACTION,
  payload: notification
})

export const createShowErrorNotificationAction = notification => ({
  type: NOTIFICATION_TYPES.SHOW_ERROR_NOTIFICATION_ACTION,
  payload: notification
})

export const closeNotificationAction = notification => ({
  type: NOTIFICATION_TYPES.CLOSE_NOTIFICATION_ACTION,
  payload: notification
})

export const NotificationAction = {
  createShowErrorNotificationAction,
  createShowSuccessNotificationAction
}
