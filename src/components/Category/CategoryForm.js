import React, { useState } from 'react'

const storage = window.localStorage

const CategoryForm = ({ onInputHandler, onClickHandler }) => {
  const settings = storage.getItem('styles')
  const config = JSON.parse(settings)
  const { colors } = config
  
  const styles = {
    button__create: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  const [categoryName, setCategoryName] = useState('')

  const clearForm = () => {
    setCategoryName('')
  }

  const onSubmitHandler = async () => {
    const categoryData = {
      name: categoryName
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
      <button type="submit"
        className="btn btn-block btn-dark"
        style={styles.button__create}
        onClick={onSubmitHandler}>Crear Categoría</button>
    </div>
  )
}

export default CategoryForm
