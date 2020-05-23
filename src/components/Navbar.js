import React, { useContext } from 'react'
import { AppContext } from '../store/Store.js'
import { selectUserState } from '../store/selectors/user.js'
import config from '../config.js'
const APP_LOGO = config.appLogo || '/mapping-platform-logo.svg'

const userInformation = (user) => {
  const styles = {
    user__icon: {
      fontSize: 26,
      color: config.colors.navBarOptions.activeColor,
      marginRight: 10,
      verticalAlign: 'middle'
    },
    user__name: {
      fontSize: 12,
      color: config.colors.navBarOptions.activeColor,
      margin: '0 auto',
      verticalAlign: 'middle'
    }
  }

  return (
    <div className="col col-md-12 col-sm-4 ds-flex flex-row">
      <i className="fa fa-user-circle" style={styles.user__icon} aria-hidden="true" />
      <span style={styles.user__name}>{user.name}</span>
    </div>
  )
}

const openSideBarButton = (
  <a className="btn btn-sm btn-dark"
    data-toggle="collapse" href="#sidebarMenu"
    role="button" aria-expanded="false"
    aria-controls="collapseExample"
  ><i className="fa fa-bars"/></a>
)


const Navbar = () => {

  const styles = {
    image__logo: {
      width: '6vm',
      height: '40px',
      filter: 'invert(1)',
      marginLeft: 10
    },
    navbar: {
      backgroundColor: config.colors.navBarOptions.backgroundColor
    }
  }

  const { state } = useContext(AppContext)
  const { user } = selectUserState(state)

  return (
    <nav className="navbar mb-0" style={styles.navbar}>
    <div className="ds-flex flex-row">
      {openSideBarButton}
        <img src={APP_LOGO} alt="mapping-platform-logo" style={styles.image__logo}/>
      </div>
      <div>
        {userInformation(user)}
      </div>
    </nav>
  )
}

export default Navbar
