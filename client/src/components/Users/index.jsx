import React, { Component } from 'react'
import axios from 'axios'

export class Users extends Component {
    constructor(props) {
        super(props)
    }

    getUsers() {
        return axios.get('http://localhost:3000/api/users/')
        .then()
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Users
