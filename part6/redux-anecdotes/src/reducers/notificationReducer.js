let timeOutID

const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    const timeToShow = time * 1000
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: message
    })
    clearTimeout(timeOutID)
    timeOutID = setTimeout(() => {
      dispatch({
        type: 'NEW_NOTIFICATION',
        data: ''
      })    
    }, timeToShow);
    
  }
}

export default notificationReducer