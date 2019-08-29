import React, {Component} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import {onLogin, onLogout} from '../actions/index'

var styles = {
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
  },
  bg: {
    background: '#ffffff',
    color: '#212121'
  },
  stripe: {
    height: 1,
    background: '#212121',
    opacity: 0.2
  }
}

class Header extends Component {

  onClickLogin = () => {
    const username = this.username.value
    const password = this.password.value

    this.props.onLogin(username,password)
  }

  onClickLogout = () => {
    this.props.onLogout()
  }

  componentDidMount(){
    console.log(this.props.user)
  }

  render(){
    if(this.props.user.user_id !== ''){
      return(
        <div style={{...styles.root}}>
            <Toolbar style={{...styles.bg}}>
              <Typography variant="h6" style={{...styles.title}}>
                <Link to="/">
                  Okra Record Store
                </Link>
              </Typography>

              <Link to='/cart'>
              <IconButton color="inherit">
                  <ShoppingCart />
              </IconButton>
              </Link>
              
              <Link to='/profile'><Button color="inherit">Edit Profile</Button></Link>
              <Button color="inherit" onClick={this.onClickLogout}>Logout</Button>
  
            </Toolbar>
  
            <div style={{...styles.stripe}}>
            </div>
        </div>
      )
    }else{
      return (
        <div style={{...styles.root}}>
            <Toolbar style={{...styles.bg}}>
              <Typography variant="h6" style={{...styles.title}}>
                <Link to="/">
                  Okra Record Store
                </Link>
              </Typography>

              <InputBase
                placeholder="Username"
                inputProps={{ 'aria-label': 'search' }}
                inputRef={input => this.username = input}
              />

              <InputBase
                placeholder="Password"
                inputProps={{ 'aria-label': 'search' }}
                type='password'
                inputRef={input => this.password = input}
              />

              <Link to="/register">
                <Button color="inherit">Register</Button>
              </Link>

              <Link to="/" onClick={this.onClickLogin}>
                <Button color="inherit">Login</Button>
              </Link>
  
            </Toolbar>

            <div style={{...styles.stripe}}>
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

export default connect(mapState, {onLogin, onLogout})(Header)