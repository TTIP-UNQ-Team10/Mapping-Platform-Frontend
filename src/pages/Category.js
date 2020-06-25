import React, { useState, useContext } from 'react'
import { AppContext } from '../store/Store.js'
import { useHistory } from 'react-router-dom'
import Navbar from '../components/Navbar.js'
import SideBarMenu from '../components/SideBarMenu.js'
import CategoryTable from '../components/Category/CategoryTable.js'
import CategoryForm from '../components/Category/CategoryForm.js'
import CategoryService from '../services/Category/CategoryService'

const categoryService = new CategoryService()

const Category = () => {

  const [categories, setCategories] = useState([])

  const { state, dispatch } = useContext(AppContext)
  const history = useHistory()


  const fetchCategories = async () => {
    await categoryService.fetchCategories(setCategories, state, history)
  }


  useState(() => {
    fetchCategories()
  })


  const onCreateCategory = async (categoryData) => {
    await categoryService.onCreateCategory(categoryData, dispatch, categories, setCategories, state)
  }


  const onDeleteCategory = async (idx, categoryData) => {
    await categoryService.onDeleteCategory(idx, categoryData, categories, dispatch, state)
  }


  const onEditCategory = async (category) => {
    await categoryService.onEditCategory(category, dispatch, state)
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
