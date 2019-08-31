import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'
import {stayLogin} from '../actions/index'

import Home from './Home'
import Header from './Header'
import AlbumPage from './AlbumPage'
import Register from './Register'
import ProfilePage from './ProfilePage'
import CartPage from './CartPage'
import TransPage from './TransPage'
import TransDetail from './TransDetail'

const cookie = new cookies()

class App extends Component {

    componentDidMount(){
        const cooks = cookie.get('login')

        console.log(cooks)

        if(cooks !== undefined){
            this.props.stayLogin(cooks)
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Route path='/' exact component={Home}/>
                <Route path='/album' component={AlbumPage}/>
                <Route path='/register' component={Register}/>
                <Route path='/profile' component={ProfilePage}/>
                <Route path='/cart' component={CartPage}/>
                <Route path='/trans' component={TransPage}/>
                <Route path='/detail' component={TransDetail}/>
            </BrowserRouter>
        )
    }
}

export default connect(null, {stayLogin})(App)