import React, { Component, Fragment } from 'react'
import constants from '../../../utils/constants'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'

class AddTodo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { addTodo } = this.props
    const { title, description } = this.state

    const todo = {
      title,
      description,
    }

    return axios
      .post('http://localhost:3000/api/todos', {
        todo,
      })
      .then(res => {
        if (res.data.error) return console.warn(res.data.error)
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
                label="Title"
                onChange={ev => this.handleChange('title', ev)}
                name="title"
                fullWidth
                margin="normal"
              />
              <br />
              <TextField
                value={description}
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
