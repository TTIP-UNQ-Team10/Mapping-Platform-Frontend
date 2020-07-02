export const handlerInput = (event, handlerFunction) => {
  const { value } = event.target
  handlerFunction(value)
}

export const updateStringValue = (event, field, object) => {
  const { value } = event.target
  object[field] = value
  return object
}

export const getPolygonCenter = (arr) => {
  return arr.reduce((x,y) => {
      return [x[0] + y[0]/arr.length, x[1] + y[1]/arr.length]
  }, [0,0])
}

export const disabledFilter = (filter, filterState, setFilterFunction, idx) => {
  if (!filter) {
    setFilterFunction([true, true])
  } else {
    filterState[idx] = false
    setFilterFunction(filterState)
  }
}
