import { selectUserAuthToken } from '../../store/selectors/user.js'
import api from '../../api'
import {
    createShowSuccessNotificationAction,
    createShowErrorNotificationAction
} from '../../store/actions/notification.js'

class CategoryService {

    static getHeaders (state) {
        return {
            'Auth': selectUserAuthToken(state),
            'Content-Type': 'application/json'
        }
    }
    
    async fetchCategories (setCategories, state, history) {
        
        const headers = CategoryService.getHeaders(state)
        const categoriesResponse = await api.getCategories(headers)
        categoriesResponse && !categoriesResponse.error ? setCategories(categoriesResponse) : history.push('/login')
    }

    async getCategories (setCategories, state) {
        const onSuccess = response => {
          console.log('RESPONSE', response)
          setCategories(response)
        }
    
        const headers = {
          'Auth': selectUserAuthToken(state)
        }
    
        await api.getCategories(headers, onSuccess)
    }

    async onCreateCategory (categoryData, dispatch, categories, setCategories, state) {
        
        const headers = CategoryService.getHeaders(state)

        const onSuccess = response => {
          dispatch(createShowSuccessNotificationAction({
            header: '¡Categoría Creada!',
            message: 'La categoría se creó con éxito'
          }))
          categories.push(response)
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

    async onDeleteCategory (idx, categoryData, categories, dispatch, state) {

        const headers = CategoryService.getHeaders(state)

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

    async onEditCategory (category, dispatch, state) {

        const headers = CategoryService.getHeaders(state)

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
    
        await api.updateCategory(category.id, category, headers, onSuccess, onError)
    }
}

export default CategoryService