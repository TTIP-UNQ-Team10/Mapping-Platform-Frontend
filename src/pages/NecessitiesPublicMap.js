import React, { useState, useContext } from 'react'
import { AppContext } from '../store/Store.js'
import MapComponent from '../components/MapComponent.js'
import MapFilter from '../components/MapFilter.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import { Popup } from 'react-leaflet'
import { createShowErrorNotificationAction } from '../store/actions/notification.js'
import { selectUserAuthToken } from '../store/selectors/user.js'
import api from '../api'
import config from '../config.js'

const { colors } = config


const NecessitiesPublicMap = () => {

  const styles = {
    buttons: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  const [data, setData] = useState(null);
  const { state, dispatch } = useContext(AppContext)

  const showNecessities = () => {
    setData(getNecessities())
  }

  const showNecessitiesByCategory = async (category) => {
    setData(await getNecessitiesByCategory(category))
  }

  const getNecessities = async () => {

    const onSuccess = async (response) => {
      const data = await response
      setData(data)
    }

    const onError = async (error) => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'No se han podido obtener las Necesidades'
      }))
    }

    const headers = {
      'Auth': selectUserAuthToken(state)
    }

    await api.getNecessities(headers, onSuccess, onError)
  }

  const getNecessitiesByCategory = async (category) => {

    const onSuccess = async (response) => {
      const data = await response
      setData(data)
    }

    const onError = async (error) => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'No se han podido obtener las Necesidades'
      }))
    }

    const headers = {
      'Auth': selectUserAuthToken(state)
    }

    await api.getNecessitiesByCategory(headers, onSuccess, onError, category)
  }


  const generateNecessityPopups = data => {
    const { name, type, description, category } = data
    return (
      <Popup>
        <b>{name ? name: ''}</b><br/>
        {type ? <p>{type.name}</p> : ''}
        {description ? <p><b>Descripción:</b>{description}</p> : ''}
        {category ? <p><b>Categoría:</b>{category.name}</p> : ''}
      </Popup>
    )
  }

  const handlerInput = (event, handlerFunction) => {
    const { value } = event.target
    handlerFunction(value)
  }

  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="container-fluid base__home_body">
        <div className="flex-column form-inline d-flex justify-content-center">
            <button
              className="btn my-2 my-sm-3"
              style={styles.buttons}
              type="submit"
              onClick={showNecessities}
            >Ver Necesidades
            </button>
          <br/>
          <MapComponent data={data} generatePopupFunction={generateNecessityPopups}/>
        </div>
      </div>
      <MapFilter onInputHandler={handlerInput} onSubmitHandler={showNecessitiesByCategory} />
    </div>
  )
}

export default NecessitiesPublicMap;
