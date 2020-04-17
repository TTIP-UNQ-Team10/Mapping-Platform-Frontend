import React, { useState } from 'react';
import MapComponent from '../components/MapContainer.js'
import api from '../api';


const getHospitals = () => {
  return api.getHospitals();
}

const Home = () => {

  const [show, setShow] = useState(false);

  const showMap = () => {
    setShow(true)
  }

  return (
    <div>
      <nav className="navbar navbar-primary bg-primary">
        <h2>Mapping Platform</h2>
      </nav>
      <div className="container-fluid">
        <div className="flex-column form-inline d-flex justify-content-center">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={showMap}
            >Ver Hospitales
            </button>
          <br/>
          {
            show ?
              <MapComponent data={getHospitals()}/> :
              null
          }
        </div>
      </div>
    </div>
  )
}

export default Home;
