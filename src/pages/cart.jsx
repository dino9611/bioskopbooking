import React from 'react';
import {connect} from 'react-redux'
import {onGabungan} from './../redux/actions'
import Axios from 'axios'
import { ApiURL } from '../supports/UApiURL';
import {
    Table,
    TableBody,
    TableCell,
    
    Paper,
    Container,
    TableHead,
    TableRow,
} from '@material-ui/core'

class Cart extends React.Component {
    state = {
        cart:[],
        cartfinal:[]

      }
    componentDidMount(){
    var id=this.props.user.id
    
    Axios.get('http://localhost:2000/users/'+id)
    .then((res)=>{
        this.setState({cart:res.data.cart})
    })
    

    console.log(this.props.user)
      
        
        // var pilihan=this.state.orderseat
        // pilihan.push(this.props.pilih)
        // this.setState({orderseat:pilihan})
        // console.log(this.state.orderseat);
        
        
    }
    onCheckout=(index)=>{
        var data=this.state.cart
        var transaction=data[index]
        console.log(transaction)
        var transaksi=this.props.user.transaction
        transaksi.push(transaction)
        console.log(transaksi)
        data.splice(index,1)
        this.setState({cart:data})
        Axios.patch(ApiURL+'/users/'+this.props.user.id,{cart:data})
        .then(()=>{
            alert('terimakasih telah membayar')
            Axios.patch(ApiURL+'/users/'+this.props.user.id,{transaction:transaksi})
            .then(()=>{
    
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    rendercart=()=>{
        if(this.state.cart.length===0){
            return(<div>loading...</div>)
        }
        return this.state.cart.map((val,index)=>{
                return(
                    <TableRow>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{val.title}</TableCell>
                        <TableCell>
                          {val.quantity}
                        </TableCell>
                        <TableCell>
                          {val.totalharga}
                        </TableCell>
                        <TableCell>
                            <input value='cancel' type='button' className='btn btn-danger'/>
                        </TableCell>
                        <TableCell>
                            <input value=' checkout' className='btn btn-success' type='button' onClick={()=>this.onCheckout(index)}/>
                        </TableCell>
                    </TableRow>
                )
            })
        
    }
    render() { 
        return (
        <Container>
            <Paper>
                <Table>
                    <TableHead>
                        <TableCell>No.</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Jumlah kursi</TableCell>
                        <TableCell>Total Harga</TableCell>
                        <TableCell>Cancel</TableCell>
                        <TableCell>Checkout</TableCell>
                    </TableHead>
                    <TableBody>
                        {this.state.filmpilihan===null?<h1>loading...</h1>: this.rendercart()}
                    </TableBody>
                </Table>

            </Paper>
        </Container> );
    }
}
const mapStateToProps=(state)=>{
    return{
        pilih:state.bebas.chosen,
        movie:state.movie,
        seat:state.seat.seat,
        user:state.user
    }
} 
export default connect(mapStateToProps,{onGabungan})(Cart);