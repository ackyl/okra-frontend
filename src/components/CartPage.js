import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import CartItem from './CartItem'
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'

class CartPage extends Component {

    state = {
        carts: []
    }

    componentDidMount(){
        this.getCart()
    }

    onDelete = () => {
        
    }

    getCart = () => {
        axios.get(`http://localhost:2019/cart/${this.props.user.user_id}`)
            .then(res => {
                this.setState({carts: res.data})
            })
    }

    renderList = () => {
        return this.state.carts.map( (item, key) => {
            return (
                <CartItem cart={item} key={key}/>
            )
        })
    }

    render(){
        if(this.props.user.user_id == ''){
            return(
                <Redirect to='/'></Redirect>
            )
        }else if(this.state.carts[0] !== undefined){
            return (
                <div style = {{width: '100%', textAlign: 'center', marginTop: 40, minHeight: 800}}>
                    {this.renderList()}
                    <Button variant="contained" onClick={this.onDelete} style={{backgroundColor: '#004d40', color: 'white', marginTop: 60}}>
                        Checkout
                    </Button>
                </div>
            )
        }else{
            return (
                <div style = {{width: '100%', textAlign: 'center', marginTop: 40}}>
                    <h4>Your Cart is Still Empty.</h4>
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