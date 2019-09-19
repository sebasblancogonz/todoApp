import constants from '../../utils/constants'
export function displayInputField() {
  return {
    type: constants.DISPLAY_INPUT_FIELD,
    payload: true,
  }
}
