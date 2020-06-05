import React from 'react'
import config from '../config.js'

const { colors } = config

const renderCategoriesModal = (necessity, idx) => {
  const { categories } = necessity

  return (
    <div className="modal fade" id={`modal-${idx}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Categorías de la Necesidad {necessity.name}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            { categories && categories.length > 0 ?
                categories.map(category => {
                  return (
                    <div><span>{category.name}</span><br/></div>
                  )
                }) :
                <span>Sin Categorías</span>
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
      <span>Ver </span><i className="fa fa-eye"/>
      </button>
      {renderCategoriesModal(necessity, idx)}
    </div>
  )
}


const NecessityTable = ({ data, onDeleteNecessityType, onEditNeccesityType }) => {
  const styles = {
    table__head: {
      backgroundColor: colors.navBarOptions.backgroundColor,
      color: colors.buttonColor.textColor,
      opacity: 0.9,
    }
  }


  const deleteNecessityType = async (necessityTypeId) => {
    await onDeleteNecessityType(necessityTypeId)
  }


  const updateNecessityType = async (necessityType) => {
    await onEditNeccesityType(necessityType.id, necessityType)
  }


  return (
    <table className="table table-striped table-md" >
      <thead className="thead" style={styles.table__head}>
        <th style={{width: '65%'}}>Tipo de Necesidad</th>
        <th style={{width: '10%'}}>Categorías</th>
        <th style={{width: '10%'}}></th>
      </thead>
      <tbody>
        {
          data.map(necessityType => {
            const idx = data.indexOf(necessityType).toString()
            return (
              <tr id={`necessityType:${necessityType.id}`}>
                <th>{necessityType.name}</th>
                <th>{renderNecessityCategories(necessityType, idx)}</th>
                <th className="row">
                  <i className="fa fa-edit edit__icon" title="Editar" onClick={updateNecessityType(necessityType)}/>
                  <i className="fa fa-times times__icon" title="Eliminar" onClick={deleteNecessityType(necessityType.id)}/>
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
