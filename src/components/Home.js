import React, { Component } from 'react'
import axios from 'axios'

import AlbumItem from './AlbumItem'
import AlbumTracksItem from './AlbumTracksItem'
// import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'

class Home extends Component {

    state = {
        albums: [],
        tracks: []
    }

    componentDidMount(){
        this.getAlbum()
        this.getAlbumTracks()
    }

    getAlbumTracks = () => {
        axios.get('http://localhost:2019/tracks/1')
            .then(res => {
                this.setState({tracks: res.data})
            })
    }

    getAlbum = () => {
        axios.get('http://localhost:2019/album')
            .then(res => {
               this.setState({albums: res.data})
            })
    }

    renderList = () => {

        return this.state.albums.map(item => {
            return (
                <AlbumItem barang={item}/>
            )
        })

    }

    renderTracks = () => {
        return this.state.tracks.map(item => {
            console.log(item)
            return (
                <AlbumTracksItem barang={item}/>
            )
        })
    }

    render() {
        return (

            <div className="row">

                <div className="col" style={{'margin-left': 30, 'margin-top': 25}}>

                        <div className="mx-auto card">
                            <div className="card-body">
                                <div className="card-title mt-1">
                                    Genre
                                </div>
                                <form className="input-group"><input ref={input => this.name = input} className="form-control" type="text"/></form>
                                
                                <div className="card-title mt-1">
                                    Price
                                </div>
                                
                                <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                
                                <button onClick={this.onBtnSearch} className="btn btn-outline-secondary btn-block mt-5">Filter</button>
                            </div>
                        </div>

                </div>

                <div className="row col-10">
                    {this.renderList()}
                    {this.renderTracks()}
                </div>

            </div>
        )
    }
}

export default Home