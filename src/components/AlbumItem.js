import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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

class AlbumItem extends Component {


    render(){

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IDR',
          });

        var {album_name, album_artist, picture, price} = this.props.barang
        
        price = formatter.format(price)

        return (
            <div style = {{'font-size': 14}}>
                <Card style = {{...styles.card}}>
                <CardActionArea href='/album'>
                    <CardMedia
                    style = {{...styles.media}}
                    image={picture}
                    />
                </CardActionArea>
                </Card>

                <div style = {{...styles.center}}>
                    <Typography variant="p" component="p">
                        {album_artist} - {album_name}
                    </Typography>
                    <Typography variant="body2" component="h3" style={{color: 'red'}}>
                        {price}
                    </Typography>
                </div>
                
            </div>
        )
    }
} 

export default AlbumItem