import constants from '../../utils/constants'
import axios from 'axios'
import map from 'lodash/map'

export function getTodoListUser(user) {
  return dispatch => {
    axios.get(`http://localhost:3000/api/todos/${user}`).then(
      res => {
        dispatch({
          type: constants.UPDATE_LIST,
          payload: res.data,
        })
      },
      rej => {
        console.warn(`Couldn't get data, ${rej}`)
      }
    )
  }
}

export function getTodoList() {
  return dispatch => {
    axios
      .get(`http://localhost:3000/api/todos/`)
      .then(
        res => {return res.data},
        rej => {
          console.warn(`Couldn't get data, ${rej}`)
        }
      )
      .then(json =>
        dispatch({
          type: constants.UPDATE_LIST,
          payload: json.data,
        })
      )
  }
}

export function addTodo(todo) {
  return (dispatch, getState) => {
    axios
      .post('http://localhost:3000/api/todos', {
        todo,
      })
      .then(
        res => {
          if (res.data.error) return console.warn(res.data.error)

          let todos = getState().todos
          todos.push(res.data.todoSaved)
          dispatch({
            type: constants.ADD_TODO,
            payload: todos,
          })
        },
        rej => console.warn(`Couldn't add todo, ${rej}`)
      )
  }
}

export function toggleTodo(id, todoState) {
  return (dispatch, getState) => {
    axios
      .post(`http://localhost:3000/api/todos/${todoId}`, {
        action: constants.UPDATE,
        id,
        completed: !todoState,
      })
      .then(
        res => {
          if (res.data.error) return console.warn(res.data.error)

          let todos = getState().todos
          let resTodo = res.data
          let updateTodo = map(todos, todo => {
            if (todo._id == resTodo._id) todo.completed = resTodo.completed
            return todo
          })
          dispatch(updateTodos(updateTodo))
        },
        rej => {
          console.warn(`Couldn't update todo satus, ${rej}`)
        }
      )
  }
}

export function removeTodo(id) {
  return (dispatch, getState) => {
    axios
      .post(`http://localhost:3000/api/todos/${id}`, {
        action: constants.REMOVE,
        id,
      })
      .then(
        res => {
          if (res.data.error) return console.warn(res.data.error)

          let todos = getState().todos
          let newList = remove(todos, todo => {
            return todo._id !== res.data.todoId
          })

          dispatch(updateTodos(newList))
        },
        rej => {
          console.warn(`Couldn't remove todo, ${rej}`)
        }
      )
  }
}

export function updateTodos(todos) {
  return {
    type: constants.UPDATE_LIST,
    payload: todos,
  }
}

export function displayInputField() {
  return {
    type: constants.DISPLAY_INPUT_FIELD,
    payload: true,
  }
}
