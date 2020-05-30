import React, { useState } from 'react'
import config from '../config.js'

const { colors } = config


const CategoryForm = ({ onInputHandler, onClickHandler }) => {
  const styles = {
    button__create: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  const [categoryName, setCategoryName] = useState('')
  const [subCategoryName, setSubCategoryName] = useState('')

  const clearForm = () => {
    setCategoryName('')
    setSubCategoryName('')
  }

  const onSubmitHandler = async () => {
    const categoryData = {
      name: categoryName,
      subCategory: {name: subCategoryName}
    }
    await onClickHandler(categoryData)
    clearForm()
  }


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
      <div className="mb-5 mt-2">
        <label className="pull-left">Nombre de Subcategoría</label>
        <input type="text"
          required
          value={subCategoryName}
          name="subCategory"
          className="form-control"
          placeholder="Ingrese un nombre de subcategoría"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onInput={e => onInputHandler(e, setSubCategoryName)}
        />
      </div>
      <button type="submit"
        className="btn btn-block btn-dark"
        style={styles.button__create}
        onClick={onSubmitHandler}>Guardar Categoría</button>
    </div>
  )
}

export default CategoryForm
