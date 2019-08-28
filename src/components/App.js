import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import AlbumPage from './AlbumPage'
import Register from './Register'

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Route path='/' exact component={Home}/>
                <Route path='/album' component={AlbumPage}/>
                <Route path='/register' component={Register}/>
            </BrowserRouter>
        )
    }
}

export default App