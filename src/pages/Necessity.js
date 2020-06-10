import React, { useState, useContext } from 'react'
import { AppContext } from '../store/Store.js'
import MapComponent from '../components/MapComponent.js'
import Navbar from '../components/Navbar.js'
import { Popup } from 'react-leaflet'
import { createShowErrorNotificationAction } from '../store/actions/notification.js'
import { selectUserAuthToken } from '../store/selectors/user.js'
import api from '../api'
import config from '../config.js'

const { colors } = config


const renderNecessityForm = data => {
  const styles = {
    button__create: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  return (
    <div className="col-md-4">
      <div className="mb-3">
        <label className="pull-left">Nombre</label>
        <input type="text"
          required
          value={1}
          name="categoryName"
          className="form-control"
          placeholder="Ingrese un nombre de categoría"
          aria-label="Categoría"
          aria-describedby="basic-addon1"
          onInput={()=>{}}
        />
      </div>
      <div className="mb-3">
        <label className="pull-left">Descripción</label>
        <input type="text"
          required
          value={1}
          name="categoryName"
          className="form-control"
          placeholder="Ingrese un nombre de categoría"
          aria-label="Categoría"
          aria-describedby="basic-addon1"
          onInput={()=>{}}
        />
      </div>
      <div className="mb-3">
        <label className="pull-left">Tipo de Necesidad</label>
        <select class="form-control" onChange={()=>{}}>
          <option value={null}>Elija un tipo de Necesidad</option>
          {
            [].map(necessityType => {
              const necessityTypeName = necessityType.name
              return (
                <option value={necessityTypeName}>{necessityTypeName}</option>
              )
            })
          }
        </select>
      </div>
      <div className="mb-3">
        <label className="pull-left">Categoría</label>
        <select class="form-control" onChange={()=>{}}>
          <option value={null}>Elija una Categoría</option>
          {
            [].map(necessityType => {
              const necessityTypeName = necessityType.name
              return (
                <option value={necessityTypeName}>{necessityTypeName}</option>
              )
            })
          }
        </select>
      </div>
      <div className="mb-3">
        <button type="submit"
        className="btn btn-block btn-dark"
        style={styles.button__create}
        onClick={()=>{}}>Nuevo Mapeo</button>
      </div>
    </div>
  )
}


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
      <div className="container-fluid home__body">
        <h1>Necesidades</h1>
        <hr/>
        <div className="row justify-content-between mt-5">
          {renderNecessityForm(data)}
          <div className="col col-md-8">
            <MapComponent data={data} generatePopupFunction={generateHostipalPopups}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hospitals;
