import React, { useState, useContext } from 'react'
import { AppContext } from '../store/Store.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import { createSettingsStylesAction } from '../store/actions/settings.js'
import { selectSettingsState } from '../store/selectors/settings.js'
import { handlerInput } from '../utils/utils.js'

const Setting = () => {
  const initialSettings = {
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
  const { state, dispatch } = useContext(AppContext)
  const { config } = selectSettingsState(state)
  const { colors } = config
  const [localSettings, setLocalSettings] = useState(initialSettings)

  return (
    <div>
      <SideBarMenu />
      <Navbar />
    </div>
  )
}

export default Setting
