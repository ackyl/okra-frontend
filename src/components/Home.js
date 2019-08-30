import React, { Component } from 'react'
import axios from 'axios'
import AlbumItem from './AlbumItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class Home extends Component {

    state = {
        albums: [],
        filtered: []
    }

    componentDidMount(){
        this.getAlbum()
    }

    getAlbum = () => {
        axios.get('http://localhost:2019/album')
            .then(res => {
               this.setState({albums: res.data})
               this.setState({filtered: res.data})
            })
    }

    sortPrice = (a,b) => {
        if(a.price<b.price) return -1
        if(a.price>b.price) return 1
        return 0
    }

    renderList = () => {

        return this.state.filtered.map( (item, key) => {
            return (
                <AlbumItem barang={item} key={key}/>
            )
        })

    }

    onSearch = () => {
        const album_artist = this.artist.value
        const album_name = this.album.value
        const genre = this.genre.value
        const min = this.min.value
        const max = this.max.value

        var x = this.state.albums
        
        x = x.filter(item=>{
            if(item.album_artist.toLowerCase().includes(album_artist.toLowerCase()))
                return true
        })

        x = x.filter(item=>{
            if(item.album_name.toLowerCase().includes(album_name.toLowerCase()))
                return true
        })

        x = x.filter(item=>{
            if(item.genre.toLowerCase().includes(genre.toLowerCase()))
                return true
        })

        x = x.filter(item=>{
            if(min === '')
                return true
            else
                return item.price >= min
        })

        x = x.filter(item=>{
            if(max === '')
                return true
            else
                return item.price <= max
        })

        this.setState({filtered: x})
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