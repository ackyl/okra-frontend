import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { selectedAlbum } from '../actions/index'
import {Link} from 'react-router-dom'

var styles = {
    card: {
        width: 200,
        height: 200,
        marginLeft: 20,
        marginTop: 25
    },
    media: {
        height: 200,
        width: 200
    },
    center: {
        textAlign: 'center',
        width: 200,
        marginLeft: 20
    }
}

class AlbumItem extends Component {


    render(){

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IDR',
          });

        var {album_id, album_name, album_artist, picture, price, stock} = this.props.barang
        
        price = formatter.format(price)

        const min = 1
        const max = 7
        const rand = parseInt(min + Math.random() * (max - min))

        if(stock>0){
            return (
                <div style = {{fontSize: 14}}>
                    <Card style = {{...styles.card}}>
                    <Link to="/album">
                    <CardActionArea onClick = {() => {this.props.selectedAlbum(album_id, stock)}}>
                        <CardMedia
                        style = {{...styles.media}}
                        image={picture}
                        />
                    </CardActionArea>
                    </Link>
                    </Card>

                    <div style = {{...styles.center}}>
                        <Typography variant="subtitle2">
                            {album_artist} - {album_name}
                        </Typography>
                        <Typography variant="body2" component="h3" style={{color: '#004d40'}}>
                            {price}
                        </Typography>
                    </div>
                    
                </div>
            )
        }else{
            return (
                <div style = {{fontSize: 14}}>
                    <Card style = {{...styles.card}}>
                    <Link to="/album">
                    <CardActionArea
                        onClick = {() => {this.props.selectedAlbum(album_id)}}
                        style={{position: 'relative', textAlign: 'center'}}
                    >

                        <img src={picture} style={{width: 200, height: 200, opacity: 0.5}}/>
                        <div style={{position: 'absolute', top:'50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontWeight: 'bolder', fontSize: 12}}>OUT OF STOCK</div>
                    </CardActionArea>
                    </Link>
                    </Card>

                    <div style = {{...styles.center}}>
                        <Typography variant="subtitle2">
                            {album_artist} - {album_name}
                        </Typography>
                        <Typography variant="body2" component="h3" style={{color: '#aeaeae'}}>
                            {price}
                        </Typography>
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

export default connect(mapState,{selectedAlbum})(AlbumItem)