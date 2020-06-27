import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../store/Store.js'
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";
import { selectUserAuthToken } from '../store/selectors/user.js'
import config from '../config.js'
import api from '../api'
import CategoryService from '../services/Category/CategoryService.js';
import NecessityTypeService from '../services/NecessityType/NecessityTypeService.js';

const { colors, appLogo } = config


const renderCategoryCard = (category) => {
  const styles = {
    button__show_information: {
      backgroundColor: 'transparent',
      color: colors.buttonColor.backgroundColor,
      transition: '0.17s'
    }
  }

  return (
    <div className="card public__card mt-5" style={{width: '18rem'}}>
      <div className="card-body">
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


const renderNecessityTypeCard = type => {
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



const renderMappingCategoriesSection = categories => {
  return (
    <section id="section-3">
      <div className="container">
        <h1>Categorías de Mapeos</h1>
        <div className="col col-md-12">
          <div className="row">
            { categories.length > 0 ?
                categories.map(categorie => renderCategoryCard(categorie)) :
                <h3 className="mt-5">No hay categorías cargadas</h3>
            }
          </div>
        </div>
      </div>
    </section>
  )
}


const renderMappingTypesSection = necessityTypes => {
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
                  necessityTypes.map(type => renderNecessityTypeCard(type)) :
                  <h3 className="mt-5">No hay mapeos cargados</h3>
              }
            </div>
          </div>
        </div>
      </section>
    )
}


const renderObjectiveSection = () => {
  const styles = {
    section__background: {
      backgroundColor: colors.navBarOptions.backgroundColor,
      color: colors.primaryText
    }
  }

  return (
    <section id="section-2" style={styles.section__background}>
      <div className="container">
        <h1>Objetivo</h1>
        <h4 className="mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Venenatis tellus in metus vulputate eu scelerisque felis.
        Eget egestas purus viverra accumsan. Nulla aliquet enim tortor at. Placerat duis ultricies lacus sed turpis tincidunt.
        Purus sit amet volutpat consequat mauris. Viverra tellus in hac habitasse platea. Eget nulla facilisi etiam dignissim
        diam quis enim lobortis scelerisque. Enim sit amet venenatis urna. Nullam eget felis eget nunc lobortis mattis aliquam faucibus.
        Dictumst quisque sagittis purus sit amet volutpat consequat. Sagittis nisl rhoncus mattis rhoncus urna neque.
        Bibendum enim facilisis gravida neque convallis a cras. Placerat in egestas erat imperdiet.
        Duis ut diam quam nulla porttitor massa id neque aliquam. Vestibulum lorem sed risus ultricies.
        </h4>
      </div>
    </section>
  )
}


const renderWelcomeSection = (history, loginButtonHover, setLoginButtonHover) => {
  const styles = {
    button__login: {
      backgroundColor: 'transparent',
      color: colors.buttonColor.backgroundColor,
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
      color: colors.buttonColor.backgroundColor,
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
      { renderWelcomeSection(history, loginButtonHover, setLoginButtonHover) }
      { renderObjectiveSection() }
      { renderMappingCategoriesSection(categories) }
      { renderMappingTypesSection(necessityTypes) }
    </div>
  )
}


export default PublicHome
