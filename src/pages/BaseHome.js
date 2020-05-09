import React from 'react'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import { Link } from 'react-router-dom'


const BaseHome = () => {
  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="base__home_body">
        <h1>Bienvenido a Kintun</h1>
        <Link to="/hospitals" className="container card__router">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h3>Hospitales</h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default BaseHome
