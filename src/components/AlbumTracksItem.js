import React, { Component } from 'react'


class AlbumTracksItem extends Component {

    render(){

        var {track_number, track_name, mp3} = this.props.barang

        return (
            <div>
                {track_number}. {track_name}
                <audio src={mp3} controls/>
            </div>
        )
    }

} 

export default AlbumTracksItem