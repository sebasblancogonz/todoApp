import constants from '../../utils/constants'

const users = (state = [], action) => {
    switch (action.type) {
        case constants.CREATE_USER:
            const { username, name, lastname, birth, bio } = action
            return [
                ...state,
                {
                    username,
                    name,
                    lastname,
                    birth,
                    bio,
                }
            ]
        default:
            return state
    }
}

export default users