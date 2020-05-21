import React from 'react'
import { Link } from "react-router-dom";

const SideBarMenu = () => {

  return (
    <div className="collapse sidenav" id="sidebarMenu">
      <div className="list-unstyled">
        <Link to="/home"><span className="side__menu__text">Home</span></Link>
        <Link to="/hospitals"><span className="side__menu__text">Hospitales</span></Link>
        <Link to="/login"><span className="side__menu__text">Salir</span></Link>
      </div>
    </div>
  )
}

export default SideBarMenu
