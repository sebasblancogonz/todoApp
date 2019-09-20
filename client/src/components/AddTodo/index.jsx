import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import constants from '../../utils/constants'

class AddTodo extends Component {
  constructor(props) {
    super(props)

    this.handleSubmitTodo = this.handleSubmitTodo.bind(this)
  }

  handleSubmitTodo(todo) {
    const { addTodo } = this.props
    
    return axios
    .post('http://localhost:3000/api/todos', {
      todo,
    })
    .then(res => {
      if(res.data.error) return console.warn(res.data.error)
      addTodo(res.data.todoSaved)
    })
  }

  render() {
    let input = []
    return (
      <div className="col-md-6">
        <form
          onSubmit={e => {
            e.preventDefault()
            let todo = {
              title: input[0].value,
              description: input[1].value,
              completed: false,
            }
            this.handleSubmitTodo(todo)
            input[0].value = ''
            input[1].value = ''
          }}
        >
          <div className="form-group">
            <label>Title</label>
            <input className="form-control" ref={node => input.push(node)} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input className="form-control" ref={node => input.push(node)} />
          </div>
          <button className="btn btn-primary" type="submit">
            Add Todo
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addTodo: todo => dispatch({ type: constants.ADD_TODO, todo })
})

const mapStateToProps = state =>({
  todos: state
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
