import React, { useState } from 'react'
import config from '../config.js'

const { colors } = config


const NecessityForm = ({ onInputHandler, onClickHandler }) => {
  const styles = {
    button__create: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  const [necesssityTypeName, setNecessityTypeName] = useState('')


  const clearForm = () => {
    setNecessityTypeName('')
  }


  const onSubmitHandler = async () => {
    const categoryData = { name: necesssityTypeName }
    await onClickHandler(categoryData)
    clearForm()
  }


  return (
    <div className="col-md-4">
      <div className="mb-3">
        <label className="pull-left">Nombre de Necesidad</label>
        <input type="text"
          required
          value={necesssityTypeName}
          name="necesssityTypeName"
          className="form-control"
          placeholder="Ingrese un nombre para la necesidad"
          aria-label="Necesidad"
          aria-describedby="basic-addon1"
          onInput={e => onInputHandler(e, setNecessityTypeName)}
        />
      </div>

      <button type="submit"
        className="btn btn-block btn-dark"
        style={styles.button__create}
        onClick={onSubmitHandler}>Guardar Necesidad</button>
    </div>
  )
}

export default NecessityForm