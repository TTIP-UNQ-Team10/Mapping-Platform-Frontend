import React, { useContext } from 'react'
import { AppContext } from '../store/Store.js'
import { useHistory } from 'react-router-dom'
import { selectUserState } from '../store/selectors/user.js'

const storage = window.localStorage

const userInformation = (user, isLogged, history, colors) => {
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
          <button className="btn" style={styles.button__login} onClick={goToLoginPage}>Ingresar</button>
      }
    </div>
  )
}

const openSideBarButton = (colors) => {
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
  const settings = storage.getItem('styles')
  const config = JSON.parse(settings)
  const { colors, appLogo } = config

  const styles = {
    image__logo: {
      width: '6vm',
      height: '40px',
      fill: colors.buttonColor.textColor,
      marginLeft: 10,
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
      { isLogged ? openSideBarButton(colors) : null}
        <img src={appLogo} alt="mapping-platform-logo" style={styles.image__logo}/>
      </div>
      <div>
        {userInformation(user, isLogged, history, colors)}
      </div>
    </nav>
  )
}

export default Navbar
