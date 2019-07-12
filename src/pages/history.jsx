import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    
    Paper,
    Container,
    TableHead,
    TableRow,
    TableFooter,
} from '@material-ui/core'
import Axios from 'axios'
import {connect} from 'react-redux'
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import Numeral from 'numeral'
import Pagenotfound from './pagesnotfound'
import {Redirect} from 'react-router-dom'
class History extends React.Component {
    state = {
        datatransaksi:[],
        indexopen:null,
        modalopen:false,
        totalharga:0,
      }
    componentDidMount(){
        var id=this.props.user.id
        Axios.get('http://localhost:2000/users/'+id)
        .then((res)=>{
            this.setState({datatransaksi:res.data.transaction})
        })
    }
    totalhargapernomer=(index)=>{
        var total=0
        this.state.datatransaksi[index].item.forEach((val)=>{
            return total+=val.totalharga
        })
        total='Rp. '+ Numeral(total).format('0,0')+',00' 
        return total
    }
    rendertransaksi=()=>{
        if(this.state.datatransaksi===0){
            return <div>Loading</div>
        }
        return this.state.datatransaksi.map((val,index)=>{
            return(
                <TableRow>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.tanggal}</TableCell>
                    <TableCell>{val.item.length}</TableCell>
                    <TableCell>{this.totalhargapernomer(index)}</TableCell>
                    <TableCell>
                        <input type='button' value='detail' className='btn btn-primary' onClick={()=>this.onDetailClick(index)}/>
                    </TableCell>
                </TableRow>
            )
        })
    }
    onDetailClick=(index)=>{
        this.setState({indexopen:index,modalopen:true})
    }
    renderModal=()=>{
        if(this.state.indexopen!==null){
            return this.state.datatransaksi[this.state.indexopen].item.map((val,index)=>{
                return(
                    <TableRow>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{val.title}</TableCell>
                        <TableCell>{val.quantity}</TableCell>
                        <TableCell>{val.totalharga}</TableCell>
                    </TableRow>
                )
            })
        }
    }
    totalharga=()=>{
        if(this.state.indexopen!==null){
            var total=0
            this.state.datatransaksi[this.state.indexopen].item.forEach((val)=>{
                return total+=val.totalharga
            })
            total='Rp. '+ Numeral(total).format('0,0')+',00' 
            return total
        }
        
    }
    render() {
        if(this.props.user.id===0){
            return (<Redirect to='/'></Redirect>)
        } 
        if(this.props.user.role!=='user'){
            return(<Pagenotfound/>)
        } 
        return ( 
        <Container className='d-flex justify-content-center'>
            <Paper className='mt-5 px-5 py-3' style={{width:'70%'}}>
                <h2>History Pembelian</h2>
                <Table>
                    <TableHead>
                        <TableCell>No.</TableCell>
                        <TableCell>Tanggal</TableCell>
                        <TableCell>QTY</TableCell>
                        <TableCell>totalharga</TableCell>
                        <TableCell>Detail</TableCell>
                    </TableHead>
                    <TableBody>
                        {this.rendertransaksi()}
                    </TableBody>
                </Table>
            </Paper>
            <Modal centered='true' isOpen={this.state.modalopen} toggle={()=>this.setState({modalopen:false})} contentClassName='bg-dark'>
                <ModalHeader>
                    Detail transaksi
                </ModalHeader>
                <ModalBody>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableCell>No.</TableCell>
                                <TableCell>Nama Film</TableCell>
                                <TableCell>QTY</TableCell>
                                <TableCell>Total Harga</TableCell>
                            </TableHead>
                            <TableBody>
                                {this.renderModal()}
                            </TableBody>
                            <TableFooter>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableFooter>
                        </Table>
                    </Paper>
                </ModalBody>
                <ModalFooter>
                    Total Pembelian {this.totalharga()} 
                </ModalFooter>
            </Modal>
    </Container> 
         );
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
} 
export default connect (mapStateToProps) (History);