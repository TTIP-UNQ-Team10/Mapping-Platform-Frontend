export const NOTIFICATION_TYPES = {
  SHOW_SUCCESS_NOTIFICATION_ACTION: 'SHOW_SUCCESS_NOTIFICATION_ACTION',
  SHOW_ERROR_NOTIFICATION_ACTION: 'SHOW_ERROR_NOTIFICATION_ACTION',
  CLOSE_NOTIFICATION_ACTION: 'CLOSE_NOTIFICATION_ACTION'
}

const initialNotificationState = {
  showNotification: false,
  header: 'Titulo',
  message: 'estes es un mensaje para una notificatión',
  color: 'success'
}

export const getInitialNotificationState = () => initialNotificationState

export const notification = (state = initialNotificationState, action) => {
  switch (action.type) {
    case NOTIFICATION_TYPES.SHOW_SUCCESS_NOTIFICATION_ACTION: {
      return {
        showNotification: true,
        header: action.payload.header,
        message: action.payload.message,
        color: 'success'
      }
    }
    case NOTIFICATION_TYPES.SHOW_ERROR_NOTIFICATION_ACTION: {
      return {
        showNotification: true,
        header: action.payload.header,
        message: action.payload.message,
        color: 'danger'
      }
    }
    case NOTIFICATION_TYPES.CLOSE_NOTIFICATION_ACTION: {
      return {
        showNotification: false
      }
    }
    default:
      return state

  }
}
