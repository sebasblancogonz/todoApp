import constants from '../../utils/constants'

const todos = (state = [], action) => {
    switch (action.type) {
        case constants.ADD_TODO:
            return [
                ...state
            ]
        case constants.TOGGLE_TODO:
            return state.map(todo => 
                (todo._id === action._id)
                ? {...todo, completed: !todo.completed} : todo
                )
        case constants.GET_TODOS:
            return { ...state, todos: action.json }
        default:
            return state
    }
}

export default todos