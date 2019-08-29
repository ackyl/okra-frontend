import React, { Component } from 'react'
import Pause from '@material-ui/icons/PauseCircleOutline'
import Play from '@material-ui/icons/PlayCircleOutline'
import IconButton from '@material-ui/core/IconButton'


class AlbumTracksItem extends Component {

    state = {
        played: false
    }

    constructor(props){
        super(props)
        this.player = React.createRef()
    }

    playTrack = () => {
        this.player.current.play()
        this.setState({played: true})
    }

    pauseTrack = () => {
        this.player.current.pause()
        this.setState({played: false})
    }

    render(){

        var {track_number, track_name, mp3} = this.props.barang

        if(this.state.played == false){
            return (
                <div>
                    <IconButton>
                        <Play onClick={this.playTrack} style={{color: 'white'}}/>
                    </IconButton>
                        {track_number}. {track_name} <audio ref={this.player} src={mp3}/>                
                </div>
            )
        }else{
            return (
                <div>
                    <IconButton>
                        <Pause onClick={this.pauseTrack} style={{color: 'white'}}/>
                    </IconButton>
                        {track_number}. {track_name} <audio ref={this.player} src={mp3}/>                
                </div>
            )
        }  
    }

} 

export default AlbumTracksItem