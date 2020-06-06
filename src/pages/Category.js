import React, { useState, useContext } from 'react'
import { AppContext } from '../store/Store.js'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import CategoryTable from '../components/CategoryTable.js'
import CategoryForm from '../components/CategoryForm.js'
import { selectUserAuthToken } from '../store/selectors/user.js'
import {
  createShowSuccessNotificationAction,
  createShowErrorNotificationAction
} from '../store/actions/notification.js'
import api from '../api'

const Category = () => {

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


  const onClickCategory = async (categoryData) => {

    const onSuccess = response => {
      dispatch(createShowSuccessNotificationAction({
        header: '¡Categoría creada con éxito!',
        message: 'La categoría se creó con éxito'
      }))
      categories.push(categoryData)
      setCategories(categories)
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
      <div className="home__body container-fluid">
        <h1>Administración de Categorías</h1>
        <hr/>
        <div className="row justify-content-between mt-5">
          <CategoryForm
            onInputHandler={handlerInput}
            onClickHandler={onClickCategory}
          />
          <div className="col-md-8 col-sm-12">
            <CategoryTable data={categories}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
