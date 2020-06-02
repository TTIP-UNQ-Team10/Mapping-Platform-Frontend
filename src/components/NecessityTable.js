import React from 'react'
import config from '../config.js'

const { colors } = config

const renderCategoriesModal = (necessity, idx) => {
  return (
    <div className="modal fade" id={`modal-${idx}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{necessity.name}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {
              necessity.categories.map(category => {
                return (
                  <div><span>{category}</span><br/></div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}


const renderNecessityCategories = (necessity, idx) => {
  const styles = {
    button__show_categories: {
      backgroundColor: 'transparent',
      border: `1px solid ${colors.buttonColor.backgroundColor}`,
      color: colors.buttonColor.backgroundColor
    }
  }

  return (
    <div>
      <button type="button" className="btn btn-sm"
      style={styles.button__show_categories}
        data-toggle="modal" data-target={`#modal-${idx}`}
      >
        Ver Categorías
      </button>
      {renderCategoriesModal(necessity, idx)}
    </div>
  )
}


const NecessityTable = ({ data }) => {
  const styles = {
    table__head: {
      backgroundColor: colors.navBarOptions.backgroundColor,
      color: colors.buttonColor.textColor,
      opacity: 0.9,
    }
  }

  return (
    <table className="table table-striped table-md" >
      <thead className="thead" style={styles.table__head}>
        <th style={{width: '90%'}}>Necesidad</th>
        <th style={{width: '10%'}}>Categorías</th>
        <th style={{width: '10%'}}></th>
      </thead>
      <tbody>
        {
          data.map(necessity => {
            const idx = data.indexOf(necessity).toString()
            return (
              <tr id={`necessity:${necessity.id}`}>
                <th>{necessity.name}</th>
                <th>{renderNecessityCategories(necessity, idx)}</th>
                <th className="row">
                  <i className="fa fa-edit edit__icon" title="Editar"/>
                  <i className="fa fa-times times__icon" title="Eliminar"/>
                </th>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default NecessityTable
