import React from 'react'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const BaseHome = () => {
  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="base__home_body">
        <h1>Bienvenido a Kintun</h1>
        <Link to="/hospitals" className="card__router">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h3>Hospitales</h3>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/categories" className="card__router">
          <div className="card">
            <div className="card-body">
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
