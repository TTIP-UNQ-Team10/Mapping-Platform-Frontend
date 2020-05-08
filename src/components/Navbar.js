import React from 'react'


const userInformation = () => {
  const styles = {
    userIcon: {
      fontSize: 38
    },
    userName: {
      fontSize: 20,
      margin: '0.3em 0.3em 0.3em 0.3em'
    }
  }

  return (
    <div className="col col-md-12 col-sm-4 ds-flex flex-row">
      <i className="fa fa-user-circle" style={styles.userIcon} aria-hidden="true">
        <span style={styles.userName}>Nombre de Usuario</span>
      </i>
    </div>
  )
}


const Navbar = () => {
  // const [user] = useState()

  return (
    <nav className="navbar navbar-primary bg-primary">
      <div className="ds-flex flex-row">
        <h3>Mapping Platform</h3>
        {userInformation()}
      </div>
    </nav>
  )
}

export default Navbar
