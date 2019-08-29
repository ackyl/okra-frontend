import React, { Component } from 'react'
import { connect } from 'react-redux'

class CartPage extends Component {

    render(){
        return (
            <div style = {{fontSize: 14}}>
                Cart PAGE
            </div>
        )
    }

}

const mapState = (state) => {
    return {
        album: state.album
    }
}

export default connect(mapState)(CartPage)