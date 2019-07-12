import React from 'react';
import {connect} from 'react-redux'
import {onGabungan,OnLoginSuccess} from './../redux/actions'
import Axios from 'axios'
import { ApiURL } from '../supports/UApiURL';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    Paper,
    Container,
    TableHead,
    TableRow,
} from '@material-ui/core'
import Numeral from 'numeral'
import Pagenotfound from './pagesnotfound'
import {Redirect} from 'react-router-dom'

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
    // onCheck=(index)=>{
    //     var data=this.state.cart
    //     var transaction=data[index]
    //     data.splice(index,1)
    //     this.setState({cart:data})
    //     Axios.patch(ApiURL+'/users/'+this.props.user.id,{cart:data})
    //     .then(()=>{
    //         alert('terimakasih telah membayar')
    //         Axios.patch(ApiURL+'/users/'+this.props.user.id,{transaction:transaksi})
    //         .then(()=>{
    
    //         })
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // }
    onDeleteClick=(index)=>{
        Axios.get(ApiURL+'/movies/?title='+this.state.cart[index].title)
        .then((res)=>{
            var id=res.data[0].id
            var arr=res.data[0].booked.map((val)=>{return val.join('')})
            var arr1=this.state.cart[index].seats.map((val=>{return val.join('')}))
            console.log(arr1)
            arr=arr.filter((val)=>{return !arr1.includes(val)})
            console.log(arr)
            var arrbaru=arr.map((val)=>{if(val.length!==2){return [val[0],val[1]+val[2]]}else{return[val[0],val[1]]}})
            console.log(arrbaru)
            var bookedbaru1=arrbaru.map((val)=>{return val.map((val1)=>{return parseInt(val1)})})
            console.log(bookedbaru1)//booked setelah yang sudah dikurangi cart yang mau dihapus
            var data=this.state.cart
            data.splice(index,1)
            Axios.patch(ApiURL+'/movies/'+id,{booked:bookedbaru1})
            .then((res)=>{
                Axios.patch(ApiURL+'/users/'+this.props.user.id,{cart:data})
                this.setState({cart:data})
            })
            .catch((err)=>{
                console.log(err)
            })
        })
    }
    onCheckOut=()=>{
        if(this.state.cart.length!==0){
            var data=this.state.cart
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            var obj={tanggal:today,item:data}
            var transaksi=this.props.user.transaction
            var arr=[...transaksi,obj]
            Axios.patch(ApiURL+'/users/'+this.props.user.id,{transaction:arr})
                .then(()=>{
                    this.setState({cart:[]})
                    Axios.patch(ApiURL+'/users/'+this.props.user.id,{cart:this.state.cart})
                    .then((res)=>{
                        this.props.OnLoginSuccess(res.data)
                        alert('tiket sukses anda beli terimakasih')
                    })
                })
        }else{
            alert('tidak ada tiket yang anda pesan')
        }


    }
    totalharga=()=>{
        var total=0
        this.state.cart.forEach((val)=>{
            return total+=val.totalharga
        })
        total='Rp. '+ Numeral(total).format('0,0')+',00' 
        return total
        
    }
    rendercart=()=>{
  
        if(this.state.cart.length===0){
            return(                   
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                        <h1>Cart kosong</h1>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>)
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
                          {'Rp. '+ Numeral(val.totalharga).format('0,0')+',00' }
                        </TableCell>
                        <TableCell>
                            <input value='cancel' type='button' className='btn btn-danger' onClick={()=>this.onDeleteClick(index)}/>
                        </TableCell>
                    </TableRow>
                )
            })
        
    }
    render() {
        if(this.props.user.id===0){
            return (<Redirect to='/'></Redirect>)
        }
        if(this.props.user.role!=='user'){
            return(<Pagenotfound/>)
        }
        return (
        <Container>
            <Paper className='mt-5' >
                <Table>
                    <TableHead>
                        <TableCell>No.</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Jumlah kursi</TableCell>
                        <TableCell>Total Harga</TableCell>
                        <TableCell>Cancel</TableCell>
                    </TableHead>
                    <TableBody>
                        {this.state.filmpilihan===null?<h1>loading...</h1>: this.rendercart()}
                    </TableBody>
                    <TableFooter colspan='5' className='justify-content-end'>
                        
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                            Total keseluruhan
                        </TableCell>
                        <TableCell>
                            <span className='mt-5'> {this.totalharga()}</span>
                        </TableCell>
                        
                    </TableFooter>
                </Table>

            </Paper>
            <input value=' Checkout' className='btn btn-success m-3 ' type='button' onClick={this.onCheckOut}/>
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
export default connect(mapStateToProps,{onGabungan,OnLoginSuccess})(Cart);