import React, { useState, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../store/Store.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import NecessityTypeTable from '../components/NecessityType/NecessityTypeTable.js'
import NecessityTypeForm from '../components/NecessityType/NecessityTypeForm.js'
import { handlerInput } from '../utils/utils.js'
import NecessityTypeService from '../services/NecessityType/NecessityTypeService'
import { selectSettingsState } from '../store/selectors/settings.js'


const necessityTypeService = new NecessityTypeService()


const NecessityType = () => {

  const [necessityTypes, setNecessityTypes] = useState([])
  const [categories, setCategories] = useState(null)

  const { state, dispatch } = useContext(AppContext)
  const history = useHistory()
  const { config } = selectSettingsState(state)
  const { colors } = config

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

  const styles = {
    body__title_background: {
      color: colors.buttonColor.textColor,
      backgroundColor: colors.navBarOptions.backgroundColor,
      filter: 'opacity(85%)'
    },
    home_body: {
      backgroundColor: colors.appBackgroundColor.backgroundColor
    }
  }


  return (
    <div id="router">
      <Navbar />
      <SideBarMenu />
      <div className="body__title" style={styles.body__title_background}>
        <h2>Administración de Tipos de Necesidades</h2>
      </div>
      <div className="home__body container-fluid" style={styles.home_body}>
        <div className="container-fluid row">
          <NecessityTypeForm
            onClickHandler={onCreateNecessityType}
            onInputHandler={handlerInput}
            categoriesData={categories}
            colors={colors}
          />
          <div className="col-md-8">
            <NecessityTypeTable data={necessityTypes}
              onDeleteNecessityType={onDeleteNecessityType}
              onEditNeccesityType={onEditNeccesityType}
              colors={colors}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NecessityType
