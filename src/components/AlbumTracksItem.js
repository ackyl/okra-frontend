import React, { Component } from 'react'


class AlbumTracksItem extends Component {

    render(){

        var {track_number, track_name, mp3} = this.props.barang

        return (
            <div>
                <div style = {{fontSize: 16}}>
                    {track_number}. {track_name}
                </div>
                <audio src={mp3} controls style={{display: 'block'}} />
            </div>
        )
    }

} 

export default AlbumTracksItem