import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {login} from '../actions/index'


class Login extends Component {

    render() {
        return (
            <div className="mt-5 row">
                <div className="col-sm-3 mx-auto card">
                    <div className="card-body">
                        <div className="border-bottom border-secondary card-title">
                            <h2>Register</h2>
                        </div>
                        <div className="card-title mt-1">
                            <h4>Username</h4>
                        </div>
                        <form className="input-group"><input ref={input => this.username = input} className="form-control" type="text"/></form>
                        <div className="card-title mt-1">
                            <h4>Password</h4>
                        </div>
                        <form className="input-group"><input ref={input => this.password = input} className="form-control" type="password"/></form>
                        <div className="d-flex justify-content-center my-3">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapState,{login})(Login)