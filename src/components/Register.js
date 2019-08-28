import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {onRegisterUser} from '../actions/index'


class Register extends Component {

    onButtonClick = () => {
        const user = this.username.value
        const pass = this.password.value
        const name = this.name.value
        const email = this.email.value

        this.props.onRegisterUser(user,name,email,pass)
    }

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
                        <div className="card-title mt-1">
                            <h4>Full Name</h4>
                        </div>
                        <form className="input-group"><input ref={input => this.name = input} className="form-control" type="text"/></form>
                        <div className="card-title mt-1">
                            <h4>Email</h4>
                        </div>
                        <form className="input-group"><input ref={input => this.email = input} className="form-control" type="text"/></form>
                        <div className="d-flex justify-content-center my-3">
                        </div>

                        <button className="btn btn-success btn-block" onClick={this.onButtonClick}>Register</button>
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

export default connect(mapState,{onRegisterUser})(Register)