import React, { useState } from 'react'
import api from '../api/'

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

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    const userData = {
      username: username,
      passowrd: password
    }

    console.log('Usuario: ', userData)
    api.login(userData, () => {
      console.log('Usuario Logeado!')
    })
  }

  const handlerInput = (event, handlerFunction) => {
    const { value } = event.target
    handlerFunction(value)
  }

  return (
    <div class={styles.form__container}>
      <form onSubmit={login}>
        <div class={styles.login__form}>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                <i className="fa fa-user" />
              </span>
            </div>
            <input type="text"
              required
              name="username"
              class="form-control"
              placeholder="Usuario"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onInput={e => handlerInput(e, setUsername)}
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                <i className="fa fa-lock" />
              </span>
            </div>
            <input type="password"
              required
              name="password"
              class="form-control"
              placeholder="Contraseña"
              aria-label="Password"
              aria-describedby="basic-addon1"
              onInput={e => handlerInput(e, setPassword)}
            />
          </div>
        </div>
        <button type="submit" class="btn btn-dark">Iniciar Sesión</button>
      </form>
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
