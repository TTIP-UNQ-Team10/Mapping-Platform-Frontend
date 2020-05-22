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

const categoryList = (categories) => {

  return (
    categories.map(category => {
      return (
        <li>
          <p>Nombre de categoría</p>
          <p>categoria 1</p>
          <p>Subcategoria</p>
          <p>subcategoria 1</p>
        </li>
      )
    })
  )
}


const Category = () => {

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
    console.log('response data: ', response)
    return response.data
  }


  useState(() => {
    console.log('useState')
    setCategories(fetchCategories())
    console.log(categories)
  })


  const onClickCategory = async () => {

    const categoryData = {
      name: categoryName,
      subCategory: subCategoryName
    }

    const onSucces = (response) => {
      dispatch(createShowSuccessNotificationAction({
        header: '¡Categoría creada con éxito!',
        message: `La categoría ${response.data.name} se creó con éxito`
      }))
      categories.push(response.data)
      setCategories(categories)
    }

    const onError = (error) => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error al crear una categoría!',
        message: 'Ha ocurrido un error cuando se intentaba crear la categoría'
      }))
    }

    await api.createCatetory(categoryData, headers, onSucces, onError)
  }


  const handlerInput = (event, handlerFunction) => {
    const { value } = event.target
    handlerFunction(value)
  }


  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <h5>Lista de Categorías</h5>
      {
        categories.length > 0 ?
        <ul>
          {categoryList(categories)}
        </ul> :
        <bold>No hay categorías</bold>
      }
      <div>
        <input type="text"
          required
          name="categoryName"
          className="form-control"
          placeholder="Ingrese un nombre de categoría"
          aria-label="Categoría"
          aria-describedby="basic-addon1"
          onInput={e => handlerInput(e, setCategoryName)}
        />
        <input type="text"
          required
          name="subCategory"
          className="form-control"
          placeholder="Ingrese un nombre de subcategoría"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onInput={e => handlerInput(e, setSubCategoryName)}
        />
        <button type="submit" className="btn btn-dark" onClick={onClickCategory}>Guardar Categoría</button>
      </div>
    </div>
  )
}

export default Category
