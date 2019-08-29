import React, { Component } from 'react'
import { connect } from 'react-redux'

class ProfilePage extends Component {

    render(){
        return (
            <div style = {{fontSize: 14}}>
                PROFILE PAGE
            </div>
        )
    }

}

const mapState = (state) => {
    return {
        album: state.album
    }
}

export default connect(mapState)(ProfilePage)