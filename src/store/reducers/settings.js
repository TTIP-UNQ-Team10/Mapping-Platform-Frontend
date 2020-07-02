export const SETTINGS_TYPE = {
  CHANGE_SETTINGS_STYLES: 'CHANGE_SETTINGS_STYLES'
}

const initialSettingsState = {
  config: {
    appId: null,
    appLogo: null,
    favicon: null,
    colors: {
      appBackgroundColor: {
        backgroundColor: null
      },
      navBarOptions: {
        activeColor: null,
        backgroundColor: null,
        inactiveColor: null
      },
      panelBackgroundColor: {
        backgroundColor: null
      },
      buttonColor: {
        backgroundColor: null,
        textColor: null
      },
      primaryText: {
        color: null
      },
      secondaryText: {
        color: null
      }
    },
    name: null,
  }
}

export const getInitialSettingsState = () => initialSettingsState

export const settings = (state = initialSettingsState, action) => {
  console.log('REDUCER SETTINGS: ', action);
  switch (action.type) {
    case SETTINGS_TYPE.CHANGE_SETTINGS_STYLES: {
      return {
        config: action.payload
      }
    }
    default:
      return state

  }
}
