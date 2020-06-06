export const handlerInput = (event, handlerFunction) => {
  const { value } = event.target
  handlerFunction(value)
}

export const updateStringValue = (event, field, object) => {
  const { value } = event.target
  object[field] = value
  return object
}
