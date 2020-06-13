import React, { useState, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../store/Store.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import NecessityTypeTable from '../components/NecessityType/NecessityTypeTable.js'
import NecessityTypeForm from '../components/NecessityType/NecessityTypeForm.js'
import { selectUserAuthToken } from '../store/selectors/user.js'
import { handlerInput } from '../utils/utils.js'
import api from '../api'
import {
  createShowSuccessNotificationAction,
  createShowErrorNotificationAction
} from '../store/actions/notification.js'


const NecessityType = () => {

  const [necessityTypes, setNecessityTypes] = useState([])
  const [categories, setCategories] = useState(null)

  const { state, dispatch } = useContext(AppContext)
  const history = useHistory()

  const headers = {
    'auth': selectUserAuthToken(state),
    'Content-Type': 'application/json'
  }

  const checkingLoginStatus = (response, fn) => {
    response && !response.error ? fn(response) : history.push('/login')
  }


  const fetchNecessityTypes = async () => {
    const response = await api.getNecessityTypes(headers)
    checkingLoginStatus(response, setNecessityTypes)
  }

  const fetchCategories = async () => {
    const response = await api.getCategories(headers)
    checkingLoginStatus(response, setCategories)
  }


  useState(() => {
    fetchNecessityTypes()
    fetchCategories()
  })


  const onCreateNecessityType = async (necessityTypeData) => {
    const onSuccess = response => {
      dispatch(createShowSuccessNotificationAction({
        header: '!Tipo de Necesidad Creada!',
        message: 'El tipo de necesidad se creó con éxito'
      }))
      necessityTypes.push(response)
      setNecessityTypes(necessityTypes)
    }

    const onError = error => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'Ha ocurrido un error cuando se intentaba crea un tipo de necesidad'
      }))
    }

    await api.createNecessityType(necessityTypeData, headers, onSuccess, onError)
  }


  const onDeleteNecessityType = async (idx, necessityTypeId) => {
    const onSuccess = response => {
      dispatch(createShowSuccessNotificationAction({
        header: '!Tipo de Necesidad Eliminada!',
        message: 'El tipo de necesidad se eliminó con éxito'
      }))
    }

    const onError = error => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'Ha ocurrido un error cuando se intentaba eliminar un tipo de necesidad'
      }))
    }

    await api.removeNecessityType(necessityTypeId, headers, onSuccess, onError)
    necessityTypes.splice(idx, 1)
  }


  const onEditNeccesityType = async (necessityType) => {
    const onSuccess = response => {
      dispatch(createShowSuccessNotificationAction({
        header: '¡Tipo de Necesidad Modificada!',
        message: 'El tipo de necesidad se modificó con éxito'
      }))
    }

    const onError = error => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'Ha ocurrido un error cuando se intentaba modificar un tipo de necesidad'
      }))
    }

    await api.updateNecessityType(necessityType.id, necessityType,  headers, onSuccess, onError)
  }


  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="home__body container-fluid">
        <h1>Administración de Necesidades</h1>
        <hr/>
        <div className="container-fluid row">
          <NecessityTypeForm
            onClickHandler={onCreateNecessityType}
            onInputHandler={handlerInput}
            categoriesData={categories}
          />
          <div className="col-md-8">
            <NecessityTypeTable data={necessityTypes}
              onDeleteNecessityType={onDeleteNecessityType}
              onEditNeccesityType={onEditNeccesityType}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NecessityType
