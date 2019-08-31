import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button';

class TransDetail extends Component {

    state = {
        trans: [],
        tranz: []
    }

    componentDidMount(){
        if(this.props.album.tdid != '')
            this.getTrans()
    }

    getTrans = () => {
        axios.get(`http://localhost:2019/trans/detail/${this.props.album.tdid}`)
            .then(res => {
               this.setState({trans: res.data})
               axios.get(`http://localhost:2019/trans/detailz/${this.props.album.tdid}`)
                    .then(res => {
                    this.setState({tranz: res.data})
                    })
            })
    }

    renderLeft = () => {
        return this.state.trans.map( (item, key) => {

            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'IDR',
              });
            
            if(item.price / 2)
            item.price = formatter.format(item.price)

            return (
                <div key={key} className="row col-12" style={{margin: 0, padding:0}}>
                    <div className="col" style = {{textAlign: 'right', paddingRight: 50, marginLeft: 0, paddingLeft: 0, marginTop: 40}}>
                        <img src={item.picture} style={{width: 100, height: 100}}/>
                    </div>

                    <div className="col" style = {{textAlign: 'left', marginRight: 0, padding: 0, marginTop: 40}}>
                        <div style = {{fontSize: 18, fontWeight: 'bold'}}> {item.album_artist} - {item.album_name} </div>
                        <div style = {{fontSize: 16, marginTop: 5}}> {item.price} </div>
                        <div style = {{fontSize: 16, marginTop: 5}}> Quantity: {item.qty} </div>
                    </div>
                </div>
            )
        })
    }

    renderRight = () => {
        return this.state.tranz.map( (item,key) => {

            const num = key + 1
            let status = ''
            let color = ''

            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'IDR',
              });
            
            if(item.total_harga / 2)
            item.total_harga = formatter.format(item.total_harga)

            if(item.trans_type == 'in progress' && item.picture == null)
                status = 'Please Upload Your Proof of Payment'
            else if(item.trans_type == 'in progress' && item.picture != null)
                status = "Proof of Payment Isn't Yet Verified"

            if(item.picture == null){
                return(
                    <div key={key} className='col-6' style = {{textAlign: 'left', marginLeft: 0, marginTop: 40}}>
                        <div style = {{fontSize: 16, fontWeight: 'bold', marginBottom: 15}}> TRANSACTION {num} </div>
                        <div style = {{marginTop: 0}}> Total Album: {item.total_album} </div>
                        <div style = {{marginTop: 10}}> Total Harga: {item.total_harga} </div>
                        <div style = {{marginTop: 10, fontWeight: 'bold'}}> {status} </div>
                        <input style = {{marginTop: 20}} type='file' ref={input => {this.bukti = input}}/>
                        <div>
                        <Button  variant="contained" onClick={this.onUpload} style={{backgroundColor: '#004d40', width: 120, color: 'white', marginTop: 20}}>
                                Upload
                        </Button>
                        </div>
                    </div>
                )
            }else{

                const bukti = `http://localhost:2019/trans/bukti/${item.picture}`

                return(
                    <div key={key} className='col-6' style = {{textAlign: 'left', marginLeft: 0, marginTop: 40}}>
                        <div style = {{fontSize: 16, fontWeight: 'bold', marginBottom: 15}}> TRANSACTION {num} </div>
                        <div style = {{marginTop: 0}}> Total Album: {item.total_album} </div>
                        <div style = {{marginTop: 10}}> Total Harga: {item.total_harga} </div>
                        <div style = {{marginTop: 10, fontWeight: 'bold'}}> {status} </div>

                        <div style = {{marginTop: 10}}>
                            <img src={bukti} style={{width: 150, height: 150, objectFit: 'cover'}}/>
                        </div>

                        <input style = {{marginTop: 20}} type='file' ref={input => {this.bukti = input}}/>
                        
                        <div>
                        <Button  variant="contained" onClick={this.onUpload} style={{backgroundColor: '#004d40', width: 120, color: 'white', marginTop: 20}}>
                                Upload
                        </Button>

                        </div>
                    </div>
                )
            }
        })
    }

    onUpload = () => {
        const formData = new FormData()

        const bukti = this.bukti.files[0]
        const picture = this.bukti.files[0].name
        const td_id = this.props.album.tdid

        formData.append('bukti', bukti)
        formData.append('picture', picture)
        formData.append('td_id', td_id)

        axios.post(`http://localhost:2019/trans/bukti`,formData).then(res=>{
            console.log(res)
        })
    }

    render() {
        if(this.props.album.tdid == ''){
            return(
                <Redirect to='/trans'></Redirect>
            )
        }else{
            return (
                <div className ='row' style={{width: '100%', textAlign: 'center', marginBottom: 40}}>
                    <div className = 'col-6'>
                        {this.renderLeft()}
                    </div>
                        {this.renderRight()}
                </div>
            )
        }
    }
}

const mapState = (state) => {
    return {
        user: state.user,
        album: state.album
    }
}

export default connect(mapState)(TransDetail)