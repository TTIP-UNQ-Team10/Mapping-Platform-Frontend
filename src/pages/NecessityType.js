import React, { useState, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../store/Store.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import NecessityTypeTable from '../components/NecessityType/NecessityTypeTable.js'
import NecessityTypeForm from '../components/NecessityType/NecessityTypeForm.js'
import { handlerInput } from '../utils/utils.js'
import NecessityTypeService from '../services/NecessityType/NecessityTypeService'

const necessityTypeService = new NecessityTypeService()


const NecessityType = () => {

  const [necessityTypes, setNecessityTypes] = useState([])
  const [categories, setCategories] = useState(null)

  const { state, dispatch } = useContext(AppContext)
  const history = useHistory()

  const checkingLoginStatus = (response, fn) => {
    response && !response.error ? fn(response) : history.push('/login')
  }


  const fetchNecessityTypes = async () => {
    await necessityTypeService.fetchNecessityTypesAndCheckLoginStatus(checkingLoginStatus, setNecessityTypes, state)
  }

  const fetchCategories = async () => {
    await necessityTypeService.fetchCategories(checkingLoginStatus, setCategories, state)
  }


  useState(() => {
    fetchNecessityTypes()
    fetchCategories()
  })


  const onCreateNecessityType = async (necessityTypeData) => {
    await necessityTypeService.onCreateNecessityType(necessityTypeData, necessityTypes, setNecessityTypes, dispatch, state)
  }


  const onDeleteNecessityType = async (idx, necessityTypeId) => {
    await necessityTypeService.onDeleteNecessityType(idx, necessityTypeId, necessityTypes, dispatch, state)
  }


  const onEditNeccesityType = async (necessityType) => {
    await necessityTypeService.onEditNeccesityType(necessityType, dispatch, state)
  }


  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="home__body container-fluid">
        <h1>Administración de Tipos de Necesidades</h1>
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
