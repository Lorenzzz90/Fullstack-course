const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'NEW_FILTER':
      return action.data
    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'NEW_FILTER',
    data: filter
  }
}

export default filterReducer