import { getInitialNotificationState, notification } from "./reducers/notification"
import { getInitialUserState, user } from "./reducers/user"

export const getInitialState = () => ({
  notificationState: getInitialNotificationState(),
  userState: getInitialUserState(),
});

export const mainReducer = (state, action) => {
  return {
    notificationState: notification(state.notificationState, action),
    userState: user(state.userState, action),
  }
};
