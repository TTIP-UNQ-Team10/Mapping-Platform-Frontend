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

  const [categoryName, setCategoryName] = useState('')
  const [subCategoryName, setSubCategoryName] = useState('')
  const [categories, setCategories] = useState([])
  const { dispatch } = useContext(AppContext)
  const headers = {
    'Auth': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YTM3MWEyYy0yYjVlLTRjMTYtOTE0NC1lOGVhMTM3YTVkOTQiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU5MDg2NTkyNSwiZXhwIjoxNTkwODY5NTI1fQ.00zlGCbh8Lo3of7yewO6V9eBr-zaJ6JQ4cokZ5bIork",
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


  const onClickCategory = async (categoryData) => {

    const onSuccess = response => {
      dispatch(createShowSuccessNotificationAction({
        header: '¡Categoría creada con éxito!',
        message: 'La categoría se creó con éxito'
      }))
      clearForm()
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
