import React, { Component } from "react";
import constants from "../../../utils/constants";
import { TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "..";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isAuthenticated: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("user")) {
      this.props.history.push("/");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { loginUser } = this.props;
    const { username, password } = this.state;
    const user = {
      username,
      password
    };

    return axios
      .post("http://localhost:3000/api/users/login", {
        user
      })
      .then(res => {
        if (res.data.error) return console.warn(res.data.error);
        const { token } = res.data;
        setAuthToken(token);
        const decoded = jwt_decode(token);
        loginUser(decoded);
        if (this.props.auth) {
          localStorage.setItem("id_token", token);
          localStorage.setItem("user", JSON.stringify(decoded));
          this.props.history.push("/", this.state);
        }
      });
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    const { username, password } = this.state;
    const isEnabled = username && password;
    return (
      <div className="wrap-registerForm">
        <div className="registerForm">
          <span className="formLegend">Sign In</span>
          <br/>
          <br/>
          <div>
            Don't have an account? <a href="/register">Click here</a>
          </div>
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <TextField
              value={username}
              label="Username*"
              onChange={ev => this.handleChange("username", ev)}
              name="username"
              fullWidth
              margin="normal"
            />
            <br />
            <TextField
              value={password}
              label="Password*"
              onChange={ev => this.handleChange("password", ev)}
              name="password"
              fullWidth
              margin="normal"
              type="password"
            />
            <Button
              style={{ marginTop: "10px" }}
              type="submit"
              disabled={!isEnabled}
              color="primary"
            >
              Log In
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userLogin,
  auth: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  onChange: user => dispatch({ type: constants.ON_CHANGE, user }),
  loginUser: user => dispatch({ type: constants.SET_CURRENT_USER, user })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
