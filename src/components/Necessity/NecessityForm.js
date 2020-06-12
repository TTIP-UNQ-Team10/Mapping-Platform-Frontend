import React, { useState, useContext, useEffect } from 'react'
import api from '../../api'
import config from '../../config.js'
import { AppContext } from '../../store/Store.js'
import { selectUserAuthToken } from '../../store/selectors/user.js'
import MapComponent from '../../components/Map/MapComponent.js'
import Navbar from '../../components/Navbar.js'
import { Popup } from 'react-leaflet'

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
      default:
    }
  }

  const clearForm = () => {
    setNecessityTypeValue(null)
    setCategoryValue(null)
    setDescriptionValue('')
    setNameValue('')
    setLocationType(null)
  }


  const onClickSummitHandler = async () => {
    const dataObject = {
      name: nameValue,
      type: necessityTypeValue,
      description: descriptionValue,
      category: categoryValue,
      location: {
        type: locationType,
        coordinates: Object.values(coordFromMap)
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
          onInput={e => handlerInput(e, 'name')}
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
          onInput={e => handlerInput(e, 'description')}
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
                <option value={necessityTypeName}>{necessityTypeName}</option>
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
          <option value='circle'>Circulo</option>
          <option value='polygon'>Polígono</option>
          <option value='rectangle'>Línea</option>
        </select>
      </div>
      <div className="mb-3">
        <button type="submit"
        className="btn btn-block btn-dark"
        style={styles.button__create}
        onClick={onClickSummitHandler}>Nuevo Mapeo</button>
      </div>
    </div>
  )
}

export default NecessityForm
