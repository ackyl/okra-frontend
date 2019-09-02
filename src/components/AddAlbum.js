import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

import {Link, Redirect} from 'react-router-dom'

class AddAlbum extends Component {

    state = {
        uploaded: null
    }

    onAdd = () => {
        const formData = new FormData()

        const mu = this.mu.files
        const price = this.price.value
        const stock = this.stock.value

        for(let i = 0; i < mu.length; i++){
            formData.append('mu', mu[i])
        }
        
        formData.append('price', price)
        formData.append('stock', stock)

        console.log(formData)

        axios.post(`http://localhost:2019/album`,formData).then(res=>{
            this.setState({uploaded: true})
            console.log(res)
        })
    }

    render(){

        const upload = this.state.uploaded ? (
            <div style={{fontWeight: 'bold', textAlign: 'center', marginTop: 20, marginBottom: 0}}>Upload Successful!</div>
        ) : (<div></div>)

        return(
            <div style={{width:'100%', textAlign: 'center', marginTop: 40, marginBottom: 40}}>
                <div className='mx-auto card' style={{width: 300, textAlign: 'center'}}>
                    <div>

                        <input type='file' ref={input => {this.mu = input}} style={{marginTop: 40, marginBottom: 20}} multiple/>
                        
                        <div>
                        <TextField
                            label="Price" margin="dense" variant="outlined"
                            inputRef={input => this.price = input}
                            defaultValue='500000'
                        />
                        </div>

                        <div>
                        <TextField
                            label="Stock" margin="dense" variant="outlined"
                            inputRef={input => this.stock = input}
                            defaultValue='10'
                        />
                        </div>

                        {upload}

                        <div>
                        <Button  variant="contained" onClick={this.onAdd} style={{backgroundColor: '#004d40', width: 200, color: 'white', marginTop: 25, marginBottom: 40}}>
                            Add Album
                        </Button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapState)(AddAlbum)