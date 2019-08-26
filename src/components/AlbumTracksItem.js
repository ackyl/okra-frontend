import React, { Component } from 'react'

class AlbumTracksItem extends Component {

    render(){

        var {track_name, mp3} = this.props.barang

        return (
            <div>
                <audio src={mp3} controls/>
            </div>
        )
    }

} 

export default AlbumTracksItem