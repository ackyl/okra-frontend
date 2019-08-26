import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AudioPlayer from 'react-h5-audio-player'

const path = require('path')

var styles = {
    card: {
        width: 200,
        height: 200,
        margin: 20,
        'margin-top': 25
    },
    media: {
        height: 200,
        width: 200
    },
    center: {
        'text-align': 'center',
        width: 200,
        'margin-left': 20
    }
}

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