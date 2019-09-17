import constants from '../../utils/constants'

export default function(state = {}, action) {
  switch (action.type) {
    case constants.TOGGLE_TODO:
      return {
        ...state,
        todos: action.payload,
      }
    case constants.UPDATE_LIST:
      return {
        ...state,
        todos: action.payload,
      }
    case constants.DISPLAY_INPUT_FIELD:
      return {
        ...state,
        add: action.payload,
      }
    case constants.GET_TODO_LIST:
      return {
        ...state,
        todos: action.payload,
      }
  }
  return state
}
