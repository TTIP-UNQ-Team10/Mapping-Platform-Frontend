import React from 'react'

const APP_LOGO = '/mapping-platform-logo.svg'

const userInformation = () => {
  const styles = {
    user__icon: {
      fontSize: 26,
      color: '#f3f3f3',
      marginRight: 10,
      verticalAlign: 'middle'
    },
    user__name: {
      fontSize: 12,
      color: '#f3f3f3',
      margin: '0 auto',
      verticalAlign: 'middle'
    }
  }

  return (
    <div className="col col-md-12 col-sm-4 ds-flex flex-row">
      <i className="fa fa-user-circle" style={styles.user__icon} aria-hidden="true" />
      <span style={styles.user__name}>Administrador</span>
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
    }
  }

  return (
    <nav className="navbar navbar-dark bg-dark mb-0">
    <div className="ds-flex flex-row">
      {openSideBarButton}
        <img src={APP_LOGO} alt="mapping-platform-logo" style={styles.image__logo}/>
      </div>
      <div>
        {userInformation()}
      </div>
    </nav>
  )
}

export default Navbar
