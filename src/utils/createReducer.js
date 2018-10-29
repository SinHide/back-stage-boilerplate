import get from 'lodash/get'

const createReducer = (defaultState, handlers) => {
  if (typeof defaultState !== 'function') {
    throw new Error('[createReducer] defaultState should be a function')
  }

  function reducer(state = defaultState(), action = {}) {
    if (!action || typeof action.type !== 'string') {
      return state
    }

    if (handlers.hasOwnProperty(action.type)) {
      const handler = get(handlers, action.type)

      if (typeof handler === 'function') {
        handler(state, action)
      }
    }

    return state
  }

  reducer.defaultState = defaultState
  reducer.handlers = handlers

  return reducer
}

export default createReducer