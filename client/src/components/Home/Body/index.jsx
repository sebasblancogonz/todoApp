import React, { Fragment, Component } from 'react'
import { SET_CURRENT_USER, LOGOUT_USER } from '../../../utils/constants'
import { AddTodo, TodoList } from '../..'
import Header from '../Header'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import { setAuthToken } from '../..'

class Home extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const {  setCurrentUser, logoutUser } = this.props
    if (localStorage.getItem('id_token')) {
      const user = jwt_decode(localStorage.getItem('id_token'))
      const currentTime = Date.now() / 1000
      if (user.exp < currentTime) {
        localStorage.removeItem('id_token')
        setAuthToken(false)
        setCurrentUser({})
        this.props.history.push('/login')
      }
    } else {
      setAuthToken(false)
      setCurrentUser({})
      this.props.history.push('/login')
    }
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user.id
  }

  render() {
    const userId = this.getUser()
    return (
      <Fragment>
        <Header />
        <div className="todos">
          <AddTodo user={userId}/>
          <TodoList user={userId}/>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  state,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: decoded => dispatch({ type: SET_CURRENT_USER, decoded }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
