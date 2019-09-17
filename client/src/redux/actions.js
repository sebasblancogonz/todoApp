import constants from '../utils/constants'
import axios from 'axios'
import map from 'lodash/map'

export function getTodoList(user) {
  return dispatch => {
    axios.get(`/api/todo/${user}`).then(
      res => {
        dispatch({
          type: constants.UPDATE_LIST,
          payload: res.data.data,
        })
      },
      rej => {
        console.warn(`Couldn't get data, ${rej}`)
      }
    )
  }
}

export function addTodo(todo) {
  return (dispatch, getState) => {
    axios
      .post('/api/todo', {
        action: constants.ADD,
        todo,
      })
      .then(
        res => {
          if (res.data.error) return console.warn(res.data.error)

          let todos = getState().todoList.todos
          todos.push(res.data)
          dispatch(updateTodos(todos))
        },
        rej => console.warn(`Couldn't add todo, ${rej}`)
      )
  }
}

export function toggleTodoState(id, todoState) {
  return (dispatch, getState) => {
    axios
      .post(`/api/todo/${todoId}`, {
        action: constants.UPDATE,
        id,
        completed: !todoState,
      })
      .then(
        res => {
          if (res.data.error) return console.warn(res.data.error)

          let todos = getState().todoList.todos
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
      .post('/api', {
        action: constants.REMOVE,
        id,
      })
      .then(
        res => {
          if (res.data.error) return console.warn(res.data.error)

          let todos = getState().todoList.todo
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
