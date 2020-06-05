import React, { useState, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../store/Store.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import NecessityTable from '../components/NecessityTable.js'
import NecessityForm from '../components/NecessityForm.js'
import { selectUserAuthToken } from '../store/selectors/user.js'
import { handlerInput } from '../utils/utils.js'
import api from '../api'
import {
  createShowSuccessNotificationAction,
  createShowErrorNotificationAction
} from '../store/actions/notification.js'


const NecessityType = () => {

  const [necessityType, setNecessityType] = useState([])
  const { state, dispatch } = useContext(AppContext)
  const history = useHistory()

  const headers = {
    'auth': selectUserAuthToken(state),
    'Content-Type': 'application/json'
  }


  const fetchCategories = async () => {
    const response = await api.getNecessityTypes(headers)
    response && !response.error ? setNecessityType(response) : history.push('/login')
  }


  useState(() => {
    fetchCategories()
  })


  const onCreateNecessityType = async (necessityTypeData) => {
    necessityType.push(necessityTypeData)
    setNecessityType(necessityType)

    const onSuccess = response => {
      dispatch(createShowSuccessNotificationAction({
        header: '¡Success!',
        message: 'Necessity has been created successfully'
      }))
    }

    const onError = error => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'Necessity has not been created'
      }))
    }

    await api.createNecessityType(necessityTypeData, headers, onSuccess, onError)
  }


  const onDeleteNecessityType = async (necessityTypeId) => {

    const onSuccess = response => {
      dispatch(createShowSuccessNotificationAction({
        header: '¡Success!',
        message: 'Necessity has been deleted successfully'
      }))
    }

    const onError = error => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'Necessity has not been deleted'
      }))
    }

    await api.removeNecessityType(necessityTypeId, headers, onSuccess, onError)
  }


  const onEditNeccesityType = async (necessityTypeId) => {
    const onSuccess = response => {
      dispatch(createShowSuccessNotificationAction({
        header: '¡Success!',
        message: 'Necessity has been edited successfully'
      }))
    }

    const onError = error => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'Necessity has not been edited'
      }))
    }

    await api.updateNecessityType(necessityTypeId, headers, onSuccess, onError)
  }


  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="home__body container-fluid">
        <h1>Administración de Necesidades</h1>
        <hr/>
        <div className="container row">
          <NecessityForm onClickHandler={onCreateNecessityType} onInputHandler={handlerInput}/>
          <div className="col-md-8">
            <NecessityTable data={necessityType}
              onDeleteNecessityType={() => {console.log('AAA')}}
              onEditNeccesityType={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NecessityType
