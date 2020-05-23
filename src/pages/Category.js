import React, { useState, useContext } from 'react'
import { AppContext } from '../store/Store.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import { selectUserAuthToken } from '../store/selectors/user.js'
import {
  createShowSuccessNotificationAction,
  createShowErrorNotificationAction
} from '../store/actions/notification.js'
import api from '../api'
import config from '../config.js'

const { colors } = config

const categoryList = (categories) => {

  const styles = {
    table__head: {
      backgroundColor: colors.navBarOptions.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  return (
    <table className="table table-striped">
      <thead className="thead" style={styles.table__head}>
        <th>Categoría</th>
        <th>Sub Categoría</th>
      </thead>
      <tbody>
        {
          categories.map(category => {
            return (
              <tr id={`category:${category.id}`}>
                <th>{category.name}</th>
                <th>{category.subCategory.name}</th>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}


const Category = () => {

  const styles = {
    button__create: {
      backgroundColor: colors.buttonColor.backgroundColor,
      color: colors.buttonColor.textColor
    }
  }

  const [categoryName, setCategoryName] = useState('')
  const [subCategoryName, setSubCategoryName] = useState('')
  const [categories, setCategories] = useState([])
  const { state, dispatch } = useContext(AppContext)
  const headers = {
    'Auth': selectUserAuthToken(state),
    'Content-Type': 'application/json'
  }


  const fetchCategories = async () => {
    const response = await api.getCategories(headers)
    setCategories(response)
  }


  useState(() => {
    fetchCategories()
  })

  const clearForm = () => {
    setCategoryName('')
    setSubCategoryName('')
  }


  const onClickCategory = async () => {

    const categoryData = {
      name: categoryName,
      subCategory: {name: subCategoryName}
    }

    clearForm()
    categories.push(categoryData)
    setCategories(categories)

    const onSuccess = response => {
      dispatch(createShowSuccessNotificationAction({
        header: '¡Categoría creada con éxito!',
        message: `La categoría ${response.data.name} se creó con éxito`
      }))
      console.log('suceesss', response)
    }

    const onError = error => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error al crear una categoría!',
        message: 'Ha ocurrido un error cuando se intentaba crear la categoría'
      }))
    }

    await api.createCatetory(categoryData, onSuccess, headers, onError)
  }


  const handlerInput = (event, handlerFunction) => {
    const { value } = event.target
    handlerFunction(value)
  }


  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="container mt-5">
        <h2>Lista de Categorías</h2>
        {
          categories.length === 0 ? <bold>No hay categorías</bold> :
          <div className="container">
            {categoryList(categories)}
          </div>
        }
      </div>
      <div className="container">
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
            onInput={e => handlerInput(e, setCategoryName)}
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
            onInput={e => handlerInput(e, setSubCategoryName)}
          />
        </div>
        <button type="submit" className="btn btn-dark mt-5" style={styles.button__create} onClick={onClickCategory}>Guardar Categoría</button>
      </div>
    </div>
  )
}

export default Category
