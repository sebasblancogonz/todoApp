import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { newtodo, todolist, initialstate } from './reducers'

const reducers = combineReducers({
  newtodo,
  todolist,
})

const store = createStore(reducers, initialstate, applyMiddleware(thunk))

export default store