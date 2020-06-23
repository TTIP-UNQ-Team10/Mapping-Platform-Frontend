import { createLogoutAction } from '../store/actions/user.js'

const BASE_API = process.env.REACT_APP_API_BASE;
const LOGIN_API = BASE_API + '/auth'
const CATEGORY_API = BASE_API + '/categories'
const NECESSITY_API = BASE_API + '/necessities'
const NECESITY_TYPE_API = BASE_API + '/necessity-types'

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


export const logout = () => createLogoutAction()

export const login = (user, onSuccess, onError) => fetchAPI({
  url: LOGIN_API,
  method: 'POST',
  body: user,
  onSuccess: onSuccess,
  onError: onError
})

export const getCategories = (headers, onSuccess, onError) => fetchAPI({
  url: CATEGORY_API,
  method: 'GET',
  headers: headers,
  onSuccess: onSuccess,
  onError: onError
})

export const getNecessities = (headers, onSuccess, onError) => fetchAPI({
  url: NECESSITY_API,
  method: 'GET',
  headers: headers,
  onSuccess: onSuccess,
  onError: onError
})

export const getNecessitiesByCategory = (category, headers, onSuccess, onError) => fetchAPI({
  url: NECESSITY_API + `/${category}`,
  method: 'GET',
  onSuccess: onSuccess,
  headers: headers,
  onError: onError
})

export const getNecessityTypes = (headers,onSuccess, onError) => fetchAPI({
  url: NECESITY_TYPE_API,
  method: 'GET',
  headers: headers,
  onSuccess: onSuccess,
  onError: onError
})

export const createCatetory = (category, headers, onSuccess, onError) => fetchAPI({
  url: CATEGORY_API,
  method: 'POST',
  headers: headers,
  body: category,
  onSuccess: onSuccess,
  onError: onError
})

export const createNecessityType = (necessityType, headers, onSuccess, onError) => fetchAPI({
  url: NECESITY_TYPE_API,
  method: 'POST',
  headers: headers,
  body: necessityType,
  onSuccess: onSuccess,
  onError: onError
})

export const createNecessity = (necessity, headers, onSuccess, onError) => fetchAPI({
  url: NECESSITY_API,
  method: 'POST',
  headers: headers,
  body: necessity,
  onSuccess: onSuccess,
  onError: onError
})

export const removeNecessityType = (id, headers, onSuccess, onError) => fetchAPI({
  url: `${NECESITY_TYPE_API}/${id}`,
  method: 'DELETE',
  headers: headers,
  onSuccess: onSuccess,
  onError: onError
})

export const updateNecessityType = (id, necessityType, headers, onSuccess, onError) => fetchAPI({
  url: `${NECESITY_TYPE_API}/${id}`,
  method: 'PUT',
  headers: headers,
  body: necessityType,
  onSuccess: onSuccess,
  onError: onError
})

export const removeCategory = (id, headers, onSuccess, onError) => fetchAPI({
  url: `${CATEGORY_API}/${id}`,
  method: 'DELETE',
  headers: headers,
  onSuccess: onSuccess,
  onError: onError
})

export const updateCategory = (id, category, headers, onSuccess, onError) => fetchAPI({
  url: `${CATEGORY_API}/${id}`,
  method: 'PUT',
  headers: headers,
  body: category,
  onSuccess: onSuccess,
  onError: onError
})

export const getNecessityType = (id, headers, onSuccess, onError) => fetchAPI({
  url: `${NECESITY_TYPE_API}/${id}`,
  method: 'GET',
  headers: headers,
  onSuccess: onSuccess,
  onError: onError
})

export const getNecessity = (id, headers, onSuccess, onError) => fetchAPI({
  url: `${NECESSITY_API}/${id}`,
  method: 'GET',
  headers: headers,
  onSuccess: onSuccess,
  onError: onError
})

export const getNecessitiesByType = (necessityType, headers, onSuccess, onError) => fetchAPI({
  url: `${NECESSITY_API}/type/${necessityType}`,
  method: 'GET',
  headers: headers,
  onSuccess: onSuccess,
  onError: onError
})
