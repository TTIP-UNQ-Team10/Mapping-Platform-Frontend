import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../store/Store.js'
import MapComponent from '../components/Map/MapComponent.js'
import NecessityForm from '../components/Necessity/NecessityForm.js'
import NecessityTable from '../components/Necessity/NecessityTable.js'
import Filter from '../components/Necessity/Filter.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import NecessityService from '../services/Necessity/NecessityService'
import CategoryService from '../services/Category/CategoryService.js'
import { disabledFilter } from '../utils/utils.js'

const necessityService = new NecessityService()
const categoryService = new CategoryService()
const storage = window.localStorage

const renderMiniNavbar = (mode, setMode, setDataToMap, colors) => {
  const styles = {
    nav__pill: {
      backgroundColor: colors.backgroundColor,
      color: colors.buttonColor.backgroundColor
    },
    active: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor,
      border: `1px dashed ${colors.buttonColor.textColor}`
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
    <div className="col-md-12 mb-5">
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item col-md-6" role="presentation">
          <a className="nav-link active pill__button" href="pill-table" style={getPillStyleClass('table')}
            id="pills-profile-tab" data-toggle="pill" onClick={() => { setMode('table'); setDataToMap(null)  }}
            role="tab" aria-controls="pills-profile" aria-selected="false">Necesidades
          </a>
        </li>
        <li className="nav-item col-md-6" role="presentation">
          <a className="nav-link pill__button" href="pill-form" style={getPillStyleClass('form')}
            id="pills-home-tab" data-toggle="pill" onClick={() => { setMode('form'); setDataToMap(null) }}
            role="tab" aria-controls="pills-home" aria-selected="true">Nuevo Mapeo
          </a>
        </li>
      </ul>
    </div>
  )
}

const Necessity = (props) => {

  const [necessityList, setNecessityList] = useState(null);
  const [dataToMap, setDataToMap] = useState(null)
  const [mode, setMode] = useState('table')
  const [coordinates, setCoordinates] = useState(null)
  const [necessityTypes, setNecessityTypes] = useState([])
  const [categories, setCategories] = useState([])
  const [necessityTypesIsFetched, setNecessityTypesIsFetched] = useState(false)
  const [title, setTitle] = useState('')
  const [filterEnable, setFilterEnable] = useState([true, true])

  const { state, dispatch } = useContext(AppContext)

  const [publicHomeFilter, setPublicHomeFilter] = useState(null)
  const settings = storage.getItem('styles')
  const config = JSON.parse(settings)
  const { colors } = config


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

  const fetchNecessitiesByCategory = async (category) => {
    await necessityService.getNecessitiesByCategory(category, setDataToMap, dispatch, state)
  }

  const showNecessitiesByCategory = async (category) => {
    setDataToMap(await fetchNecessitiesByCategory(category))
  }

  const fetchFilteredData = async (category, necessityType) => {
    if (category) {
      setPublicHomeFilter(category)
      showNecessitiesByCategory(category)
      onCategoryFilterOption(category)
    }
    if (necessityType) {
      setPublicHomeFilter(necessityType)
      onNecessityTypeFilterOption(necessityType)
    }
  }


  useEffect(() => {
    if (!necessityList && !publicHomeFilter) {
      fetchNecessities()
      fetchCategories()
    }
  })

  useEffect(() => {
    const { category } = props.match.params
    const { necessityType } = props.match.params
    if (!dataToMap && !publicHomeFilter && (category || necessityType)) {
      fetchFilteredData(category, necessityType)
    }
  })


  useEffect(() => {
    if (!necessityTypesIsFetched && necessityTypes.length < 1) {
      fetchNecessityTypes()
      setNecessityTypesIsFetched(true)
    }
  },[necessityTypes, necessityTypesIsFetched])


  const getCategoriesByNecessityType = (necessity) => {
    fetchCategoriesByNecessityType(necessity)
  }


  const saveNecessity = async (data) => {
    await necessityService.saveNecessity(data, dispatch, necessityList, setNecessityList, state)
    setDataToMap(null)
  }

  const onCategoryFilterOption = async (category) => {
    disabledFilter(category, filterEnable, setFilterEnable, 1)
    await necessityService.onCategoryFilterOption(category, state, setNecessityList)
  }


  const onNecessityTypeFilterOption = async (necessityType) => {
    disabledFilter(necessityType, filterEnable, setFilterEnable, 0)
    await necessityService.onNecessityTypeFilterOption(necessityType, setNecessityList, state)
  }


 const styles = {
   body__title_background: {
     color: colors.buttonColor.textColor,
     backgroundColor: colors.navBarOptions.backgroundColor,
     filter: 'opacity(85%)'
   }
 }

  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="body__title" style={styles.body__title_background}>
        <h2>Necesidades</h2>
      </div>
      <div className="container-fluid home__body mb-5">
        <div className="row mt-5">
          <div className="row col-md-12 mb-3 top_body">
            <div className="col-md-2 pb-4">
              <Filter data={categories} onSelectFilter={onCategoryFilterOption} type={'Categoría'} enable={filterEnable[0]}/>
            </div>
            <div className="col-md-2 pb-4">
              <Filter data={necessityTypes} onSelectFilter={onNecessityTypeFilterOption} type={'Tipo'} enable={filterEnable[1]}/>
            </div>
            <div className="col-md-8 pb-3 necessity-info">
              <div className="col-md-8">
                <h4>{title.name}</h4>
              </div>
              <div className="col-md-8 pt-1">
                <p>{title.description}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            {renderMiniNavbar(mode, setMode, setDataToMap, colors)}
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
            <MapComponent data={dataToMap} onClickMapHandler={setCoordinates} />
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
