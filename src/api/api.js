// import hospitalData from './datos.js';

const BASE_API = process.env.REACT_APP_API_BASE;
const HOSPITAL_API = BASE_API + '/necessities'
const LOGIN_API = BASE_API + '/login'

const createHeaders = () => {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  return headers
}

export const fetchAPI = async ({
  url,
  method,
  body,
  headers,
  onSuccess,
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

    if (onSuccess) {
      onSuccess(parsed);
    }
    return parsed;

  } catch (error) {
    if (onError) {
      onError(error);
    }
    return error;
  }
}

export const getHospitals = () => fetchAPI({url: HOSPITAL_API, method: 'GET'})

export const login = (user, onSuccess) => fetchAPI({url: LOGIN_API, method: 'POST', body: user, onSuccess: onSuccess})
