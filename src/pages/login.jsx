import React from 'react';
import {Paper} from '@material-ui/core'
import {Link} from'react-router-dom'
//ambil input value
// password dan confirm password harus sama
// klik register
// di check username udah ada atau belum di json server
// kalau udah ada munculkan mirror
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'
import {OnLoginSuccess} from './../redux/actions'
import { makeStyles } from '@material-ui/core/styles'

class Login extends React.Component {
    state = {
        error:'',
        loading:false,
      }
    changeBg = () => {
        document.body.style.background='yellow'
    }
    onBtnLoginclick=()=>{
        var username=this.refs.username.value
        var checkemail=username.split('').filter(val=>val==='@')[0]
        var password=this.refs.password.value
        if(username===''||password===''){
            this.setState({error:'there are something missing in form'})
        }else{
            if(checkemail==='@'){
                Axios.get('http://localhost:2000/users?email='+username)
                .then((res)=>{
                    if(res.data.length===0){
                        this.setState({error:'Username/Email not founded'})
                    }else{
                        if(res.data[0].password!==password&&(res.data[0].username===username||res.data[0].email===username)){
                            this.setState({error:'Your Password is wrong'})
                        }else if(res.data[0].password===password&&res.data[0].email!==username){
                            this.setState({error:'Email is wrong'})
                        }else if(res.data[0].password===password&&(res.data[0].username===username||res.data[0].email===username)){
                           this.setState({loading:true})
                           this.props.OnLoginSuccess(res.data[0])
    
                        }
                        
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            }else{
                Axios.get('http://localhost:2000/users?username='+username)
                .then((res)=>{
                    if(res.data.length===0){
                        this.setState({error:'Username/Email not founded'})
                    }else{
                        if(res.data[0].password!==password&&(res.data[0].username===username||res.data[0].email===username)){
                            this.setState({error:'Your Password is wrong'})
                        }else if(res.data[0].password===password&&res.data[0].username!==username){
                            this.setState({error:'Username is wrong'})
                        }else if(res.data[0].password===password&&(res.data[0].username===username||res.data[0].email===username)){
                           this.setState({loading:true})
                           this.props.OnLoginSuccess(res.data[0])
    
                        }
                        
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        }
    }
    render() {
        if(this.props.user.username!==''){
            return (<Redirect to='/'></Redirect>)
        }
        return (
            <div className='mt-0'>
                {/* {this.changeBg()} */}
                <div className="container">
                    <div className='row justify-content-center mt-5'>
                        <div className="col-md-6 p-5">
                            <div className='px-5 py-5 bg-login ' square={false} classes=''>
                                <h1>LOGIN</h1>
                                
                                <input type="text" ref='username' className=' mt-3 input-data pl-1' placeholder='UserName/Email ex:example@'/>
                                
                                <input type='password' ref='password' className='mt-3 input-data pl-1 mb-3' placeholder='Password'/>
                                
                                {
                                    this.state.error===''?null:
                                    <div className='alert alert-danger mt-3'>{this.state.error} <span onClick={()=>this.setState({error:''})} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>x</span></div>
                                }
                                {
                                    this.state.loading===false?<input type='button' onClick={this.onBtnLoginclick} className=' btn-seat rounded-pill' value='Login'/>:
                                    <Loader type="ThreeDots" color="whitesmoke" />
                                }
                            </div>
                                <p className='mt-3' style={{fontStyle:'italic'}}>
                                    Belum Punya Akun ?
                                    <span style={{fontStyle:'normal'}}><Link to='/register' style={{fontWeight:'bolder',cursor:'pointer',color:'#5b0008'}}>  Daftar Sekarang</Link></span>
                                </p>
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
} 
export default connect(mapStateToProps,{OnLoginSuccess}) (Login);