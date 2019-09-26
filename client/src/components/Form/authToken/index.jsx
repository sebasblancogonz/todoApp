import axios from 'axios'

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export const isAuthenticated = userId => {
    if(localStorage.getItem('user')._id === userId) return true
}

export default setAuthToken
