import { getInitialNotificationState, notification } from "./reducers/notification"
import { getInitialUserState, user } from "./reducers/user"
import { getInitialSettingsState, settings } from "./reducers/settings"

export const getInitialState = () => ({
  notificationState: getInitialNotificationState(),
  userState: getInitialUserState(),
  settingsState: getInitialSettingsState()
});

export const mainReducer = (state, action) => {
  return {
    notificationState: notification(state.notificationState, action),
    userState: user(state.userState, action),
    settingsState: settings(state.settingsState, action)
  }
};
