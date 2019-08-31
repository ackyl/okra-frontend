import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'

class CartPage extends Component {

    state = {
        carts: [],
        begone: false
    }

    componentDidMount(){
        this.getCart()
    }

    onDelete = (id, stock, qty, album_id) => {
        const newstock = stock + qty

        axios.delete(`http://localhost:2019/cart/${id}`)
            .then(res => {
                axios.patch(`http://localhost:2019/stock/${album_id}`, {stock: newstock})
                    .then(res => {
                        this.getCart()
                })
        })
    }

    getCart = () => {
        axios.get(`http://localhost:2019/cart/${this.props.user.user_id}`)
            .then(res => {
                this.setState({carts: res.data})
            })
    }

    onCheckout = () => {
        console.log(this.state.carts[0].td_id)
        axios.patch(`http://localhost:2019/trans/${this.state.carts[0].td_id}`)
            .then(res => {
                this.setState({begone: true})
            })
    }

    renderList = () => {
        return this.state.carts.map( (item, key) => {

            console.log(item.price)

            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'IDR',
              });
            
            item.price = formatter.format(item.price)

            return (
                <div className = 'col-6' key={key}>
                    <div className = 'row' style = {{width: '100%', marginTop: 40}}>
                    <div className = 'col-6' style = {{textAlign: 'right', paddingRight: 50, marginLeft: 0, paddingLeft: 0}}>
                        <img src={item.picture} style={{width: 200, height: 200}}/>
                    </div>

                    <div className = 'col-6' style = {{textAlign: 'left', marginRight: 0, padding: 0}}>
                        <div style = {{fontSize: 18, fontWeight: 'bold'}}> {item.album_artist} - {item.album_name} </div>
                        <div style = {{fontSize: 16, marginTop: 5}}> {item.price} </div>
                        <div style = {{fontSize: 16, marginTop: 5}}> Quantity: {item.qty} </div>
                        <Button variant="contained" onClick={() => this.onDelete(item.id, item.stock, item.qty, item.album_id)}
                        style={{backgroundColor: '#004d40', color: 'white', marginTop: 15, fontSize: 12}}>
                                Remove From Cart
                        </Button>
                    </div>
                </div>
                </div>
            )
        })
    }

    render(){
        if(this.props.user.user_id == ''){
            return(
                <Redirect to='/'></Redirect>
            )
        }else if(this.state.begone == true){
            return(
                <Redirect to='/'></Redirect>
            )
        }else if(this.state.carts[0] !== undefined){
            return (
                <div style = {{width: '100%', textAlign: 'center', marginTop: 0, minHeight: 800}}>
                    <div className ='row' style = {{width:'100%'}}>
                    {this.renderList()}
                    </div>
                    <Button variant="contained" onClick={this.onCheckout} style={{backgroundColor: '#004d40', color: 'white', marginTop: 60, marginBottom: 60}}>
                        Checkout
                    </Button>
                </div>
            )
        }else{
            return (
                <div style = {{width: '100%', textAlign: 'center', marginTop: 40}}>
                    <div style={{fontSize: 20, fontWeight: 'bold'}}>Your Cart is Still Empty.</div>
                </div>
            )
        }
    }

}

const mapState = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapState)(CartPage)