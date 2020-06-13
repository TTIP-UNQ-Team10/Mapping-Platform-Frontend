import React, { useState, useEffect } from 'react'
import config from '../../config.js'

const { colors } = config


const NecessityTypeForm = ({ onInputHandler, onClickHandler, categoriesData }) => {
  const styles = {
    button__create: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  const [necesssityTypeName, setNecessityTypeName] = useState('')
  const [categories, setCategories] = useState([])
  const [hasCategories, setHasCategories] = useState(false)


  useEffect(() => {
    if (categoriesData) {
      setHasCategories(true)
    }
  }, [categoriesData])

  const clearForm = () => {
    setNecessityTypeName('')
    setCategories([])
  }


  const onSubmitHandler = async () => {
    const necessityData = {
      name: necesssityTypeName,
      categories: categories
     }
    await onClickHandler(necessityData)
    clearForm()
  }

  const handleCategoryInput = event => {
    const { value } = event.target
    console.log(value, categories.includes(value))
    if (categories.includes(value)) {
      categories.push(value)
      setCategories(categories)
    } else {
      const idx = categories.indexOf(value)
      categories.splice(idx, value)
      setCategories(categories)
    }
    console.log(categories);
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

      <div className="mb-3">
        <label className="pull-left">Categorías</label>
        <select multiple class="form-control" onInput={handleCategoryInput}>
          {
            hasCategories ?
              categoriesData.map(category => {
                const categoryName = category.name
                return (
                  <option value={categoryName}>{categoryName}</option>
                )
              }) : null
          }
        </select>
      </div>

      <button type="submit"
        className="btn btn-block btn-dark"
        style={styles.button__create}
        onClick={onSubmitHandler}>Crear Tipo de Necesidad</button>
    </div>
  )
}

export default NecessityTypeForm
