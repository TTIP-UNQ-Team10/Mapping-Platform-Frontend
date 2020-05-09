import React, { useState } from 'react'
import api from '../api/'
import { useHistory } from 'react-router-dom'

const APP_LOGO = '/mapping-platform-logo.svg'


const LoginCard = () => {
  const styles = {
    login__form: {
      marginBottom: 40
    },
    form__container: {
      marginTop: 50
    }
  }
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onClickLogin = async () => {
    const userData = {
      email: username,
      password: password
    }

    const onSuccess = response => {
      const Storage = window.localStorage
      Storage.setItem('token', response.token)
      history.push('/')
    }

    await api.login(userData, onSuccess)
  }

  const handlerInput = (event, handlerFunction) => {
    const { value } = event.target
    handlerFunction(value)
  }

  return (
    <div className={styles.form__container}>
        <div className={styles.login__form}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa fa-user" />
              </span>
            </div>
            <input type="text"
              required
              name="username"
              className="form-control"
              placeholder="Usuario"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onInput={e => handlerInput(e, setUsername)}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa fa-lock" />
              </span>
            </div>
            <input type="password"
              required
              name="password"
              className="form-control"
              placeholder="Contraseña"
              aria-label="Password"
              aria-describedby="basic-addon1"
              onInput={e => handlerInput(e, setPassword)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-dark" onClick={onClickLogin}>Iniciar Sesión</button>
    </div>
  )
}



const Login = () => {

  const styles = {
    image: {
      width: '30vw',
      height: '30vh',
      margin: '0 auto'
    },
    login__form__container: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '30vw',
      width: '30vm',
      height: '100%',
      margin: '0 auto',
      paddingTop: 50,
    }
  }

  return (
    <div style={styles.login__form__container}>
      <img
        src={APP_LOGO}
        alt="mapping-platform-logo"
        style={styles.image}
      />
      <LoginCard />
    </div>
  )
}

export default Login
