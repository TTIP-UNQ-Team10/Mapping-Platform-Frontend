import React, { useState } from 'react'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import { Link } from "react-router-dom";
import config from '../config.js'

const { colors } = config

const renderOptions = (buttonsStates) => {
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
      case 'necessity':
        return buttonsStates.necessityButton ? styles.action__card_hover : styles.action__card
      case 'category':
        return buttonsStates.categoryButton ? styles.action__card_hover : styles.action__card
      default:
    }
  }

  return (
    <div className="home__body">
      <div className="row">
        <Link to="/necessities"
          className="card card__router"
          style={getCardStyleClass('necessity')}
          onMouseEnter={() => buttonsStates.setNecessityButton(true)}
          onMouseLeave={() => buttonsStates.setNecessityButton(false)}
        >
          <div className="col">
            <img src="/necessities.svg" alt="" style={styles.image__card} className="image__card"/>
            <div>
              <h4>Necesidades</h4>
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
      </div>
    </div>
  )
}

const BaseHome = () => {
  const [necessityButtonHoverState, setNecessityButtonHoverState] = useState(false)
  const [categoryButtonHoverState, setCategoryButtonHoverState] = useState(false)
  const buttonsStates = {
    necessityButton: necessityButtonHoverState,
    setNecessityButton: setNecessityButtonHoverState,
    categoryButton: categoryButtonHoverState,
    setCategoryButton: setCategoryButtonHoverState
  }

  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="home__body container-fluid">
        <h1>Panel de Administración</h1>
        <hr/>
        <div className="container">
          <div className="col col-md-12">
            {renderOptions(buttonsStates)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BaseHome
