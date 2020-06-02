import React from 'react'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import NecessityTable from '../components/NecessityTable.js'
import NecessityForm from '../components/NecessityForm.js'

const Necessity = () => {

  const necessityData = [
    {name: 'Necesidad 1', categories: ['salud', 'transpoete', 'genero']},
    {name: 'Necesidad 2', categories: ['deportes', 'educacion', 'gastronomia', 'musica']}
  ]

  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="home__body container-fluid">
        <h1>Administración de Necesidades</h1>
        <hr/>
        <div className="container row">
          <NecessityForm />
          <div className="col-md-8">
            <NecessityTable data={necessityData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Necessity
