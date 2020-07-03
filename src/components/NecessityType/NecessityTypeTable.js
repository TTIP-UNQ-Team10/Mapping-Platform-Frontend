import React, { useState } from 'react'
import { handlerInput } from '../../utils/utils.js'

const storage = window.localStorage

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
            {
              categories && categories.length > 0 ?
              <ul class="list-group">
                {
                  categories.map(category => {
                    return (
                      <li class="list-group-item">{category.name}</li>
                    )
                  })
                }
                </ul> :
                <span>Sin Categorías</span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}


const renderNecessityCategories = (necessity, idx, colors) => {
  const styles = {
    button__show_categories: {
      backgroundColor: 'transparent',
      border: `1px solid ${colors.buttonColor.backgroundColor}`,
      color: colors.buttonColor.backgroundColor
    },
    badge: {
      backgroundColor: colors.buttonColor.backgroundColor,
      opacity: 0.7,
      color: colors.buttonColor.textColor,
      marginRight: 10
    }
  }

  return (
    <div>
      <span class="badge badge-pill" style={styles.badge}>{necessity.categories.length}</span>
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


const NecessityTypeTable = ({ data, onDeleteNecessityType, onEditNeccesityType }) => {
  const settings = storage.getItem('styles')
  const config = JSON.parse(settings)
  const { colors } = config

  const styles = {
    table__head: {
      backgroundColor: colors.navBarOptions.backgroundColor,
      color: colors.buttonColor.textColor,
      opacity: 0.9,
    }
  }

  const editModeStates = new Array(data.length).fill(false)

  const [editMode, setEditMode] = useState(editModeStates)
  const [necessityEditName, setNecessityEditName] = useState('')


  const onClickDelete = async (idx, necessityType) => {
    await onDeleteNecessityType(idx, necessityType.id)
  }


  const onClickEdit = async (idx, necessityType) => {
    if (!editMode[idx]) {
      editModeStates[idx] = true
      setEditMode(editModeStates)
    } else {
      editModeStates[idx] = false
      if (necessityEditName !== '') {
        data[idx]['name'] = necessityEditName
        await onEditNeccesityType(necessityType)
      }
      setEditMode(editModeStates)
      setNecessityEditName('')
    }
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
              <tr id={`necessityType:${necessityType.id}`} key={`necessity${idx}`}>
                {
                  editMode[idx] ?
                    <input type="text"
                      value={necessityEditName}
                      name="updateNecesssityTypeName"
                      className="form-control table__input"
                      placeholder={necessityType.name}
                      aria-label="Necesidad"
                      aria-describedby="basic-addon1"
                      onInput={e => handlerInput(e, setNecessityEditName)}
                    /> :
                    <th>{necessityType.name}</th>
                }
                <th>{renderNecessityCategories(necessityType, idx, colors)}</th>
                <th className="row" data-toggle="tooltip" data-placement="right">
                  {
                    !editMode[idx] ?
                      <i className="fa fa-edit edit__icon" title="Editar" onClick={() => onClickEdit(idx, necessityType)}/> :
                      <i className="fa fa-save edit__icon" title="Finalizar Edición" onClick={() => onClickEdit(idx, necessityType)}/>
                  }
                  <i className="fa fa-times times__icon" title="Eliminar" onClick={() => onClickDelete(idx, necessityType)}/>
                </th>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}


export default NecessityTypeTable
