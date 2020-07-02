import {  SETTINGS_TYPE } from '../reducers/settings'

export const createChangeSettingsStylesAction = config => ({
  type: SETTINGS_TYPE.CHANGE_SETTINGS_STYLES,
  payload: config
})

export const SettingsAction = {
  createChangeSettingsStylesAction
}
