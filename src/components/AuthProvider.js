import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import { AppContext } from '../store/Store.js'

const AuthProvider = ({ Component, ...props }) => {
  const { state } = useContext(AppContext)

  return state.userState.isLogged ? (
    <Component {...props} />
  ) : (
    <Redirect to={"/login"} />
  )
}

export default AuthProvider
