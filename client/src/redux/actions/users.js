import constants from '../../utils/constants'
import axios from 'axios'

export function getUsers() {
  return dispatch => {
    axios.get(`http://localhost:3000/api/users`).then(
      res => {
        dispatch({
          type: constants.UPDATE_LIST,
          payload: res.data.data,
        })
      },
      rej => {
        console.warn(`Couldn't get users, ${rej}`)
      }
    )
  }
}

export function createUser(user) {
  console.log(user)
  return (dispatch, getState) => {
    axios
      .post('http://localhost:3000/api/users/register', {
        user,
      })
      .then(
        res => {
          if (res.data.error) return console.warn(res.data.error)

          let users = getState().users
          users.push(res.data)
          dispatch(updateUsers(users))
        },
        rej => console.warn(`Couldn't create user, ${rej}`)
      )
  }
}

export function removeUser(id) {
  return (dispatch, getState) => {
    axios
      .post(`http://localhost:3000/api/users/${id}`, {
        action: constants.REMOVE,
        id,
      })
      .then(
        res => {
          if (res.data.error) return console.warn(res.data.error)

          let users = getState().users
          let newList = remove(users, user => {
            return user._id !== res.data.userId
          })

          dispatch(updateUsers(newList))
        },
        rej => {
          console.warn(`Couldn't remove user, ${rej}`)
        }
      )
  }
}

export function updateUsers(users) {
  return {
    type: constants.UPDATE_LIST,
    payload: users,
  }
}