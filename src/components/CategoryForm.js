import React, { useState } from 'react'
import config from '../config.js'

const { colors } = config


const CategoryForm = ({ onInputHandler, onClickHandler, necessityTypes }) => {
  const styles = {
    button__create: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  const [categoryName, setCategoryName] = useState('')
  const [necessityType, setNecessityType] = useState(null)

  const clearForm = () => {
    setCategoryName('')
    setNecessityType(null)
  }

  const onSubmitHandler = async () => {
    const categoryData = {
      name: categoryName,
      necessityType: necessityType
    }
    await onClickHandler(categoryData)
    clearForm()
  }


  const handleNecessityTypeInput = event => setNecessityType(event.target.value)


  return (
    <div className="col-md-4">
      <div className="mb-3">
        <label className="pull-left">Nombre de Categoría</label>
        <input type="text"
          required
          value={categoryName}
          name="categoryName"
          className="form-control"
          placeholder="Ingrese un nombre de categoría"
          aria-label="Categoría"
          aria-describedby="basic-addon1"
          onInput={e => onInputHandler(e, setCategoryName)}
        />
      </div>
      <label className="pull-left">Tipo de Necesidad</label>
      <select class="form-control" onChange={handleNecessityTypeInput}>
        <option value={null}>Elija un tipo de Necesidad</option>
        {
          necessityTypes.map(necessityType => {
            const necessityTypeName = necessityType.name
            return (
              <option value={necessityTypeName}>{necessityTypeName}</option>
            )
          })
        }
      </select>
      <button type="submit"
        className="btn btn-block btn-dark"
        style={styles.button__create}
        onClick={onSubmitHandler}>Crear Categoría</button>
    </div>
  )
}

export default CategoryForm
