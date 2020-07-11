import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../store/Store.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import { createChangeSettingsStylesAction } from '../store/actions/settings.js'
import { selectSettingsState } from '../store/selectors/settings.js'

import NavbarSettings from '../components/Settings/NavbarSettings.js'
import ButtonSettings from '../components/Settings/ButtonSettings.js'
import PageSettings from '../components/Settings/PageSettings.js'


const storage = window.localStorage

const Setting = () => {
  const initialSettings = {
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
  const storageSettings = JSON.parse(storage.getItem('styles'))
  const [localSettings, setLocalSettings] = useState(initialSettings)


  useEffect(() => {
    setLocalSettings(JSON.parse(storage.getItem('styles')))
  }, [config])

  const styles = {
    body__title_background: {
      color: storageSettings.colors.buttonColor.textColor,
      backgroundColor: storageSettings.colors.navBarOptions.backgroundColor,
      filter: 'opacity(85%)'
    },
    picker__button: {
      backgroundColor: storageSettings.colors.buttonColor.backgroundColor,
      color: storageSettings.colors.buttonColor.textColor
    },
    home_body: {
      backgroundColor: storageSettings.colors.appBackgroundColor.backgroundColor
    }
  }


  const saveSettings = settings => {
    dispatch(createChangeSettingsStylesAction(settings))
    storage.setItem('styles', JSON.stringify(settings))
  }

  const onColorPicked = (value, component) => {
    const componentKeys = component.split('.')
    componentKeys.length > 1 ?
      localSettings[componentKeys[0]][componentKeys[1]][componentKeys[2]] = value :
      localSettings[componentKeys[0]] = value
    setLocalSettings(localSettings)
    saveSettings(localSettings)
  }



  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="body__title" style={styles.body__title_background}>
        <h2>Personalización de Colores</h2>
      </div>
      <div id="router" className="home__body container-fluid col col-md-12" style={styles.home_body}>
        <div className="row settings__body">
          <div className="col-md-6 pl-5">
            <NavbarSettings
              pickerButtonClass={styles.picker__button}
              onColorValuePicked={onColorPicked}
            />
          </div>
          <div className="col-md-6 pl-5">
            <ButtonSettings
              pickerButtonClass={styles.picker__button}
              onColorValuePicked={onColorPicked}
            />
          </div>
          <div className="col-md-6">
            <PageSettings
              pickerButtonClass={styles.picker__button}
              onColorValuePicked={onColorPicked}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting
