import React, { useState } from 'react'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import {
  Link
} from "react-router-dom";
import config from '../config.js'

const { colors } = config

const BaseHome = () => {

  const [buttonHover, setButtonHover] = useState(false)
  const [buttonHover1, setButtonHover1] = useState(false)


  const styles = {
    buttons: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor,
      '&:hover': {
        backgroundColor: colors.buttonColor.textColor,
        color: colors.primaryText.color
      },
    },
    hover: {
      backgroundColor: colors.buttonColor.textColor,
      color: colors.primaryText.color
    },
  }

  const getButtonClass = (n) => {
    if (n) {
      return buttonHover1 ? styles.hover : styles.buttons
    } else {
      return buttonHover ? styles.hover : styles.buttons
    }
  }

  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="base__home_body">
        <h1>Bienvenido a Kintun</h1>
        <Link to="/hospitals" className="card__router">
          <div className="card">
            <div className="card-body" style={getButtonClass(1)}
              onMouseEnter={() => setButtonHover1(true)}
              onMouseLeave={() => setButtonHover1(false)}
            >
              <div className="card-title">
                <h3>Hospitales</h3>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/categories" className="card__router">
          <div className="card">
            <div className="card-body" style={getButtonClass()}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
            >
              <div className="card-title">
                <h3>Categorías</h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default BaseHome
