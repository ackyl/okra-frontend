import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {onRegisterUser} from '../actions/index'
import TextField from '@material-ui/core/TextField'
import isEmail from 'validator/lib/isEmail'


class Register extends Component {

    state = {
        error: null
    }

    onButtonClick = () => {
        const user = this.username.value
        const pass = this.password.value
        const name = this.name.value
        const email = this.email.value


        if(user == '' || pass == '' || name == '' || email == '')
            this.setState({error: 'Please fill all the field.'})
        else if(pass.length < 6)
            this.setState({error: 'Password must be more than 5 characters.'})
        else if(!isEmail(email))
            this.setState({error: 'Bad email format.'})
        else
            this.props.onRegisterUser(user,name,email,pass)
    }

    componentDidUpdate(){
        console.log(this.props.user)
    }

    render() {
        if(this.props.user.user_id == ''){
            return (
                <div className="mt-5 row">
                    <div className="col-sm-3 mx-auto card">
                        <div className="card-body">
                            <div className="card-title">
                                <h4>Register</h4>
                            </div>

                            <TextField
                                    label="Username" margin="dense" variant="outlined"
                                    inputRef={input => this.username = input}
                                    style={{width:'100%', marginBottom: 10}}
                            />

                            <TextField
                                    label="Password" margin="dense" variant="outlined"
                                    inputRef={input => this.password = input}
                                    style={{width:'100%', marginBottom: 10}}
                                    type='password'
                            />

                            <TextField
                                    label="Name" margin="dense" variant="outlined"
                                    inputRef={input => this.name = input}
                                    style={{width:'100%', marginBottom: 10}}
                            />

                            <TextField
                                    label="Email" margin="dense" variant="outlined"
                                    inputRef={input => this.email = input}
                                    style={{width:'100%', marginBottom: 20}}
                            />

                            <div style={{marginBottom: 20, fontWeight: 'bold', color: 'red'}}>{this.state.error}</div>

                            <button className="btn btn-success btn-block" onClick={this.onButtonClick} style={{backgroundColor: '#004d40'}}>Register</button>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <Redirect to='/'></Redirect>
            )
        }
    }
}

const mapState = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapState,{onRegisterUser})(Register)