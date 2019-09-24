import constants from '../../utils/constants'

const todos = (state = [], action) => {
  switch (action.type) {
    case constants.HOME_PAGE_LOADED:
      if (action.data.message) return [...state]
      return action.data.todos
    case constants.ADD_TODO:
      return [...state, action.todo]
    case constants.TOGGLE_TODO:
      return state.map(todo =>
        todo._id === action._id ? { ...todo, completed: !todo.completed } : todo
      )
    case constants.GET_TODOS:
      return { ...state, todos: action.json }
    default:
      return state
  }
}

export default todos
