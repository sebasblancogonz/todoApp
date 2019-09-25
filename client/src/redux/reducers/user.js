import constants from '../../utils/constants'

const user = (state = {}, action) => {
    switch (action.type) {
        case constants.CREATE_USER:
            const { username, name, password, lastname, birth, bio } = action
            return {
                ...state,
                user: {
                    username,
                    password,
                    name,
                    lastname,
                    birth,
                    bio,
                }
            }
        default:
            return state
    }
}

export default user