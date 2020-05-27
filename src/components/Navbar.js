import React, { useContext } from 'react'
import { AppContext } from '../store/Store.js'
import { useHistory } from 'react-router-dom'
import { selectUserState } from '../store/selectors/user.js'
import config from '../config.js'
const APP_LOGO = config.appLogo

const { colors } = config

const userInformation = (user, isLogged, history) => {
  const styles = {
    user__icon: {
      fontSize: 26,
      color: colors.navBarOptions.activeColor,
      marginRight: 10,
      verticalAlign: 'middle'
    },
    user__name: {
      fontSize: 12,
      color: colors.navBarOptions.activeColor,
      margin: '0 auto',
      verticalAlign: 'middle'
    },
    button__login: {
      backgroundColor: colors.buttonColor.textColor,
      color: colors.buttonColor.backgroundColor,
    }
  }

  const goToLoginPage = () => {
    history.push('/login')
  }

  return (
    <div className="col col-md-12 col-sm-4 ds-flex flex-row">
      { isLogged ?
        <div>
          <i className="fa fa-user-circle" style={styles.user__icon} aria-hidden="true" />
          <span style={styles.user__name}>{user.name}</span>
        </div> :
          <button className="btn" style={styles.button__login} onClick={goToLoginPage}>Login</button>
      }
    </div>
  )
}

const openSideBarButton = () => {
  const styles = {
    button__sidebar: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  return (
    <a className="btn btn-sm" style={styles.button__sidebar}
      data-toggle="collapse" href="#sidebarMenu"
      role="button" aria-expanded="false"
      aria-controls="collapseExample"
    ><i className="fa fa-bars"/></a>
  )
}


const Navbar = () => {

  const styles = {
    image__logo: {
      width: '6vm',
      height: '40px',
      filter: 'invert(1)',
      marginLeft: 10
    },
    navbar: {
      backgroundColor: colors.navBarOptions.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  const { state } = useContext(AppContext)
  const { user, isLogged } = selectUserState(state)
  const history = useHistory()

  return (
    <nav className="navbar mb-0" style={styles.navbar}>
    <div className="ds-flex flex-row">
      { isLogged ? openSideBarButton() : null}
        <img src={APP_LOGO} alt="mapping-platform-logo" style={styles.image__logo}/>
      </div>
      <h4>{config.name}</h4>
      <div>
        {userInformation(user, isLogged, history)}
      </div>
    </nav>
  )
}

export default Navbar
