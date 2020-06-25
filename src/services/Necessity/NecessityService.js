import { selectUserAuthToken } from '../../store/selectors/user.js'
import api from '../../api'
import {
    createShowSuccessNotificationAction,
    createShowErrorNotificationAction
} from '../../store/actions/notification.js'

class NecessityService {

    static getHeaders (state) {
        return {
          'Auth': selectUserAuthToken(state),
          'Content-Type': 'application/json'
        }
    }
    
    async getNecessityTypesData (setNecessityTypes, dispatch, state) {
        const headers = NecessityService.getHeaders(state)
    
        const onSuccess = async (response) => {
          const data = await response
          setNecessityTypes(data)
        }
    
        const onError = async (error) => {
          dispatch(createShowErrorNotificationAction({
            header: '¡Error!',
            message: 'No se han podido obtener los tipos de necesidad'
          }))
        }
    
        await api.getNecessityTypes(headers, onSuccess, onError)
    }
    
    async getNecessitiesData (setNecessityList, dispatch, state) {
        const headers = NecessityService.getHeaders(state)
    
        const onSuccess = async (response) => {
          const data = await response
          setNecessityList(data)
        }
    
        const onError = async (error) => {
          dispatch(createShowErrorNotificationAction({
            header: '¡Error!',
            message: 'No se han podido obtener las necesidades'
          }))
        }
    
        await api.getNecessities(headers, onSuccess, onError)
    }
    
    async saveNecessity (data, dispatch, necessityList, setNecessityList, state) {
        const headers = NecessityService.getHeaders(state)
    
        const onSuccess = async (response) => {
          const newNecessity = await response
          dispatch(createShowSuccessNotificationAction({
            header: '¡Necesidad Creada!',
            message: 'El mapeo se ha creado con éxito'
          }))
    
          necessityList.push(newNecessity)
          setNecessityList(necessityList)
        }
    
        const onError = async (error) => {
          dispatch(createShowErrorNotificationAction({
            header: '¡Error!',
            message: 'No se ha podido crear un mapeo'
          }))
        }
    
        await api.createNecessity(data, headers, onSuccess, onError)
    }
    
    async getNecessitiesByCategory (category, setData, dispatch, state) {
        const headers = NecessityService.getHeaders(state)
    
        const onSuccess = async (response) => {
          const data = await response
          setData(data)
        }
    
        const onError = async (error) => {
          dispatch(createShowErrorNotificationAction({
            header: '¡Error!',
            message: 'No se han podido obtener las Necesidades'
          }))
        }
    
        await api.getNecessitiesByCategory(headers, onSuccess, onError, category)
    }

    async onCategoryFilterOption (category, state, setNecessityList) {
      const headers = NecessityService.getHeaders(state)
      
      const onSuccess = response => {
        setNecessityList(response)
      }
      
      if (!category) {
        await api.getNecessities(headers, onSuccess)
      } else {
        await api.getNecessitiesByCategory(category, headers, onSuccess)
      }
    }

    async onNecessityTypeFilterOption (necessityType, setNecessityList) {
      const headers = NecessityService.getHeaders(state)
      
      const onSuccess = response => {
        setNecessityList(response)
      }
  
      if (!necessityType) {
        await api.getNecessities(headers, onSuccess)
      } else {
        await api.getNecessitiesByType(necessityType, headers, onSuccess)
      }
    }
}

export default NecessityService