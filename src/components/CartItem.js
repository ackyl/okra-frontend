import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import {tempo} from '../actions/index'

var styles = {
    card: {
        width: 100,
        height: 100,
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

class CartItem extends Component {

    onDelete = () => {
        const id = this.props.cart.id
        const stock = this.props.cart.stock
        const qty = this.props.cart.qty
        const album_id = this.props.cart.album_id
        const newstock = stock + qty

        axios.delete(`http://localhost:2019/cart/${id}`)
            .then(res => {
                axios.patch(`http://localhost:2019/stock/${album_id}`, {stock: newstock})
                    .then(res => {
                        this.props.tempo('test')
                })
        })
    }

    render(){

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IDR',
          });

        var {picture, album_artist, album_name, price, qty} = this.props.cart
        
        price = formatter.format(price)

        return (
                <div className = 'row' style = {{width: '100%', marginTop: 40}}>
                    <div className = 'col-6' style = {{textAlign: 'right', paddingRight: 50, marginLeft: 0, paddingLeft: 0}}>
                        <img src={picture} style={{width: 200, height: 200}}/>
                    </div>

                    <div className = 'col-6' style = {{textAlign: 'left', marginRight: 0, padding: 0}}>
                        <div style = {{fontSize: 18, fontWeight: 'bold'}}> {album_artist} - {album_name} </div>
                        <div style = {{fontSize: 16, marginTop: 5}}> {price} </div>
                        <div style = {{fontSize: 16, marginTop: 5}}> Quantity: {qty} </div>
                        <Button variant="contained" onClick={this.onDelete} style={{backgroundColor: '#004d40', color: 'white', marginTop: 15, fontSize: 12}}>
                                Remove From Cart
                        </Button>
                    </div>
                </div>
            )
    }
}

const mapState = (state) => {
    return {
        album: state.album
    }
}

export default connect(mapState,{tempo})(CartItem)