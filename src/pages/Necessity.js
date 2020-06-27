import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../store/Store.js'
import MapComponent from '../components/Map/MapComponent.js'
import NecessityForm from '../components/Necessity/NecessityForm.js'
import NecessityTable from '../components/Necessity/NecessityTable.js'
import Filter from '../components/Necessity/Filter.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import config from '../config.js'
import NecessityService from '../services/Necessity/NecessityService'
import CategoryService from '../services/Category/CategoryService.js'

const necessityService = new NecessityService()
const categoryService = new CategoryService()

const { colors } = config

const renderMiniNavbar = (mode, setMode) => {
  const styles = {
    nav__pill: {
      backgroundColor: 'transparent',
      color: colors.buttonColor.backgroundColor,
      border: `1px dashed ${colors.buttonColor.backgroundColor}`,
      opacity: 0.7,
    },
    active: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor,
      border: `1px dashed ${colors.buttonColor.textColor}`,
      opacity: 0.7,
    }
  }

  const getPillStyleClass = (pill) => {
    if (mode !== pill) {
      return styles.nav__pill
    } else {
      return styles.active
    }
  }


  return (
    <div className="col-md-12">
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item col-md-6" role="presentation">
          <a className="nav-link active" href="pill-table" style={getPillStyleClass('table')}
            id="pills-profile-tab" data-toggle="pill" onClick={() => setMode('table')}
            role="tab" aria-controls="pills-profile" aria-selected="false">Necesidades
          </a>
        </li>
        <li className="nav-item col-md-6" role="presentation">
          <a className="nav-link" href="pill-form" style={getPillStyleClass('form')}
            id="pills-home-tab" data-toggle="pill" onClick={() => setMode('form')}
            role="tab" aria-controls="pills-home" aria-selected="true">Nuevo Mapeo
          </a>
        </li>
      </ul>
    </div>
  )
}

const Necessity = () => {

  const [necessityList, setNecessityList] = useState(null);
  const [dataToMap, setDataToMap] = useState(null)
  const [mode, setMode] = useState('table')
  const [coordinates, setCoordinates] = useState(null)
  const [necessityTypes, setNecessityTypes] = useState([])
  const [categories, setCategories] = useState([])
  const [necessityTypesIsFetched, setNecessityTypesIsFetched] = useState(false)
  const [title, setTitle] = useState('')

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


  const fetchCategories = async () => {
    await categoryService.getCategories(setCategories, state)
  }


  const getNecessityTypesData = async () => {
    await necessityService.getNecessityTypesData(setNecessityTypes, dispatch, state)
  }


  const getNecessitiesData = async () => {
    await necessityService.getNecessitiesData(setNecessityList, dispatch, state)
  }


  const renderNecessityIntoMap = (idx, necessity) => {
    setDataToMap([necessity])
    setTitle(necessity)
  }


  useEffect(() => {
    if (!necessityList) {
      fetchNecessities()
      fetchCategories()
    }
  })


  useEffect(() => {
    if (!necessityTypesIsFetched && necessityTypes.length < 1) {
      fetchNecessityTypes()
      setNecessityTypesIsFetched(true)
    }
  })


  const getCategoriesByNecessityType = (necessity) => {
    fetchCategoriesByNecessityType(necessity)
  }


  const saveNecessity = async (data) => {
    await necessityService.saveNecessity(data, dispatch, necessityList, setNecessityList, state)
  }


  const onCategoryFilterOption = async (category) => {
    await necessityService.onCategoryFilterOption(category, state, setNecessityList)
  }


  const onNecessityTypeFilterOption = async (necessityType) => {
    await necessityService.onNecessityTypeFilterOption(necessityType, setNecessityList, state)
  }

  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="container-fluid home__body mb-5">
        <h1>Necesidades</h1>
        <hr/>
        <div className="row mt-5">
          <div className="row col-md-12 mb-3 pl-5">
            <div className=" col-md-2 pb-4">
              <Filter data={categories} onSelectFilter={onCategoryFilterOption} type={'Categoría'}/>
            </div>
            <div className=" col-md-2 pb-4">
              <Filter data={necessityTypes} onSelectFilter={onNecessityTypeFilterOption} type={'Tipo'}/>
            </div>
            <div className="col-md-8 pb-3">
              <h3>{title.name}</h3>
            </div>
          </div>
          <div className="col-md-4">
            {renderMiniNavbar(mode, setMode)}
            {
              mode === 'form' ?
              <NecessityForm
                necessityTypes={necessityTypes}
                categories={categories}
                onSelectNecessityType={getCategoriesByNecessityType}
                coordFromMap={coordinates}
                onHandlerSummit={saveNecessity}
              /> :
              <NecessityTable
                data={necessityList}
                showNecessityIntoMap={renderNecessityIntoMap}
              />
            }
          </div>
          <div className="col col-md-8">
            <MapComponent data={dataToMap} onClickMapHandler={setCoordinates}/>
            <p className='text-muted text-small mt-2'>
              Para elegir varios puntos manten apretada la tecla <kbd>Ctrl</kbd> al momento de hacer los clicks
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Necessity;
