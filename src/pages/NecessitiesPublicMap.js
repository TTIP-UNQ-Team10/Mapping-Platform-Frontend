import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../store/Store.js'
import MapComponent from '../components/MapComponent.js'
import MapFilter from '../components/MapFilter.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import { Popup } from 'react-leaflet'
import NecessityService from '../services/Necessity/NecessityService.js'
import { selectSettingsState } from '../store/selectors/settings.js'

const necessityService = new NecessityService()



const NecessitiesPublicMap = (props) => {

  const [data, setData] = useState(null);
  const [publicHomeFilter, setPublicHomeFilter] = useState(null)
  const { state, dispatch } = useContext(AppContext)
  const { config } = selectSettingsState(state)
  const { default: { colors } } = config

  const styles = {
    buttons: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  const showNecessities = () => {
    setData(getNecessities())
  }

  const showNecessitiesByCategory = async (category) => {
    setData(await fetchNecessitiesByCategory(category))
  }

  const fetchFilteredData = async (category, necessityType) => {
    if (category) {
      setPublicHomeFilter(category)
      showNecessitiesByCategory(category)
    }
    if (necessityType) {
      setPublicHomeFilter(necessityType)

    }
  }


  useEffect(() => {
    const { category } = props.match.params
    const { necessityType } = props.match.params
    if (!publicHomeFilter && (category || necessityType)) {
      fetchFilteredData(category, necessityType)
    }
  })

  const getNecessities = async () => {
    await necessityService.getNecessitiesData(setData, dispatch, state)
  }

  const fetchNecessitiesByCategory = async (category) => {
    await necessityService.getNecessitiesByCategory(category, setData, dispatch, state)
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
