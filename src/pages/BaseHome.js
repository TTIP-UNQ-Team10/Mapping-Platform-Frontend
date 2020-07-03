import React, { useState, useContext } from 'react'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import { Link } from "react-router-dom";
import { AppContext } from '../store/Store.js'
import { selectSettingsState } from '../store/selectors/settings.js'

const renderOptions = (buttonsStates, colors) => {
  const styles = {
    action__card: {
      backgroundColor: 'transparent',
      color: colors.buttonColor.backgroundColor,
      width: '20em',
      height: '12em',
      textAlign: 'center',
      justifyContent: 'center',
      border: `1px dashed ${colors.buttonColor.backgroundColor}`,
      borderRadius: '.70em',
      transition: '.25s',
    },
    action__card_hover: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor,
      opacity: 0.7,
      cursor: 'pointer',
      width: '20em',
      height: '12em',
      transition: '.25s',
      textAlign: 'center',
      justifyContent: 'center',
      border: `1px dashed ${colors.buttonColor.textColor}`,
      borderRadius: '.70em',
    },
    image__card: {
      width: 150,
      opacity: 0.4,
      filter: 'grayscale(1)'
    }
  }

  const getCardStyleClass = (card) => {
    switch (card) {
      case 'necessity-type':
        return buttonsStates.necessityTypeButton ? styles.action__card_hover : styles.action__card
      case 'category':
        return buttonsStates.categoryButton ? styles.action__card_hover : styles.action__card
      case 'necessity':
        return buttonsStates.necessityButton ? styles.action__card_hover : styles.action__card
      case 'style-setting':
        return buttonsStates.styleSettingButton ? styles.action__card_hover : styles.action__card
      default:
    }
  }

  return (
    <div className="home__body">
      <div className="row">
        <Link to="/necessity-types"
          className="card card__router"
          style={getCardStyleClass('necessity-type')}
          onMouseEnter={() => buttonsStates.setNecessityTypeButton(true)}
          onMouseLeave={() => buttonsStates.setNecessityTypeButton(false)}
        >
          <div className="col">
            <img src="/necessities.svg" alt="" style={styles.image__card} className="image__card"/>
            <div>
              <h4>Tipos de Necesidades</h4>
            </div>
          </div>
        </Link>

        <Link to="/categories"
          className="card card__router"
          style={getCardStyleClass('category')}
          onMouseEnter={() => buttonsStates.setCategoryButton(true)}
          onMouseLeave={() => buttonsStates.setCategoryButton(false)}
        >
          <div className="col mt-2">
            <img src="/categories.svg" alt="" style={styles.image__card} className="image__card"/>
            <div className="mt-2">
              <h4>Categorías</h4>
            </div>
          </div>
        </Link>

        <Link to="/necessities"
          className="card card__router"
          style={getCardStyleClass('necessity')}
          onMouseEnter={() => buttonsStates.setNecessityButton(true)}
          onMouseLeave={() => buttonsStates.setNecessityButton(false)}
        >
          <div className="col mt-2">
            <img src="/necessities.svg" alt="" style={styles.image__card} className="image__card"/>
            <div className="mt-2">
              <h4>Necesidades</h4>
            </div>
          </div>
        </Link>

        <Link to="/settings"
          className="card card__router"
          style={getCardStyleClass('style-setting')}
          onMouseEnter={() => buttonsStates.setStyleSettingButton(true)}
          onMouseLeave={() => buttonsStates.setStyleSettingButton(false)}
        >
          <div className="col pt-1">
            <img src="/chromatic-wheel.svg" alt="" style={styles.image__card} className="image__card"/>
            <div>
              <h4>Personalización</h4>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

const BaseHome = () => {
  const { state } = useContext(AppContext)
  const { config } = selectSettingsState(state)
  const { colors } = config

  const [necessityTypeHoverState, setNecessityTypeHoverState] = useState(false)
  const [categoryButtonHoverState, setCategoryButtonHoverState] = useState(false)
  const [necessityHoverState, setNecessityHoverButton] = useState(false)
  const [styleSettingHoverState, setStyleSettingHoverState] = useState(false)
  const buttonsStates = {
    necessityTypeButton: necessityTypeHoverState,
    setNecessityTypeButton: setNecessityTypeHoverState,
    categoryButton: categoryButtonHoverState,
    setCategoryButton: setCategoryButtonHoverState,
    necessityButton: necessityHoverState,
    setNecessityButton: setNecessityHoverButton,
    styleSettingButton: styleSettingHoverState,
    setStyleSettingButton: setStyleSettingHoverState
  }

  const styles = {
    body__title_background: {
      color: colors.buttonColor.textColor,
      backgroundColor: colors.navBarOptions.backgroundColor,
      filter: 'opacity(85%)'
    }
  }

  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="body__title" style={styles.body__title_background}>
        <h2>Panel de Administración</h2>
      </div>
      <div className="home__body container-fluid">
        <div className="container">
          <div className="col col-md-12">
            {renderOptions(buttonsStates, colors)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BaseHome
