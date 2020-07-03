import React, { useState } from 'react'
import { handlerInput } from '../../utils/utils.js'

const storage = window.localStorage

const NecessityForm = ({
  necessityTypes,
  coordFromMap,
  categories,
  onSelectNecessityType,
  onHandlerSummit
}) => {
  const settings = storage.getItem('styles')
  const config = JSON.parse(settings)
  const { colors } = config

  const styles = {
    button__create: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  const [necessityTypeValue, setNecessityTypeValue] = useState('')
  const [categoryValue, setCategoryValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [locationType, setLocationType] = useState('')
  const [circleRadius, setCircleRadius] = useState(0)
  const [shapeColor, setShapeColor] = useState('black')

  const handlerNecessityTypeInput = (event) => {
    const { value } = event.target
    onSelectNecessityType(value)
    setNecessityTypeValue(value)
  }

  const clearForm = () => {
    setNecessityTypeValue(null)
    setCategoryValue(null)
    setDescriptionValue('')
    setNameValue('')
    setLocationType(null)
    setCircleRadius(0)
    setShapeColor('black')
  }


  const onClickSummitHandler = async () => {

    const dataObject = {
      name: nameValue,
      type: necessityTypeValue,
      description: descriptionValue,
      category: categoryValue,
      location: {
        type: locationType,
        coordinates: coordFromMap,
        properties: {
          color: shapeColor,
          radius: circleRadius
        }
      }
    }
    await onHandlerSummit(dataObject)
    clearForm()
  }


  return (
    <div className="col-md-12">
      <div className="mb-3">
        <label className="pull-left">Nombre</label>
        <input type="text"
          required
          value={nameValue}
          name="necessityName"
          className="form-control"
          placeholder="Ingrese un nombre del mapeo"
          aria-label="Nombre"
          aria-describedby="basic-addon1"
          onChange={e => handlerInput(e, setNameValue)}
        />
      </div>
      <div className="mb-3">
        <label className="pull-left">Descripción</label>
        <textarea type="text"
          required
          value={descriptionValue}
          name="description"
          className="form-control"
          placeholder="Ingrese alguna descripción del mapeo"
          aria-label="Descripción"
          aria-describedby="basic-addon1"
          onChange={e => handlerInput(e, setDescriptionValue)}
        />
      </div>
      <div className="mb-3">
        <label className="pull-left">Tipo de Necesidad</label>
        <select className="form-control" onChange={e => handlerNecessityTypeInput(e)}>
          <option value={null}>Elija un tipo de Necesidad</option>
          {
            necessityTypes.map(necessityType => {
              const necessityTypeName = necessityType.name
              return (
                <option value={necessityTypeName} key={`${necessityTypeName}option`}>{necessityTypeName}</option>
              )
            })
          }
        </select>
      </div>
      <div className="mb-3">
        <label className="pull-left">Categoría</label>
        <select className="form-control" onChange={e => handlerInput(e, setCategoryValue)} >
          {
            categories.length < 1 ?
              <option value={null}>Primero elija un Tipo de Necesidad</option> :
              <option value={null}>Elija una Categoría</option>
          }
          {
            categories.map(category => {
              const categoryName = category.name
              return (
                <option value={categoryName}>{categoryName}</option>
              )
            })
          }
        </select>
      </div>
      <div className="mb-3">
        <label className="pull-left">Tipo de Marca</label>
        <select className="form-control" onChange={e => handlerInput(e, setLocationType)}>
          <option value={null}>Elija un tipo de marca a graficar</option>
          <option value='marker'>Marca</option>
          <option value='circle'>Círculo</option>
          <option value='polygon'>Polígono</option>
          <option value='rectangle'>Rectángulo</option>
        </select>
      </div>
      {renderExtraPropertiesForLocationType(locationType, handlerInput, setShapeColor, setCircleRadius)}
      <div className="mb-4">
        <button type="submit"
        className="btn btn-block btn-dark"
        style={styles.button__create}
        onClick={onClickSummitHandler}>Cargar Mapeo</button>
      </div>
    </div>
  )
}


const renderExtraPropertiesForLocationType = (locationType, handlerInput, setShapeColor, setCircleRadius) => (
  <div className="mb-3">
    {
      locationType !== 'marker' ?
        <div>
          <label className="pull-left">Color</label>
          <input type="text"
            required
            name="cilcleRadius"
            className="form-control"
            placeholder="Ingrese un color"
            aria-label="Radio"
            aria-describedby="basic-addon1"
            onChange={e => handlerInput(e, setShapeColor)}
          />
        </div> : null
    }
    {
      locationType === 'circle' ?
        <div>
          <label className="pull-left">Radio</label>
          <input type="number"
            required
            name="circleRadius"
            className="form-control"
            placeholder="Ingrese el un número para indicar el radio del círculo"
            aria-label="Radio"
            aria-describedby="basic-addon1"
            onChange={e => handlerInput(e, setCircleRadius)}
          />
        </div> : null
    }
  </div>
)



export default NecessityForm
