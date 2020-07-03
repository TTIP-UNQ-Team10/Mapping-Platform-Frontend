import React, { useState, useEffect } from 'react'


const NecessityTable = ({ data, showNecessityIntoMap }) => {
  const [isData, setIsData] = useState(false)

  useEffect(() => {
      Promise.resolve(data)
        .then(res => {
          if (res) {
            setIsData(true)
          }
        })
  }, [data])

  return (
    <div className="necessities__table col-md-12">
      {
        isData && data ?
      <table className="table table-striped table-md" >
        <tbody>
          {
            data.map(necessity => {
              const idx = data.indexOf(necessity).toString()
              return (
                <tr id={`necessity:${necessity.id}`} key={`necessity${idx}`}>
                  <th onClick={() => showNecessityIntoMap(idx, necessity)}>{necessity.name}</th>
                </tr>
              )
            })
          }
        </tbody>
      </table>
        :
        <span className="container mt-5">
          <h5>No hay mapeos cargados</h5>
          <h5>Hacer click en 'Nuevo Mapeo' para crear uno</h5>
        </span>
      }
    </div>
  )
}

export default NecessityTable
