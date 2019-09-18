import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../../redux/actions/users'

const CreateUser = ({ dispatch }) => {
  let input = []

  return (
        <div className="col-md-6">
          <form
            onSubmit={e => {
              e.preventDefault()
              let user = {
                username: input[0].value,
                name: input[1].value,
                lastname: input[2].value,
                birth: input[3].value,
                bio: input[4].value,
              }
              dispatch(createUser(user))
              input[0].value = ''
              input[1].value = ''
              input[2].value = ''
              input[3].value = ''
              input[4].value = ''
            }}
          >
            <div className="form-group">
              <label>Username</label>
              <input className="form-control" ref={node => input.push(node)} />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input className="form-control" ref={node => input.push(node)} />
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input className="form-control" ref={node => input.push(node)} />
            </div>
            <div className="form-group">
              <label>Birth</label>
              <input
                className="form-control"
                type="date"
                ref={node => input.push(node)}
              />
            </div>
            <div className="form-group">
              <label className="text-right">Bio</label>
              <textarea
                className="form-control"
                ref={node => input.push(node)}
                rows="3"
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Create User
            </button>
          </form>
        </div>
  )
}

export default connect()(CreateUser)
