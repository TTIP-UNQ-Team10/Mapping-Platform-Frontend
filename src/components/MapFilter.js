import React, { useState } from 'react'

const storage = window.localStorage

const MapFilter = ({ onInputHandler, onSubmitHandler }) => {
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


  const onClickHandler = async () => {
    await onSubmitHandler(categoryName.replace(' ', '%20'))
    clearForm()
  }


  return (
    <div className="container-fluid base__home_body">
      <div className="flex-column form-inline d-flex justify-content-center">
      <input type="text"
          required
          defaultValue={categoryName}
          name="categoryName"
          className="form-control mt-3"
          placeholder="Ingrese un nombre de categoría"
          aria-label="Categoría"
          aria-describedby="basic-addon1"
          onInput={e => onInputHandler(e, setCategoryName)}
        />
      </div>

      <button type="submit"
        className="btn btn-dark mt-3"
        style={styles.button__create}
        onClick={onClickHandler}>Filtrar</button>
    </div>
  )
}

export default MapFilter
