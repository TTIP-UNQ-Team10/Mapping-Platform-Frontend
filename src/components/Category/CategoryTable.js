import React, { useState, useContext } from 'react'
import { AppContext } from '../../store/Store.js'
import { handlerInput } from '../../utils/utils.js'
import { selectSettingsState } from '../../store/selectors/settings.js'


const CategoryTable = ({ categories, onDeleteCategory, onEditCategory}) => {
  const { state } = useContext(AppContext)
  const { config } = selectSettingsState(state)
  const { colors } = config

  const styles = {
    table__head: {
      backgroundColor: colors.navBarOptions.backgroundColor,
      color: colors.buttonColor.textColor,
      opacity: 0.9,
    },
    table_item: {
      color: colors.primaryText.color
    }
  }

  const editModeStates = new Array(categories.length).fill(false)

  const [editMode, setEditMode] = useState(editModeStates)
  const [categoryEditName, setCategoryEditName] = useState('')


  const onClickDelete = async (idx, category) => {
      await onDeleteCategory(idx, category)
  }


  const onClickEdit = async (idx, category) => {
    if (!editMode[idx]) {
      editModeStates[idx] = true
      setEditMode(editModeStates)
    } else {
      editMode[idx] = false
      if (categoryEditName !== '') {
        categories[idx]['name'] = categoryEditName
        await onEditCategory(category)
      }
      setEditMode(editModeStates)
      setCategoryEditName('')
    }
  }


  return (
    <table className="table table-striped table-md" >
      <thead className="thead" style={styles.table__head}>
        <th style={{width: '65%'}}>Categorías</th>
        <th style={{width: '10%'}}/>
        <th style={{width: '10%'}}></th>
      </thead>
      <tbody>
        {
          categories.map(category => {
            const idx = categories.indexOf(category).toString()
            return (
              <tr id={`category:${category.id}`} key={`category${idx}`}>
                {
                  editMode[idx] ?
                    <input type="text"
                      value={categoryEditName}
                      name="updateCategoryName"
                      className="form-control table__input"
                      placeholder={category.name}
                      aria-label="Categoría"
                      aria-describedby="basic-addon1"
                      onInput={e => handlerInput(e, setCategoryEditName)}
                    /> :
                    <th style={styles.table_item}>{category.name}</th>
                }
                <th/>
                <th className="row">
                {
                  !editMode[idx] ?
                  <i className="fa fa-edit edit__icon" title="Editar" onClick={() => onClickEdit(idx, category)} /> :
                  <i className="fa fa-save edit__icon" title="Finalizar Edición" onClick={() => onClickEdit(idx, category)} />
                }
                <i className="fa fa-times times__icon" title="Eliminar" onClick={() => onClickDelete(idx, category)} />
                </th>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default CategoryTable
