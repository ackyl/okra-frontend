import React, {Component} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
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
    marginLeft: 10
  },
  bg: {
    background: '#004d40',
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
                <Link to="/" style={{color: 'white'}}>
                  Okra Record Store
                </Link>
              </Typography>

              <Link to='/cart' style={{color: 'white'}}><Button color="inherit">Cart</Button></Link>
              <Link to='/profile' style={{color: 'white'}}><Button color="inherit">Profile</Button></Link>
              <Button color="inherit" onClick={this.onClickLogout} style={{color: 'white'}}>Logout</Button>
  
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
                <Link to="/" style={{color: 'white'}}>
                  Okra Record Store
                </Link>
              </Typography>

              <InputBase
                placeholder="Username"
                inputProps={{ 'aria-label': 'search' }}
                inputRef={input => this.username = input}
                style={{color: 'white'}}
              />

              <InputBase
                placeholder="Password"
                inputProps={{ 'aria-label': 'search' }}
                type='password'
                inputRef={input => this.password = input}
                style={{color: 'white'}}
              />

              <Link to="/" onClick={this.onClickLogin} style={{color: 'white'}}>
                <Button color="inherit">Login</Button>
              </Link>

              <Link to="/register" style={{color: 'white'}}>
                <Button color="inherit">Register</Button>
              </Link>

            </Toolbar>

            {/* <div style={{...styles.stripe}}>
            </div> */}
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