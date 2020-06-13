import React from 'react'
import { Link } from "react-router-dom";
import config from '../config.js'

const { colors } = config

const SideBarMenu = () => {

  const styles = {
    sidebar__menu: {
      backgroundColor: colors.navBarOptions.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  return (
    <nav className="collapse sidenav" id="sidebarMenu" style={styles.sidebar__menu}>
      <div className="list-unstyled">
        <Link to="/home"><span className="side__menu__text">Home</span></Link>
        <Link to="/necessity-types"><span className="side__menu__text">Tipos de Necesidades</span></Link>
        <Link to="/necessities"><span className="side__menu__text">Mapeos</span></Link>
        <Link to="/hospitals"><span className="side__menu__text">Hospitales</span></Link>
        <Link to="/mapa-necesidades"><span className="side__menu__text">Mapa público de necesidades</span></Link>
        <Link to="/categories"><span className="side__menu__text">Categorías</span></Link>
        <Link to="/login"><span className="side__menu__text">Salir</span></Link>
      </div>
    </nav>
  )
}

export default SideBarMenu
