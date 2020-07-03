import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../store/Store.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import { createChangeSettingsStylesAction } from '../store/actions/settings.js'
import { selectSettingsState } from '../store/selectors/settings.js'
import { handlerInput } from '../utils/utils.js'
import { ChromePicker } from 'react-color'

const storage = window.localStorage

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
  const [pickedColor, setPickedColor] = useState('white')
  const storageSettings = JSON.parse(storage.getItem('styles'))

  const styles = {
    body__title_background: {
      color: storageSettings.colors.buttonColor.textColor,
      backgroundColor: storageSettings.colors.navBarOptions.backgroundColor,
      filter: 'opacity(85%)'
    }
  }

  useEffect(() => {
    console.log('useEffect ', storageSettings);
    setLocalSettings(storageSettings)
  }, [config])

  const onChangeHandler = (color, event) => {
    setPickedColor(color.hex)
  }

  const onChangeCompleteHandler = (color, event) => {
    console.log('complete');
    localSettings.colors.navBarOptions.backgroundColor = pickedColor
    setLocalSettings(localSettings)
    storage.setItem('styles', JSON.stringify(localSettings))
    dispatch(createChangeSettingsStylesAction(localSettings))
  }



  return (
    <div>
      <SideBarMenu />
      <Navbar />
      <div className="body__title" style={styles.body__title_background}>
        <h2>Personalización de Colores</h2>
      </div>
      <div className="home__body container-fluid col col-md-12">
        <div className="container">
          <ChromePicker
          color={pickedColor}
          onChangeComplete={onChangeCompleteHandler}
          onChange={onChangeHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default Setting
