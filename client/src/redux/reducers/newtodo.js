import constants from '../../utils/constants'

export default function(state = {}, action) {
  switch (action.type) {
    case constants.DISPLAY_INPUT_FIELD:
      return {
        ...state,
        add: action.payload,
      }
  }
  return state
}
