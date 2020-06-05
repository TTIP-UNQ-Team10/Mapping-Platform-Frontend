export const handlerInput = (event, handlerFunction) => {
  const { value } = event.target
  handlerFunction(value)
}
