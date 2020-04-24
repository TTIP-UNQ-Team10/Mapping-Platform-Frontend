// import hospitalData from './datos.js';

const BASE_API = process.env.REACT_APP_API_BASE;
const HOSPITAL_API = BASE_API + '/necessities'

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
    console.log(url, method)
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

export const getHospitals = () => {
  return fetchAPI({url: HOSPITAL_API, method: 'GET'})
}
