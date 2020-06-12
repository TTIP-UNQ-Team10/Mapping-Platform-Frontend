import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../store/Store.js'
import MapComponent from '../components/Map/MapComponent.js'
import NecessityForm from '../components/Necessity/NecessityForm.js'
import NecessityTable from '../components/Necessity/NecessityTable.js'
import Navbar from '../components/Navbar.js'
import {
  createShowSuccessNotificationAction,
  createShowErrorNotificationAction
} from '../store/actions/notification.js'
import { selectUserAuthToken } from '../store/selectors/user.js'
import api from '../api'
import config from '../config.js'

const { colors } = config



const renderMiniNavbar = (setMode) => {

  return (
    <div className="col-md-12">
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item col-md-6" role="presentation">
          <a className="nav-link" href="pill-form"
            id="pills-home-tab" data-toggle="pill" onClick={() => setMode('form')}
            role="tab" aria-controls="pills-home" aria-selected="true">Nueva Mapeo
          </a>
        </li>
        <li className="nav-item col-md-6" role="presentation">
          <a className="nav-link active" href="pill-table"
            id="pills-profile-tab" data-toggle="pill" onClick={() => setMode('table')}
            role="tab" aria-controls="pills-profile" aria-selected="false">Necesidades Mapeadas
          </a>
        </li>
      </ul>
    </div>
  )
}






const Necessity = () => {

  const [necessitiyList, setNecessityList] = useState(null);
  const [dataToMap, setDataToMap] = useState(null)
  const [mode, setMode] = useState('table')
  const [coordinates, setCoordinates] = useState(null)
  const [necessityTypes, setNecessityTypes] = useState(null)
  const [categories, setCategories] = useState([])

  const { state, dispatch } = useContext(AppContext)

  const fetchNecessities = () => {
    getNecessitiesData()
  }


  const fetchNecessityTypes = () => {
    getNecessityTypesData()
  }


  const fetchCategoriesByNecessityType = (necessity) => {
    const categoriesData = necessityTypes.find(
      necess => necess.name === necessity
    ).categories
    setCategories(categoriesData)
  }


  const getNecessityTypesData = async () => {
    const headers = {
      'Auth': selectUserAuthToken(state)
    }

    const onSuccess = async (response) => {
      const data = await response
      setNecessityTypes(data)
    }

    const onError = async (error) => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'No se han podido obtener los tipos de necesidad'
      }))
    }

    await api.getNecessityTypes(headers, onSuccess, onError)
  }


  const getNecessitiesData = async () => {
    const headers = {
      'Auth': selectUserAuthToken(state)
    }

    const onSuccess = async (response) => {
      const data = await response
      setNecessityList(data)
    }

    const onError = async (error) => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'No se han podido obtener las necesidades'
      }))
    }

    await api.getNecessities(headers, onSuccess, onError)
  }


  // const generateHostipalPopups = data => {
  //   const { name, type, address, addressNumber, phone, website, postalCode } = data
  //   return (
  //     <Popup>
  //       <b>{name ? name: ''}</b><br/>
  //       {type ? <p><b>Especialidad:</b> {type.name}</p> : ''}
  //       {phone ? <p><b>Teléfono:</b> {phone}</p> : ''}
  //       {address ? <p><b>Dirección:</b> {address} {addressNumber}, {postalCode}</p> : ''}
  //       {website ? <p><b>Web:</b> {website}</p> : ''}
  //     </Popup>
  //   )
  // }


  const renderNecessityIntoMap = (idx, necessity) => {
    setDataToMap([necessity])
  }

  useEffect(() => {
    if (!necessitiyList) {
      fetchNecessities()
    }
  })

  useEffect(() => {
    if (necessityTypes && necessityTypes.length < 1) {
      fetchNecessityTypes()
    }
  })


  const getCategoriesByNecessityType = (necessity) => {
    fetchCategoriesByNecessityType(necessity)
  }


  const saveNecessity = async (data) => {
    console.log('save necessity', data);
    const headers = {
      'Auth': selectUserAuthToken(state),
      'Content-Type': 'application/json'
    }

    const onSuccess = async (response) => {
      const newNecessity = await response
      dispatch(createShowSuccessNotificationAction({
        header: '¡Necesidad Creada!',
        message: 'El mapeo se a creado con éxito'
      }))

      necessitiyList.push(newNecessity)
      setNecessityList(necessitiyList)
    }

    const onError = async (error) => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'No se han podido crear un mapeo'
      }))
    }

    await api.createNecessity(data, headers, onSuccess, onError)
  }


  return (
    <div>
      <Navbar />
      <div className="container-fluid home__body">
        <h1>Necesidades</h1>
        <hr/>
        <div className="row justify-content-between mt-5">
          <div className="col-md-4">
            {renderMiniNavbar(setMode)}
            {
              mode === 'form' ?
              <NecessityForm
                necessityTypes={necessityTypes}
                categories={categories}
                onSeclectNecessityType={getCategoriesByNecessityType}
                coordFromMap={coordinates}
                onHandlerSummit={saveNecessity}
              /> :
              <NecessityTable
                data={necessitiyList}
                showNecessityIntoMap={renderNecessityIntoMap}
              />
            }
          </div>
          <div className="col col-md-8">
            <MapComponent data={dataToMap} onClickMapHandler={setCoordinates}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Necessity;
