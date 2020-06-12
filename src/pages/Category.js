import React, { useState, useContext } from 'react'
import { AppContext } from '../store/Store.js'
import { useHistory } from 'react-router-dom'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import CategoryTable from '../components/Category/CategoryTable.js'
import CategoryForm from '../components/Category/CategoryForm.js'
import { selectUserAuthToken } from '../store/selectors/user.js'
import {
  createShowSuccessNotificationAction,
  createShowErrorNotificationAction
} from '../store/actions/notification.js'
import api from '../api'

const Category = () => {

  const [categories, setCategories] = useState([])
  const [necessityTypes, setNecessityTypes] = useState([])

  const { state, dispatch } = useContext(AppContext)
  const history = useHistory()

  const headers = {
    'Auth': selectUserAuthToken(state),
    'Content-Type': 'application/json'
  }


  const fetchCategories = async () => {
    const categoriesResponse = await api.getCategories(headers)
    categoriesResponse && !categoriesResponse.error ? setCategories(categoriesResponse) : history.push('/login')
    const necessityTypesResponse = await api.getNecessityTypes(headers)
    setNecessityTypes(necessityTypesResponse)
  }


  useState(() => {
    fetchCategories()
  })


  const onCreateCategory = async (categoryData) => {

    const onSuccess = response => {
      dispatch(createShowSuccessNotificationAction({
        header: '¡Categoría Creada!',
        message: 'La categoría se creó con éxito'
      }))
      categories.push(categoryData)
      setCategories(categories)
    }

    const onError = error => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'Ha ocurrido un error cuando se intentaba crear una categoría'
      }))
    }

    await api.createCatetory(categoryData, headers, onSuccess, onError)
  }


  const onDeleteCategory = async (idx, categoryData) => {

    const onSuccess = response => {
      dispatch(createShowSuccessNotificationAction({
        header: '¡Categoría Eliminada!',
        message: 'La categoría se elimino con éxito'
      }))
    }

    const onError = error => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'Ha ocurrido un error cuando se intentaba eliminar una categoría'
      }))
    }

    await api.removeCategory(categoryData.id, headers, onSuccess, onError)
    categories.splice(idx, 1)
  }


  const onEditCategory = async (category) => {
    const onSuccess = response => {
      dispatch(createShowSuccessNotificationAction({
        header: '¡Categoría Modificada!',
        message: 'La categoría se modificó con éxito'
      }))
    }

    const onError = error => {
      dispatch(createShowErrorNotificationAction({
        header: '¡Error!',
        message: 'Ha ocurrido un error cuando se intentaba modificar una categoría'
      }))
    }

    await api.updateCategory(category.id, category,  headers, onSuccess, onError)
  }


  const handlerInput = (event, handlerFunction) => {
    const { value } = event.target
    handlerFunction(value)
  }

  return (
    <div>
      <Navbar />
      <SideBarMenu />
      <div className="home__body container-fluid">
        <h1>Administración de Categorías</h1>
        <hr/>
        <div className="row justify-content-between mt-5">
          <CategoryForm
            onInputHandler={handlerInput}
            onClickHandler={onCreateCategory}
            necessityTypes={necessityTypes}
          />
          <div className="col-md-8 col-sm-12">
            <CategoryTable categories={categories}
              onDeleteCategory={onDeleteCategory}
              onEditCategory={onEditCategory}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
