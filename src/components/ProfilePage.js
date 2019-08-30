import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

import {onUpdateProfile} from '../actions/index'

class ProfilePage extends Component {

    state = {
        edit: false
    }

    onEdit = () => {
        this.setState({edit: true})
    }

    onSave = () => {
        const name = this.name.value
        const email = this.email.value

        axios.patch(`http://localhost:2019/users/${this.props.user.user_id}`,
        {
            name,
            email

        }).then(res=>{

            const formData = new FormData()

            const pp = this.pp.files[0]
            const username = this.props.user.username
            const pp_name = this.pp.files[0].name

            formData.append('pp', pp)
            formData.append('username', username)
            formData.append('pp_name', pp_name)

            if(this.pp.files[0] !== undefined){

                this.props.user.profile_picture = pp_name

                axios.post(`http://localhost:2019/users/pp`,formData).then(res=>{
                    console.log(res)
                })
            }

            this.props.user.name = name
            this.props.user.email = email

            this.props.onUpdateProfile(this.props.user)

            this.setState({edit: false})

        })
    }

    onCancel = () => {
        this.setState({edit: false})
    }

    render(){

        const pp = `http://localhost:2019/users/pp/${this.props.user.profile_picture}`
        this.props.user.username =  (this.props.user.username).toUpperCase()

        if(this.state.edit === false){
            return (
                <div style={{width:'100%', textAlign: 'center', marginTop: 40}}>

                    <img src={pp} style={{width: 200, height: 200}}/>

                    <div>
                        <div style={{fontWeight: 'bold', marginTop: 10}}>{this.props.user.username}</div>
                        <div style={{marginTop: 10}}>{this.props.user.name}</div>
                        <div style={{marginTop: 10}}>{this.props.user.email}</div>
                    
                        <Button  variant="contained" onClick={this.onEdit} style={{backgroundColor: '#004d40', width: 200, color: 'white', marginTop: 25}}>
                            Edit Profile
                        </Button>
                    </div>

                </div>
            )
        }else{
            return(
                <div style={{width:'100%', textAlign: 'center', marginTop: 40}}>

                    <img src={pp} style={{width: 200, height: 200}}/>

                    <div>

                        <input type='file' ref={input => {this.pp = input}}/>

                        <div style={{fontWeight: 'bold', marginTop: 10}}>{this.props.user.username}</div>
                        
                        <div>
                        <TextField
                            label="Name" margin="dense" variant="outlined"
                            inputRef={input => this.name = input}
                            defaultValue={this.props.user.name}
                        />
                        </div>

                        <div>
                        <TextField
                            label="Email" margin="dense" variant="outlined"
                            inputRef={input => this.email = input}
                            defaultValue={this.props.user.email}
                        />
                        </div>

                        <div>
                        <Button  variant="contained" onClick={this.onSave} style={{backgroundColor: '#004d40', width: 200, color: 'white', marginTop: 25}}>
                            Save
                        </Button>
                        </div>
                    
                        
                        <div>
                        <Button  variant="contained" onClick={this.onCancel} style={{backgroundColor: '#004d40', width: 200, color: 'white', marginTop: 25}}>
                            Cancel
                        </Button>
                        </div>
                    </div>

                </div>
            )
        }
    }

}

const mapState = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapState, {onUpdateProfile})(ProfilePage)