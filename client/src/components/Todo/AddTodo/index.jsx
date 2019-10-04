import React, { Component, Fragment } from 'react'
import constants from '../../../utils/constants'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient('http://localhost:3000/')

class AddTodo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      user: {},
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(e) {
    e.preventDefault()
    const { addTodo, user } = this.props
    const { title, description } = this.state

    let userData = await axios
      .get(`http://localhost:3000/api/users/${user}`)
      .then(res => {
        return res.data
      })

    const todo = {
      title,
      description,
      user: userData,
    }

    this.setState({
      title: '',
      description: '',
      user: {},
    })
    return axios
      .post('http://localhost:3000/api/todos', {
        todo,
      })
      .then(res => {
        if (res.data.error) return console.warn(res.data.error)
        socket.io.emit('todoAdded')
        addTodo(res.data.todoSaved)
      })
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value,
    })
  }

  render() {
    const { title, description } = this.state
    return (
      <Fragment>
        <div className="wrap-todoForm">
          <div className="todoForm">
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <TextField
                value={title}
                error={this.state.noTitle ? true : false}
                label="Title"
                onChange={ev => this.handleChange('title', ev)}
                name="title"
                fullWidth
                margin="normal"
              />
              <br />
              <TextField
                value={description}
                error={this.state.noDesc ? true : false}
                name="description"
                label="Description"
                onChange={ev => this.handleChange('description', ev)}
                margin="normal"
                fullWidth
                multiline
                rowsMax="4"
              />
              <Button
                style={{ marginTop: '10px' }}
                type="submit"
                color="primary"
                disabled={!title || !description}
              >
                Add task
              </Button>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onChange: todo => dispatch({ type: constants.ON_CHANGE, todo }),
  addTodo: todo => dispatch({ type: constants.ADD_TODO, todo }),
})

const mapStateToProps = state => ({
  todos: state,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo)
