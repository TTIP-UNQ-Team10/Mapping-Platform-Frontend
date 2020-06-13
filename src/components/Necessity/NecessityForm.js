import React, { useState } from 'react'
import config from '../../config.js'

const { colors } = config

const NecessityForm = ({
  necessityTypes,
  coordFromMap,
  categories,
  onSeclectNecessityType,
  onHandlerSummit
}) => {
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

  const handlerInput = (event, type) => {
    const { value } = event.target
    switch (type) {
      case 'necessityType':
        onSeclectNecessityType(value)
        setNecessityTypeValue(value)
        break
      case 'category':
        setCategoryValue(value)
        break
      case 'description':
        setDescriptionValue(value)
        break
      case 'name':
        setNameValue(value)
        break
      case 'locationType':
        setLocationType(value)
        break
      case 'circle-radius':
        setCircleRadius(value)
        break
      case 'shape-color':
        setShapeColor(value)
        break
      default:
    }
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
          onChange={e => handlerInput(e, 'name')}
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
          onChange={e => handlerInput(e, 'description')}
        />
      </div>
      <div className="mb-3">
        <label className="pull-left">Tipo de Necesidad</label>
        <select className="form-control" onChange={e => handlerInput(e, 'necessityType')}>
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
        <select className="form-control" onChange={e => handlerInput(e, 'category')} >
          {
            categories.length < 1 ?
              <option value={null}>Primero eliga un Tipo de Necesidad</option> :
              <option value={null}>Elija una Categoría</option>
          }
          {
            categories.map(necessityType => {
              const necessityTypeName = necessityType.name
              return (
                <option value={necessityTypeName}>{necessityTypeName}</option>
              )
            })
          }
        </select>
      </div>
      <div className="mb-3">
        <label className="pull-left">Tipo de Marca</label>
        <select className="form-control" onChange={e => handlerInput(e, 'locationType')}>
          <option value={null}>Elija un tipo de marca a graficar</option>
          <option value='marker'>Marca</option>
          <option value='circle'>Círculo</option>
          <option value='polygon'>Polígono</option>
          <option value='rectangle'>Rectangulo</option>
        </select>
      </div>
      {renderExtraPropertiesForLocationType(locationType, handlerInput)}
      <div className="mb-4">
        <button type="submit"
        className="btn btn-block btn-dark"
        style={styles.button__create}
        onClick={onClickSummitHandler}>Cargar Mapeo</button>
      </div>
    </div>
  )
}


const renderExtraPropertiesForLocationType = (locationType, handlerInput) => (
  <div className="mb-3">
    {
      locationType !== 'marker' ?
        <div>
          <label className="pull-left">Color</label>
          <input type="text"
            required
            name="cilcleRadius"
            className="form-control"
            placeholder="Ingrese el un número para indicar el radio del círculo"
            aria-label="Radio"
            aria-describedby="basic-addon1"
            onChange={e => handlerInput(e, 'shape-color')}
          />
        </div> : null
    }
    {
      locationType === 'circle' ?
        <div>
          <label className="pull-left">Radio</label>
          <input type="number"
            required
            name="cilcleRadius"
            className="form-control"
            placeholder="Ingrese el un número para indicar el radio del círculo"
            aria-label="Radio"
            aria-describedby="basic-addon1"
            onChange={e => handlerInput(e, 'circle-radius')}
          />
        </div> : null
    }
  </div>
)



export default NecessityForm
