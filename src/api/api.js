import { createLogoutAction } from '../store/actions/user.js'

const BASE_API = process.env.REACT_APP_API_BASE;
const HOSPITAL_API = BASE_API + '/necessities'
const LOGIN_API = BASE_API + '/auth'
const CATEGORY_API = BASE_API + '/categories'

const createHeaders = () => {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json')

  return headers
}

export const fetchAPI = async ({
  url,
  method,
  body,
  onSuccess,
  headers,
  onError,
  parse = x => x
}) => {
  try {

    const request = {
      method,
      headers: headers ? headers : createHeaders(),
      body: JSON.stringify(body)
    };
    const response = await fetch(url, request);
    const json = await response.json();
    const parsed = parse(json);

    const { ok } = response

    if (ok && onSuccess) {
      onSuccess(parsed);
    }

    if (!ok && onError) {
      onError(parsed)
    }

    return parsed;

  } catch (error) {
    if (onError) {
      onError(error);
    }
    return error;
  }
}

export const getHospitals = (headers, onSuccess, onError) => fetchAPI({url: HOSPITAL_API, method: 'GET', onSuccess: onSuccess, onError: onError, headers: headers})

export const login = (user, onSuccess, onError) => fetchAPI({url: LOGIN_API, method: 'POST', body: user, onSuccess: onSuccess, onError: onError})

export const logout = () => createLogoutAction()

export const createCatetory = (category, onSuccess, headers, onError) => fetchAPI({url: CATEGORY_API, method: 'POST', body: category, onSuccess: onSuccess, onError: onError, headers: headers})

export const getCategories = (headers, onError) => fetchAPI({url: CATEGORY_API, method: 'GET', headers: headers, onError: onError})
