import { selectUserAuthToken } from '../../store/selectors/user.js'
import api from '../../api'
import {
    createShowSuccessNotificationAction,
    createShowErrorNotificationAction
} from '../../store/actions/notification.js'

class NecessityTypeService {

    static getHeaders (state) {
        return {
            'auth': selectUserAuthToken(state),
            'Content-Type': 'application/json'
        }
    }

    async getNecessityTypes (state, setNecessityTypes) {
      const headers = NecessityTypeService.getHeaders(state)
  
      const onSuccess = response => {
        setNecessityTypes(response)
      }
  
      await api.getNecessityTypes(headers, onSuccess)
    }
    
    async fetchNecessityTypesAndCheckLoginStatus (checkingLoginStatus, setNecessityTypes, state) {
        const headers = NecessityTypeService.getHeaders(state)

        const response = await api.getNecessityTypes(headers)
        checkingLoginStatus(response, setNecessityTypes)
      }
    
    async fetchCategories(checkingLoginStatus, setCategories, state) {
        const headers = NecessityTypeService.getHeaders(state)
        const response = await api.getCategories(headers)
        checkingLoginStatus(response, setCategories)
    }

    async onCreateNecessityType (necessityTypeData, necessityTypes, setNecessityTypes, dispatch, state) {
        const headers = NecessityTypeService.getHeaders(state)

        const onSuccess = response => {
          dispatch(createShowSuccessNotificationAction({
            header: '!Tipo de Necesidad Creada!',
            message: 'El tipo de necesidad se creó con éxito'
          }))
          necessityTypes.push(response)
          setNecessityTypes(necessityTypes)
        }
    
        const onError = error => {
          dispatch(createShowErrorNotificationAction({
            header: '¡Error!',
            message: error.message
          }))
        }
    
        await api.createNecessityType(necessityTypeData, headers, onSuccess, onError)
    }
    
    
    async onDeleteNecessityType (idx, necessityTypeId, necessityTypes, dispatch, state) {
        const headers = NecessityTypeService.getHeaders(state)

        const onSuccess = response => {
          dispatch(createShowSuccessNotificationAction({
            header: '!Tipo de Necesidad Eliminada!',
            message: 'El tipo de necesidad se eliminó con éxito'
          }))
        }
    
        const onError = error => {
          dispatch(createShowErrorNotificationAction({
            header: '¡Error!',
            message: error.message
          }))
        }
    
        await api.removeNecessityType(necessityTypeId, headers, onSuccess, onError)
        necessityTypes.splice(idx, 1)
    }
    
    
    async onEditNeccesityType (necessityType, dispatch, state) {
        const headers = NecessityTypeService.getHeaders(state)

        const onSuccess = response => {
          dispatch(createShowSuccessNotificationAction({
            header: '¡Tipo de Necesidad Modificada!',
            message: 'El tipo de necesidad se modificó con éxito'
          }))
        }
    
        const onError = error => {
          dispatch(createShowErrorNotificationAction({
            header: '¡Error!',
            message: error.message
          }))
        }
    
        await api.updateNecessityType(necessityType.id, necessityType, headers, onSuccess, onError)
    }
}

export default NecessityTypeService