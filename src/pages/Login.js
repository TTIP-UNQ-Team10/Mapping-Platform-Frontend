import React, { useState, useContext } from 'react'
import api from '../api/'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../store/Store.js'
import { createLoginSuccessAction, createLoginErrorAction } from '../store/actions/user.js'
import { createShowErrorNotificationAction } from '../store/actions/notification.js'
import { selectSettingsState } from '../store/selectors/settings.js'


const LoginCard = ({ config }) => {
  const history = useHistory()
  const { dispatch } = useContext(AppContext)
  const { colors } = config


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const styles = {
    login__form: {
      marginBottom: 40
    },
    form__container: {
      marginTop: 50
    },
    button__login: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  const onClickLogin = async () => {
    const userData = {
      email: username,
      password: password
    }

    const onSuccess = response => {
      dispatch(createLoginSuccessAction({
         id: 1,
         name: userData.email,
         email: userData.email,
         authToken: response.token
       }))
      history.push('/home')
    }

    const onError = (error) => {
      dispatch(createLoginErrorAction())
      dispatch(createShowErrorNotificationAction({
        header: '¡Error de Autenticación!',
        message: 'El Usuario o la Contraseña son incorrectas'
      }))
    }

    await api.login(userData, onSuccess, onError)
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
        <button type="submit" className="btn" style={styles.button__login} onClick={onClickLogin}>Iniciar Sesión</button>
    </div>
  )
}



const Login = () => {
  const { state } = useContext(AppContext)
  const { config } = selectSettingsState(state)
  const { appLogo } = config

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
        src={appLogo}
        alt="mapping-platform-logo"
        style={styles.image}
      />
      <LoginCard config={config}/>
    </div>
  )
}

export default Login
