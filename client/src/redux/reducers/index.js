import { combineReducers } from 'redux'
import todos from './todos'
import user from './user'
import auth from './auth'

export default combineReducers({
  todos,
  user,
  auth
})
