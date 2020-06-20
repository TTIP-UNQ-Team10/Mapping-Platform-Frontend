import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../store/Store.js'
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";
import { selectUserAuthToken } from '../store/selectors/user.js'
import config from '../config.js'
import api from '../api'

const { colors, appLogo } = config


const renderCategoryCard = (category) => {
  const styles = {
    button__show_information: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  return (
    <div className="card public__card" style={{width: '18rem'}}>
      <img src="/map1.svg" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h4 className="card-title public__card_title">{category.name}</h4>
        <p className="card-text public__card_text">
          {category.description}
        </p>
        <Link to={`/mapa-necesidades/${category.name}`} >
          <button className="btn btn-lg"
            style={styles.button__show_information}
          >Ver Información</button>
        </Link>
      </div>
    </div>
  )
}


const renderMappingSection = categories => {
  return (
    <section id="section-3">
      <div className="container">
        <h1>Mapeos</h1>
        <div className="col col-md-12">
          <div className="row">
            { categories.length > 0 ?
                categories.map(categorie => renderCategoryCard(categorie)) : null
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
        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
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
      border: `1px solid ${colors.buttonColor.backgroundColor}`,
      width: '100px',
    },
    button__login_hover: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor,
      border: `1px solid ${colors.buttonColor.backgroundColor}`,
      width: '100px',
    }
  }

  const getButtonClass = () => {
    return loginButtonHover ? styles.button__login_hover : styles.button__login
  }

  const goToLoginPage = () => history.push('/login')

  return (
    <section id="section-1">
      <div className="container-fluid">
        <button
          className="btn pull-right"
          style={getButtonClass()}
          onClick={goToLoginPage}
          onMouseEnter={() => setLoginButtonHover(true)}
          onMouseLeave={() => setLoginButtonHover(false)}
          >Ingresar</button>
          <img src={appLogo} alt="app-logo" className="image__logo"/>
      </div>
    </section>
  )
}


const PublicHome = () => {
  const history = useHistory()
  const [loginButtonHover, setLoginButtonHover] = useState(false)
  const [categories, setCategories] = useState([])

  const { state } = useContext(AppContext)

  // const necesities = [1,1,1,1,1,1,1,1]

  const fetchCategories = async () => {
    const headers = {
      'Auth': selectUserAuthToken(state)
    }

    const onSuccess = response => {
        setCategories(response)
    }

    const onError = error => {
      console.log(error);
    }

    await api.getCategories(headers, onSuccess, onError)
  }

  useEffect(() => {
    if (categories.length < 1) {
      fetchCategories()
    }
  })

  return (
    <div>
      { renderWelcomeSection(history, loginButtonHover, setLoginButtonHover) }
      { renderObjectiveSection() }
      { renderMappingSection(categories) }
    </div>
  )
}


export default PublicHome
