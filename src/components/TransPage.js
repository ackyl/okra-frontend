import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import { selectedTrans } from '../actions/index'

class TransPage extends Component {

    state = {
        trans: [],
        verify: []
    }

    componentDidMount(){
        if(this.props.user.user_id != '')
            this.getTrans()
            this.getTransAdmin()
    }

    getTrans = () => {
        axios.get(`http://localhost:2019/trans/${this.props.user.user_id}`)
            .then(res => {
               this.setState({trans: res.data})
            })
    }

    getTransAdmin = () => {
        axios.get(`http://localhost:2019/verify`)
            .then(res => {
                this.setState({verify: res.data})
            })
    }
    
    onDetail = (tdid) => {
        console.log(tdid)
        this.props.selectedTrans(tdid)
    }

    renderList = () => {

        return this.state.trans.map( (item, key) => {

            const num = key + 1
            let status = ''
            let color = ''

            if(item.trans_type == 'in progress' && item.picture == null){
                status = 'Please Upload Your Proof of Payment'
                color = 'red'
            }else if(item.trans_type == 'in progress' && item.picture != null){
                status = "Proof of Payment Isn't Yet Verified"
                color = 'yellow'
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
                            <div style = {{fontSize: 16, fontWeight: 'bold', marginBottom: 15, marginTop: 15}}> TRANSACTION {num} </div>
                                    <div style = {{marginTop: 0}}> Total Album: {item.total_album} </div>
                                    <div style = {{marginTop: 10}}> Total Harga: {item.total_harga} </div>
                                    <div style = {{marginTop: 10, fontWeight: 'bold', marginBottom: 20}}> {status} </div>
                        </Link>
                    </div>
                </div>
            )
        })

    }

    renderList2 = () => {
        return this.state.verify.map( (item, key) => {
            
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'IDR',
                });
            
            if(item.total_harga / 2)
            item.total_harga = formatter.format(item.total_harga)

            return(
                <div className='col-12' key={key} style = {{textAlign: 'center', marginLeft: 0, marginTop: 40}}>    
                    <div className='mx-auto card' style = {{width: 500, borderWidth: 2}}>
                        <Link to='/detail' onClick = {() => {this.onDetail(item.td_id)}} style={{color: 'black'}}>
                            <div style = {{fontSize: 16, fontWeight: 'bold', marginBottom: 15, marginTop: 15}}> Transaction {item.td_id}</div>
                            <div style = {{marginTop: 0}}> Username: {item.username} </div>
                            <div style = {{marginTop: 10}}> Total Album: {item.total_album} </div>
                            <div style = {{marginTop: 10, marginBottom: 20}}> Total Harga: {item.total_harga} </div>
                        </Link>
                    </div>
                </div>
            )
        })
    }

    render() {
        if(this.props.user.user_id == ''){
            return(
                <Redirect to='/'></Redirect>
            )
        }else if(this.props.user.user_type == 'user'){
            return (
                <div className="row" style={{width: '100%', textAlign: 'center', marginBottom: 40}}>
                    {this.renderList()}
                </div>
            )
        }else{
            return (
                <div className="row" style={{width: '100%', textAlign: 'center', marginBottom: 40}}>
                    {this.renderList2()}
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

export default connect(mapState,{selectedTrans})(TransPage)