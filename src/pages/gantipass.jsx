import React from 'react';
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
import {connect} from 'react-redux'
import Axios from 'axios';
import { ApiURL } from '../supports/UApiURL';
import {Redirect} from 'react-router-dom'
class Password extends React.Component {
    state = {
        datauser:null,
        error:'',
      }
    componentDidMount(){
        this.setState({datauser: this.props.user})
    }
    onbtnSelesai=()=>{
        var pass=this.refs.pass.value
        var confirm=this.refs.confirm.value
        if(pass===''||confirm===''){
            this.setState({error:'ada yang kosong'})
        }else{
            if(pass!==confirm){
                this.setState({error:'Pass dan Confirm tidak sama'})
            }else{
                Axios.patch(ApiURL+'/users/'+this.state.datauser.id,{password:pass})
                alert('password telah diganti')
            }

        }
    }
    render() {
        if(this.state.datauser===null){
            return (<div>Loading...</div>)
        }
        if(this.props.user.id===0){
            return (<Redirect to='/'></Redirect>)
        } 
        return (
        <Container className=''>
            <Paper className='mt-5' style={{width:'50%'}}>
                <h1>Settings</h1>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>{this.state.datauser.username}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Password baru</TableCell>
                            <TableCell><input type='password' ref='pass' placeholder='password' defaultValue={this.state.datauser.password}/></TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Confirm new Password</TableCell>
                            <TableCell><input type='password' ref='confirm' placeholder='confirm' /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
            {this.state.error===''?null: <div className='alert alert-danger mt-3' style={{width:'40%'}}>{this.state.error}<span onClick={()=>this.setState({error:''})} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>x</span></div>}
            <input type="button" className='btn btn-primary mt-2' value='selesai' onClick={this.onbtnSelesai}/>
        </Container>  
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
} 
export default connect(mapStateToProps) (Password);