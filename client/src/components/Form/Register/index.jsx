import React, { Component, Fragment } from 'react'
import constants from '../../../utils/constants'
import { TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 1,
      username: '',
      password: '',
      name: '',
      lastname: '',
      bio: '',
      birth: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { createUser } = this.props
    const { username, password, name, lastname, bio, birth } = this.state
    const user = {
      username,
      password,
      name,
      lastname,
      bio,
      birth
    }

    return axios
      .post('http://localhost:3000/api/users/register', {
        user,
      })
      .then(res => {
        if (res.data.error) return console.warn(res.data.error)
        createUser(res.data.userSaved)
      })
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value,
    })
  }

  nextStep = () => {
    let step = this.state.step
    step = step >= 2 ? 3 : step + 1
    this.setState({
      step,
    })
  }

  prevStep = () => {
    let step = this.state.step
    step = step <= 1 ? 1 : step - 1
    this.setState({
      step,
    })
  }

  nextBtn() {
    let step = this.state.step
    if (step < 2) {
      return (
        <Button color="primary" onClick={this.nextStep}>
          Next
        </Button>
      )
    }

    return null
  }

  prevBtn() {
    let step = this.state.step
    if (step !== 1) {
      return (
        <Fragment>
          <Button onClick={this.prevStep}>Back</Button>
          <Button type="submit" color="primary">
            Register
          </Button>
        </Fragment>
      )
    }

    return null
  }

  render() {
    return (
      <div className="container">
        <div className="registerForm">
          <form onSubmit={this.handleSubmit}>
            <br />
            <PersonalDetails
              step={this.state.step}
              handleChange={this.handleChange}
              name={this.state.name}
              lastname={this.state.lastname}
              birth={this.state.birth}
            />
            <UserDetails
              step={this.state.step}
              handleChange={this.handleChange}
              username={this.state.username}
              password={this.state.password}
              bio={this.state.bio}
            />
            {this.prevBtn()}
            {this.nextBtn()}
          </form>
        </div>
      </div>
    )
  }
}

function PersonalDetails(props) {
  if (props.step !== 1) {
    return null
  }

  return (
    <Fragment>
      <TextField
        value={props.name}
        label="Name"
        onChange={ev => props.handleChange('name', ev)}
        name="name"
        fullWidth
        margin="normal"
      />
      <br />
      <TextField
        value={props.lastname}
        label="Last Name"
        onChange={ev => props.handleChange('lastname', ev)}
        name="lastname"
        fullWidth
        margin="normal"
      />
      <br />
      <TextField
        label="Birthday"
        onChange={ev => props.handleChange('birth', ev)}
        type="date"
        fullWidth
        value={props.birth}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
      <br />
    </Fragment>
  )
}

function UserDetails(props) {
  if (props.step !== 2) {
    return null
  }

  return (
    (
      <Fragment>
        <TextField
          value={props.username}
          label="Username"
          onChange={ev => props.handleChange('username', ev)}
          name="username"
          fullWidth
          margin="normal"
        />
        <br />
        <TextField
          value={props.password}
          label="Password"
          onChange={ev => props.handleChange('password', ev)}
          name="password"
          fullWidth
          margin="normal"
          type="password"
        />
        <br />
        <TextField
          value={props.bio}
          name="bio"
          label="Bio"
          onChange={ev => props.handleChange('bio', ev)}
          margin="normal"
          fullWidth
          multiline
          rowsMax="4"
        />
        <br />
      </Fragment>
    )
  )
}

const mapStateToProps = state => ({
  user: state.userRegister,
})

const mapDispatchToProps = dispatch => ({
  onChange: user => dispatch({ type: constants.ON_CHANGE, user }),
  createUser: user => dispatch({ type: constants.CREATE_USER, user }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
