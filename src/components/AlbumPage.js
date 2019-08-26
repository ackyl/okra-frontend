import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class AlbumPage extends Component {

    componentDidMount(){
        console.log(this.props.album)
    }

    render() {

        return (
            <div>
                {this.props.album.id}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        album: state.album
    }
}

export default connect(mapState)(AlbumPage)