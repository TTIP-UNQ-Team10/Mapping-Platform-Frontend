import React, { useState } from 'react';
import MapComponent from '../components/MapComponent.js'
import api from '../api';


const Home = () => {

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
      <nav className="navbar navbar-primary bg-primary">
        <h2>Mapping Platform</h2>
      </nav>
      <div className="container-fluid">
        <div className="flex-column form-inline d-flex justify-content-center">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
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

export default Home;
