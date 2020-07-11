import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../store/Store.js'
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";
import CategoryService from '../services/Category/CategoryService.js';
import NecessityTypeService from '../services/NecessityType/NecessityTypeService.js';

const storage = window.localStorage

const renderCategoryCard = (category, config) => {
  const { colors } = config

  const styles = {
    button__show_information: {
      backgroundColor: 'transparent',
      color: colors.primaryText.color,
      transition: '0.17s'
    },
    cards: {
      backgroundColor: colors.appBackgroundColor.backgroundColor,
      width: '18rem',
      color: colors.primaryText.color
    }
  }

  return (
    <div className="card public__card mt-5" style={styles.cards}>
      <div className="card-body" style={styles.cards}>
        <h4 className="card-title public__card_title">{category.name}</h4>
        <Link to={`/necessities/${category.name}`} >
          <button className="btn btn-md public__button"
            style={styles.button__show_information}
          >Ver Mapeo</button>
        </Link>
      </div>
    </div>
  )
}


const renderNecessityTypeCard = (type, config) => {
  const { colors } = config

  const styles = {
    button__show_information: {
      backgroundColor: 'transparent',
      color: colors.buttonColor.textColor,
      transition: '0.17s'
    }
  }

  return (
    <div className="card public__card_secondary mt-5" style={{width: '18rem'}}>
      <div className="card-body">
        <h4 className="card-title public__card_title">{type.name}</h4>
        <Link to={`/necessities/type/${type.name}`} >
          <button className="btn btn-md public__button"
            style={styles.button__show_information}
          >Ver Mapeo</button>
        </Link>
      </div>
    </div>
  )
}



const renderMappingCategoriesSection = (categories, config) => {
  return (
    <section id="section-3">
      <div className="container">
        <h1>Categorías de Mapeos</h1>
        <div className="col col-md-12">
          <div className="row">
            { categories.length > 0 ?
                categories.map(category => renderCategoryCard(category, config)) :
                <h3 className="mt-5">No hay categorías cargadas</h3>
            }
          </div>
        </div>
      </div>
    </section>
  )
}


const renderMappingTypesSection = (necessityTypes, config) => {
  const { colors } = config

  const styles = {
    section__background: {
      backgroundColor: colors.navBarOptions.backgroundColor,
      color: colors.buttonColor.textColor,
      filter: 'saturate(0.8)'
    }
  }

    return (
      <section id="section-4" style={styles.section__background}>
        <div className="container">
          <h1>Tipos de Mapeos</h1>
          <div className="col col-md-12">
            <div className="row">
              { necessityTypes.length > 0 ?
                  necessityTypes.map(type => renderNecessityTypeCard(type, config)) :
                  <h3 className="mt-5">No hay mapeos cargados</h3>
              }
            </div>
          </div>
        </div>
      </section>
    )
}


const renderObjectiveSection = (config) => {
  const { colors } = config
  const styles = {
    section__background: {
      backgroundColor: colors.navBarOptions.backgroundColor,
      color: colors.secondaryText.color
    },
    secondaryColorText: {
      color: colors.secondaryText.color
    }
  }

  return (
    <section id="section-2" style={styles.section__background}>
      <div className="container">
        <h1>Objetivo</h1>
        <h4 className="mt-5" styles={styles.secondaryColorText}>
          <p align='center' styles={styles.secondaryColorText}>
            Kintun es una aplicación de mapeo que permite visualizar diferentes necesidades sociales y ambientales.
            <br />
            <br />
            Este proyecto surgió como resultado de relevamientos realizados a organizaciones no gubernamentales. De esta forma, se detectó la posibilidad de unificar distintas plataformas de mapeo con diferentes problemáticas.
          </p>
        </h4>
      </div>
    </section>
  )
}


const renderWelcomeSection = (history, loginButtonHover, setLoginButtonHover, config) => {
  const { colors, appLogo } = config

  const styles = {
    button__login: {
      backgroundColor: 'transparent',
      color: colors.primaryText.color,
      border: `.5px solid ${colors.buttonColor.backgroundColor}`,
      borderRadius: 15,
      padding: '1em 1em 1em 1em'
    },
    button__login_hover: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor,
      border: `.5px solid ${colors.buttonColor.backgroundColor}`,
      borderRadius: 15,
      padding: '1em 1em 1em 1em'
    },
    button__show_information: {
      backgroundColor: 'transparent',
      color: colors.primaryText.color,
      transition: '0.3s'
    }
  }

  const getButtonClass = () => {
    return loginButtonHover ? styles.button__login_hover : styles.button__login
  }

  const goToLoginPage = () => history.push('/login')

  return (
    <section id="section-1">
      <div className="container-fluid mb-5">
        <button
          className="btn pull-right"
          style={getButtonClass()}
          onClick={goToLoginPage}
          onMouseEnter={() => setLoginButtonHover(true)}
          onMouseLeave={() => setLoginButtonHover(false)}
          >Ingresar</button>
          <img src={appLogo} alt="app-logo" className="image__logo"/>
      </div>
      <div className="container-fluid col-md-8">
        <a className="btn btn-lg public__button" href="#section-3"
          style={styles.button__show_information}>
          Categorías
        </a>
        <a className="btn btn-lg public__button" href="#section-4"
          style={styles.button__show_information}>
          Tipos
        </a>
        <a className="btn btn-lg public__button" href="/necessities"
          style={styles.button__show_information}>
          Mapa
        </a>
      </div>
    </section>
  )
}


const PublicHome = () => {
  const history = useHistory()
  const [loginButtonHover, setLoginButtonHover] = useState(false)
  const [categories, setCategories] = useState([])
  const [necessityTypes, setNecessityTypes] = useState([])

  const { state } = useContext(AppContext)
  const settings = storage.getItem('styles')
  const config = JSON.parse(settings)

  const fetchCategories = async () => {
    const categoryService = new CategoryService()
    categoryService.fetchCategories(setCategories, state, history)
  }


  const fetchNecessityTypes = async () => {
    const necessityTypeService = new NecessityTypeService()
    necessityTypeService.getNecessityTypes(state, setNecessityTypes)
  }


  useEffect(() => {
    if (categories.length < 1) {
      fetchCategories()
    }
    if (necessityTypes.length < 1) {
      fetchNecessityTypes()
    }
  })

  return (
    <div>
      { renderWelcomeSection(history, loginButtonHover, setLoginButtonHover, config) }
      { renderObjectiveSection(config) }
      { renderMappingCategoriesSection(categories, config) }
      { renderMappingTypesSection(necessityTypes, config) }
    </div>
  )
}


export default PublicHome
