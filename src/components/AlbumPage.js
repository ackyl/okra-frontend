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
        album1: null,
        edit: false,
        redirect: null
    }

    componentDidMount(){
        this.getAlbumTracks()
        this.getAlbumDetails()
    }

    onAddToCart = () => {
        const qty = this.qty.value
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

    onAddToCart = () => {
        const qty = this.qty.value
        const user_id = this.props.user.user_id
        const album_id = this.props.album.id

        axios.post(`http://localhost:2019/cart`, {qty, user_id, album_id})
            .then(res => {
                const stock = this.props.album.stock - qty
                
                axios.patch(`http://localhost:2019/stock/${this.props.album.id}`, {stock})
                    .then(res => {
                        this.state.album1[0].stock = stock
                        this.setState({album1: this.state.album1})
                })
        })
    }

    onEdit = () => {
        this.setState({edit: true})
    }

    onCancel = () => {
        this.setState({edit: false})
    }

    onDelete = () => {
        axios.delete(`http://localhost:2019/album/${this.props.album.id}`)
            .then(res => {
                this.setState({redirect: true})
            })
    }

    onSave = () => {
        const album_artist = this.artist.value
        const album_name = this.album.value
        const release_year = this.year.value
        const genre = this.genre.value
        const price = this.price.value
        const stock = this.stock.value

        axios.patch(`http://localhost:2019/album/${this.props.album.id}`, {album_artist, album_name, release_year, genre, price, stock})
            .then(res => {
                this.getAlbumDetails()
                this.setState({edit:false})
            })
    }


    render() {
        const {album1} = this.state
        const {redirect} = this.state

        var min = 1;
        var max = 7;
        var rand =  parseInt(min + (Math.random() * (max-min)))
        var idr = 0

        if(album1 !== null){
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'IDR',
              });
            
            idr = formatter.format(album1[0].price)
        }

        const red = redirect ? (
            <Redirect to='/'></Redirect>
        ) : (<div></div>)

        const wait = album1 ? (

            <div>
                <img src={album1[0].picture}/>
                <h5 style={{marginTop: 10}}>{album1[0].album_artist}</h5>
                <h5 style={{marginTop: 10}}>{album1[0].album_name}</h5>
                <div style={{marginTop: 10}}>{album1[0].release_year} | {album1[0].genre}</div>
                <div style={{marginTop: 10}}>Price : {idr}</div>
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
        }else if(this.props.user.user_type == 'user' && this.props.album.stock == undefined){
            return (
                <div className='row' style = {{width: '100%', padding: 0, margin: 0}}>

                    <div className='col-4' style={{marginTop: 25, textAlign: 'center'}}>
                        {wait}

                        <Button disabled='true' variant="contained" onClick={this.onAddToCart} style={{marginTop: 20}}>
                            Out of Stock
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

                        <Button  variant="contained" onClick={this.onAddToCart} style={{backgroundColor: '#004d40', color: 'white', marginTop: 20}}>
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
        }else if(this.props.user.user_type == 'admin' && this.state.edit == false){
            return (
                <div className='row' style = {{width: '100%', padding: 0, margin: 0}}>

                    <div className='col-4' style={{marginTop: 25, textAlign: 'center'}}>
                        {wait}

                        <div>
                        <Button variant="contained" onClick={this.onEdit} style={{backgroundColor: '#004d40', color: 'white', marginTop: 20, width: 150}}>
                            Edit Album
                        </Button>
                        </div>

                        <div>
                        <Button variant="contained" onClick={this.onDelete} style={{backgroundColor: '#004d40', color: 'white', marginTop: 20, width: 150, marginBottom: 40}}>
                            Delete Album
                        </Button>

                        {red}
                        
                        </div>
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

                    <div>
                        <img src={album1[0].picture}/>
                        <div>
                        <TextField
                            label="Album Artist" margin="dense" variant="outlined"
                            inputRef={input => this.artist = input}
                            defaultValue={album1[0].album_artist}
                        />
                        </div>
                        <div>
                        <TextField
                            label="Album Name" margin="dense" variant="outlined"
                            inputRef={input => this.album = input}
                            defaultValue={album1[0].album_name}
                        />
                        </div>
                        <div>
                        <TextField
                            label="Release Year" margin="dense" variant="outlined"
                            inputRef={input => this.year = input}
                            defaultValue={album1[0].release_year}
                        />
                        </div>
                        <div>
                        <TextField
                            label="Genre" margin="dense" variant="outlined"
                            inputRef={input => this.genre = input}
                            defaultValue={album1[0].genre}
                        />
                        </div>
                        <div>
                        <TextField
                            label="Price" margin="dense" variant="outlined"
                            inputRef={input => this.price = input}
                            defaultValue={album1[0].price}
                        />
                        </div>
                        <div>
                        <TextField
                            label="Stock" margin="dense" variant="outlined"
                            inputRef={input => this.stock = input}
                            defaultValue={album1[0].stock}
                        />
                        </div>
                    </div>

                        <div>
                        <Button variant="contained" onClick={this.onSave} style={{backgroundColor: '#004d40', color: 'white', marginTop: 20, width: 150}}>
                            Save
                        </Button>
                        </div>

                        <div>
                        <Button variant="contained" onClick={this.onCancel} style={{backgroundColor: '#004d40', color: 'white', marginTop: 20, width: 150, marginBottom: 40}}>
                            Cancel
                        </Button>
                        </div>
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