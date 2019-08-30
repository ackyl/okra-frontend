import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import AlbumTracksItem from './AlbumTracksItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


class AlbumPage extends Component {

    state = {
        tracks: [],
        album: [],
        album1: null
    }

    componentDidMount(){
        this.getAlbumTracks()
        this.getAlbumDetails()
        console.log('asd' + this.props.user.user_id)
    }

    onAddToCart = () => {
        const qty = this.qty.value
        console.log(qty)
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

        var min = 1;
        var max = 7;
        var rand =  parseInt(min + (Math.random() * (max-min)))

        console.log(rand)

        const wait = album1 ? (

            <div>
                <img src={album1[0].picture}/>
                <h4 style={{marginTop: 10}}>{album1[0].album_artist}</h4>
                <h4 style={{marginTop: 10}}>{album1[0].album_name}</h4>
                <div style={{marginTop: 10}}>{album1[0].release_year}, {album1[0].genre}</div>
                <div style={{marginTop: 10}}>Stock : {album1[0].stock}</div>
            </div>

        ) : (<div></div>)

        if(this.props.album.id == ''){
            return(
            <Redirect to='/'></Redirect>
            )
        }else if(this.props.user.user_id == ''){
            return (
                <div className='row' style = {{width: '100%', padding: 0, margin: 0}}>

                    <div className='col-4' style={{marginTop: 25, textAlign: 'center'}}>
                        {wait}
                    </div>

                    <div className='col-8' style={{minHeight: 600,
                            marginRight: 0,
                            backgroundImage: `url("../img/${rand}.jpg")`,
                            backgroundSize: '100%',
                            backgroundPosition: 'center'
                            }}>

                        <div style={{marginTop: 25, color: 'white'}}>
                            {this.renderTracks()}
                        </div>

                    </div>

                </div>
            )
        }else if(this.props.user.user_type == 'user'){
            return (
                <div className='row' style = {{width: '100%', padding: 0, margin: 0}}>

                    <div className='col-4' style={{marginTop: 25, textAlign: 'center'}}>
                        {wait}

                        <div>
                        <TextField
                            label="Quantity" margin="dense" variant="outlined"
                            inputRef={input => this.qty = input}
                            defaultValue='1'
                        />
                        </div>

                        <Button variant="contained" onClick={this.onAddToCart} style={{backgroundColor: '#004d40', color: 'white', marginTop: 20}}>
                            Add to Cart
                        </Button>
                    </div>

                    <div className='col-8' style={{minHeight: 600,
                            marginRight: 0,
                            backgroundImage: `url("../img/${rand}.jpg")`,
                            backgroundSize: '100%',
                            backgroundPosition: 'center'
                            }}>

                        <div style={{marginTop: 25, color: 'white'}}>
                            {this.renderTracks()}
                        </div>

                    </div>

                </div>
            )
        }else{
            return (
                <div className='row' style = {{width: '100%', padding: 0, margin: 0}}>

                    <div className='col-4' style={{marginTop: 25, textAlign: 'center'}}>
                        {wait}

                        <Button variant="contained" style={{backgroundColor: '#004d40', color: 'white', marginTop: 20}}>
                            Edit Album
                        </Button>
                    </div>

                    <div className='col-8' style={{minHeight: 600,
                            marginRight: 0,
                            backgroundImage: `url("../img/${rand}.jpg")`,
                            backgroundSize: '100%',
                            backgroundPosition: 'center'
                            }}>

                        <div style={{marginTop: 25, color: 'white'}}>
                            {this.renderTracks()}
                        </div>

                    </div>

                </div>
            )
        }
    }
}

const mapState = (state) => {
    return {
        album: state.album,
        user: state.user
    }
}

export default connect(mapState)(AlbumPage)