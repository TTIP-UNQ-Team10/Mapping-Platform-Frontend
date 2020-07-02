import React, { useState, useContext } from 'react'
import { AppContext } from '../store/Store.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import { handlerInput } from '../utils/utils.js'

const Setting = () => {
  return (
    <div>
      <SideBarMenu />
      <Navbar />
    </div>
  )
}

export default Setting
