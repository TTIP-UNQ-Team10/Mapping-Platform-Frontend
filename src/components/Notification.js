import React, { useContext, useState } from 'react'
import { AppContext } from '../store/Store.js'
import { selectNotificationState } from '../store/selectors/notification.js'
import { closeNotificationAction } from '../store/actions/notification.js'


export const Notification = () => {

  const { state, dispatch } = useContext(AppContext)
  const { showNotification, header, message, type } = selectNotificationState(state)

  const hideNotification = () => {
    if (showNotification) {
      setTimeout(function () {
        dispatch(closeNotificationAction(selectNotificationState(state)))
      }, 3000);
    }
  }

  const getNotificationType = () => {
    const types = ["alert-success", "alert-danger"]
    return type === 'success' ? types[0] : types[1]
  }

  useState(() => {
    hideNotification()
  },[showNotification])

  return (
    <div className={"alert notification " + getNotificationType()} role="alert">
      <h5 className="alert-heading">{header}</h5>
      <p>{message}</p>
    </div>
  )
}
