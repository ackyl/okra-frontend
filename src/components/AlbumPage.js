import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import AlbumTracksItem from './AlbumTracksItem'
import Grid from '@material-ui/core/Grid';


class AlbumPage extends Component {

    state = {
        tracks: [],
        album: [],
        album1: null
    }

    componentDidMount(){
        this.getAlbumTracks()
        this.getAlbumDetails()
    }

    getAlbumTracks = () => {
        if(this.props.album.id !== ''){
            axios.get(`http://localhost:2019/tracks/${this.props.album.id}`)
                .then(res => {
                    this.setState({tracks: res.data})
                })
        }
    }

    getAlbumDetails = () => {
        if(this.props.album.id !== ''){
            axios.get(`http://localhost:2019/album/${this.props.album.id}`)
                .then(res => {
                    this.setState({album1: res.data})
                    console.log(this.state.album1[0].album_name)
                })
        }
    }

    renderTracks = () => {
        return this.state.tracks.map((item,key) => {
            return (
                <AlbumTracksItem barang={item} key={key} />
            )
        })
    }


    render() {
        const {album1} = this.state
        const wait = album1 ? (

            <div>
                <img src={album1[0].picture}/>
                <h4 style={{marginTop: 10}}>{album1[0].album_artist}</h4>
                <h4 style={{marginTop: 10}}>{album1[0].album_name}</h4>
                <div style={{marginTop: 10}}>{album1[0].release_year}, {album1[0].genre}</div>
            </div>

        ) : (<div></div>)

        if(this.props.album.id == ''){
            return(
            <Redirect to='/'></Redirect>
            )
        }else{
        return (
            <div className='row' style = {{width: '100%'}}>

                <div className='col-4' style={{marginTop: 25, textAlign: 'center'}}>
                    {wait}
                </div>

                <div>
                    {this.renderTracks()}
                </div>

            </div>
        )
        }
    }
}

const mapState = (state) => {
    return {
        album: state.album
    }
}

export default connect(mapState)(AlbumPage)