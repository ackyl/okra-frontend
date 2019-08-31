import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'

class TransPage extends Component {

    state = {
        trans: []
    }

    componentDidMount(){
        console.log(this.props.user)
        if(this.props.user.user_id != '')
            this.getTrans()
    }

    getTrans = () => {
        axios.get(`http://localhost:2019/trans/${this.props.user.user_id}`)
            .then(res => {
               this.setState({trans: res.data})
               console.log(this.state.trans)
            })
    }

    renderList = () => {

        console.log(this.state.trans)

        return this.state.trans.map( (item, key) => {

            console.log(item)
            const num = key + 1
            let status = ''
            let color = ''

            if(item.trans_type == 'in progress' && item.picture == null)
                status = 'Bukti Pembayaran Belom Di Upload'
                color = 'red'

            return (
                <div className='col-12' key={key} style = {{textAlign: 'center', marginLeft: 0, marginTop: 40}}>    
                    
                    <div className='mx-auto card' style = {{width: 500, borderColor: color}}>
                        <Link to='/' style={{color: 'black'}}>
                            <div style = {{fontSize: 16, fontWeight: 'bold', marginBottom: 15, marginTop: 15}}> TRANSACTION {num} </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div style = {{marginTop: 0}}> Total Album: {item.total_album} </div>
                                    <div style = {{marginTop: 10}}> Total Harga: {item.total_harga} </div>
                                    <div style = {{fontSize: 14, marginTop: 10, fontWeight: 'bold'}}>{status} </div>
                                </li>
                            </ul>
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

export default connect(mapState)(TransPage)