import React, { useState, useEffect } from 'react'
import config from '../../config.js'

const { colors } = config

const NecessityTable = ({ data, showNecessityIntoMap }) => {
  const styles = {
    table__head: {
      backgroundColor: colors.navBarOptions.backgroundColor,
      color: colors.buttonColor.textColor,
      opacity: 0.9,
    }
  }


  const editModeStates = data ? new Array(data.length).fill(false) : []

  const [editMode, setEditMode] = useState(editModeStates)
  const [categoryEditName, setCategoryEditName] = useState('')
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
      <table className="table table-striped table-md" >
        <tbody>
          { isData && data ?
            data.map(necessity => {
              const idx = data.indexOf(necessity).toString()
              return (
                <tr id={`necessity:${necessity.id}`} key={`necessity${idx}`}>
                  <th onClick={() => showNecessityIntoMap(idx, necessity)}>{necessity.name}</th>
                </tr>
              )
            }) : <p>No hay data</p>
          }
        </tbody>
      </table>
    </div>
  )
}

export default NecessityTable
