import React, { Component } from 'react'
import axios from 'axios'
import AlbumItem from './AlbumItem'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class Home extends Component {

    state = {
        albums: []
    }

    componentDidMount(){
        this.getAlbum()
    }

    getAlbum = () => {
        axios.get('http://localhost:2019/album')
            .then(res => {
               this.setState({albums: res.data})
            })
    }

    renderList = () => {

        return this.state.albums.map( (item, key) => {
            return (
                <AlbumItem barang={item} key={key}/>
            )
        })

    }

    onSearch = () => {
        const artist = this.artist.value
        const album = this.album.value
        const genre = this.genre.value
        const min = this.min.value
        const max = this.max.value
        console.log(artist+album+genre+min+max)
    }

    render() {
        return (

            <div className="row" style={{width: '100%'}}>

                <div className="col-2" style={{marginLeft: 30, marginTop: 25}}>

                        <div className="mx-auto card">
                            <div className="card-body">

                            <TextField
                                label="Artist" margin="dense" variant="outlined"
                                inputRef={input => this.artist = input}
                            />

                            <TextField
                                label="Album" margin="dense" variant="outlined"
                                inputRef={input => this.album = input}
                            />

                            <TextField
                                label="Genre" margin="dense" variant="outlined"
                                inputRef={input => this.genre = input}
                            />

                            <TextField
                                label="Minimum Price" margin="dense" variant="outlined"
                                inputRef={input => this.min = input}
                            />

                            <TextField
                                label="Maximum Price" margin="dense" variant="outlined"
                                inputRef={input => this.max = input}
                            />

                            <Button variant="contained" onClick={this.onSearch} style={{backgroundColor: '#004d40', color: 'white', width: '100%', marginTop: 15}}>
                                Filter
                            </Button>
                            
                            </div>
                        </div>

                </div>

                <div className="row col-10">
                    {this.renderList()}
                </div>

            </div>
        )
    }
}

export default Home