import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import { selectedTrans } from '../actions/index'

class AllTrans extends Component {

    state = {
        trans: []
    }

    componentDidMount(){
        if(this.props.user.user_id != '')
            this.getTrans()
    }

    getTrans = () => {
        axios.get(`http://localhost:2019/alltrans`)
            .then(res => {
               this.setState({trans: res.data})
            })
    }
    
    onDetail = (tdid) => {
        this.props.selectedTrans(tdid)
    }

    renderList = () => {

        if(this.state.trans[0] !== undefined){
        return this.state.trans.map( (item, key) => {

            let status = ''
            let color = ''

            if(item.trans_type == 'in progress'){
                status = 'Proof of Payment Is Not Yet Uploaded'
                color = 'red'
            }else if(item.trans_type == 'waiting'){
                status = "Proof of Payment Is Waiting to be Verified"
                color = 'yellow'
            }else if(item.trans_type == 'decline'){
                status = 'Payment Declined, Waiting For Another Upload'
                color = 'red'
            }else{
                status = 'Payment Success'
                color = 'green'
            }

            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'IDR',
                });
            
            if(item.total_harga / 2)
            item.total_harga = formatter.format(item.total_harga)

            return (
                <div className='col-12' key={key} style = {{textAlign: 'center', marginLeft: 0, marginTop: 40}}>    
                    <div className='mx-auto card' style = {{width: 500, borderColor: color, borderWidth: 2}}>
                        <Link to='/detail' onClick = {() => {this.onDetail(item.td_id)}} style={{color: 'black'}}>
                            <div style = {{fontSize: 16, fontWeight: 'bold', marginBottom: 15, marginTop: 15}}> TRANSACTION {item.td_id} </div>
                                    <div style = {{marginTop: 0}}> Username: {item.username} </div>
                                    <div style = {{marginTop: 10}}> Total Album: {item.total_album} </div>
                                    <div style = {{marginTop: 10}}> Total Harga: {item.total_harga} </div>
                                    <div style = {{marginTop: 10, fontWeight: 'bold', marginBottom: 20}}> {status} </div>
                        </Link>
                    </div>
                </div>
            )
        })
        }else{
            return(
                <div style = {{width: '100%', textAlign: 'center', marginTop: 40}}>
                    <div style={{fontSize: 20, fontWeight: 'bold'}}>No Transaction Yet.</div>
                </div>
            )
        }

    }

    render() {
        if(this.props.user.user_id == ''){
            return(
                <Redirect to='/'></Redirect>
            )
        }else{
            return (
                <div className="row" style={{width: '100%', textAlign: 'center', marginBottom: 40}}>
                    {this.renderList()}
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

export default connect(mapState,{selectedTrans})(AllTrans)