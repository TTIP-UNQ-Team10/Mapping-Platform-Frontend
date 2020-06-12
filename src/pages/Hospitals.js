import React, { useState, useContext } from 'react'
import { AppContext } from '../store/Store.js'
import MapComponent from '../components/Map/MapComponent.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import { Popup } from 'react-leaflet'
import { createShowErrorNotificationAction } from '../store/actions/notification.js'
import { selectUserAuthToken } from '../store/selectors/user.js'
import api from '../api'
import config from '../config.js'

const { colors } = config


const Hospitals = () => {

  const styles = {
    buttons: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

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


  const generateHostipalPopups = data => {
    const { name, type, address, addressNumber, phone, website, postalCode } = data
    return (
      <Popup>
        <b>{name ? name: ''}</b><br/>
        {type ? <p><b>Especialidad:</b> {type.name}</p> : ''}
        {phone ? <p><b>Teléfono:</b> {phone}</p> : ''}
        {address ? <p><b>Dirección:</b> {address} {addressNumber}, {postalCode}</p> : ''}
        {website ? <p><b>Web:</b> {website}</p> : ''}
      </Popup>
    )
  }


  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="container-fluid base__home_body">
        <div className="flex-column form-inline d-flex justify-content-center">
            <button
              className="btn my-2 my-sm-0"
              style={styles.buttons}
              type="submit"
              onClick={showHospitals}
            >Ver Hospitales
            </button>
          <br/>
          <MapComponent data={data} generatePopupFunction={generateHostipalPopups}/>
        </div>
      </div>
    </div>
  )
}

export default Hospitals;
