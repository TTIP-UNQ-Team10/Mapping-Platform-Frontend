import React, { useState } from 'react'
import MapComponent from '../components/MapComponent.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import api from '../api'


const Hospitals = () => {

  const [data, setData] = useState(null);

  const showHospitals = () => {
    setData(getHospitals())
  }

  const getHospitals = () => {
    api.getHospitals()
      .then(response => {
        setData(response)
      })
  }

  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="container-fluid base__home_body">
        <div className="flex-column form-inline d-flex justify-content-center">
            <button
              className="btn btn-outline-dark my-2 my-sm-0"
              type="submit"
              onClick={showHospitals}
            >Ver Hospitales
            </button>
          <br/>
          <MapComponent data={data}/>
        </div>
      </div>
    </div>
  )
}

export default Hospitals;
