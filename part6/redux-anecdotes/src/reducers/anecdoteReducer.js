import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const compare = ( a, b ) => {
  if ( a.votes < b.votes ) {
    return 1
  }
  if ( a.votes > b.votes ) {
    return -1
  }
  return 0
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort(compare)
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      const unordered = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
      return unordered.sort(compare)
    }
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  } 
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const response = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: response
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const response = await anecdoteService.newAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: response,
    })
  }
}

export default anecdoteReducer