import React, { useContext} from 'react'
import { AppContext } from '../store/Store.js'
import { Link } from "react-router-dom";
import { selectSettingsState } from '../store/selectors/settings.js'


const SideBarMenu = () => {
  const { state } = useContext(AppContext)
  const { config } = selectSettingsState(state)
  const { colors } = config

  const styles = {
    sidebar__menu: {
      backgroundColor: colors.navBarOptions.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  return (
    <nav className="collapse sidenav" id="sidebarMenu" style={styles.sidebar__menu}>
      <div className="list-unstyled">
        <Link to="/home"><span className="side__menu__text">Dashboard</span></Link>
        <Link to="/"><span className="side__menu__text">Home</span></Link>
        <Link to="/necessity-types"><span className="side__menu__text">Tipos de Necesidades</span></Link>
        <Link to="/necessities"><span className="side__menu__text">Mapeos de Necesidades</span></Link>
        <Link to="/categories"><span className="side__menu__text">Categorías</span></Link>
        <Link to="/login"><span className="side__menu__text">Salir</span></Link>
      </div>
    </nav>
  )
}

export default SideBarMenu
