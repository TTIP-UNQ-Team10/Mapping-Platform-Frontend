import React, { useState, useContext } from 'react'
import { AppContext } from '../store/Store.js'
import MapComponent from '../components/MapComponent.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import { createShowErrorNotificationAction } from '../store/actions/notification.js'
import { selectUserAuthToken } from '../store/selectors/user.js'
import api from '../api'


const Hospitals = () => {

  const [data, setData] = useState(null);
  const { state, dispatch } = useContext(AppContext)

  const showHospitals = () => {
    setData(getHospitals())
  }

  const getHospitals = async () => {

    const onSuccess = async (response) => {
      const data = await response
      setData(data)
    }

    const onError = async (error) => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'No se han podido obtener los Hospitales'
      }))
    }

    const headers = {
      'Auth': selectUserAuthToken(state)
    }

    await api.getHospitals(headers, onSuccess, onError)
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
