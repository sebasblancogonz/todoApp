import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../../redux/actions/todos'

const AddTodo = ({ dispatch }) => {
  let input = []

  return (
      <div className="col-md-6">
        <form
          onSubmit={e => {
            e.preventDefault()
            let todo = {
              title: input[0].value,
              description: input[1].value,
            }
            dispatch(addTodo(todo))
            input[0].value = ''
            input[1].value = ''
          }}
        >
          <div className="form-group">
            <label>Username</label>
            <input className="form-control" ref={node => input.push(node)} />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input className="form-control" ref={node => input.push(node)} />
          </div>
          <button className="btn btn-primary" type="submit">
            Add Todo
          </button>
        </form>
      </div>
  )
}

export default connect()(AddTodo)
