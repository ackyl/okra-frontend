import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import AlbumTracksItem from './AlbumTracksItem'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

var styles = {
    root: {
        flexGrow: 1,
        marginTop: 20
    },
    left: {
        textAlign: 'left'
    },
    right: {
        textAlign: 'center'
    }
}

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
        if(this.props.album.id != ''){
            axios.get(`http://localhost:2019/tracks/${this.props.album.id}`)
                .then(res => {
                    this.setState({tracks: res.data})
                })
        }
    }

    getAlbumDetails = () => {
        if(this.props.album.id != ''){
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
                <h4>{album1[0].album_artist} - {album1[0].album_name}</h4>
            </div>

        ) : (<div></div>)

        if(this.props.album.id == ''){
            return(
            <Redirect to='/'></Redirect>
            )
        }else{
        return (
            <div style = {{...styles.root}}>
            <Grid container spacing={10}>

                <Grid item xs={3}>
                </Grid>

                <Grid item xs={3} style = {{...styles.left}}>
                    {this.renderTracks()}
                </Grid>

                <Grid item xs={3} style = {{...styles.right}}>
                    {wait}
                </Grid>

                <Grid item xs={3}>
                </Grid>

            </Grid>
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