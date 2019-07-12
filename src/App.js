import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import{Route,Switch,Redirect} from 'react-router-dom'
import Movielist from './pages/movielist'
import manageMovie from './pages/admin/manageMovie'
import MovieDetail from './pages/moviedetail'
import Register from './pages/register'
import Login from './pages/login'
import SeatReserve from './pages/seatreserve'
import {ApiURL} from './supports/UApiURL'
import Axios from 'axios';
import {OnRegistersuccess,onLoginAdmin} from './redux/actions'
import {connect} from 'react-redux'
import Cart from './pages/cart'
import Pagenotfound from './pages/pagesnotfound'
import History from './pages/history'
import Gantipass from './pages/gantipass'
class App extends React.Component {
  state = {  }
  componentDidMount(){
    var username=localStorage.getItem('terserah')
    if(username!==null){
        Axios.get(ApiURL+'/users?username='+username)
        .then((res)=>{
          console.log(res.data)
          if(res.data.length===0){
            Axios.get(ApiURL+'/admin?username='+username)
            .then((res)=>{
              console.log(res.data)
              this.props.OnRegistersuccess(res.data[0])
              
              console.log(this.props.user)
            })
            .catch((err)=>{
              console.log(err)
            })
          }else{
            this.props.OnRegistersuccess(res.data[0])
          }
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }
  render() {
    if(this.props.user===''&&localStorage.getItem('terserah')!==null){
      return (<p>Loading....</p>)
    }
    // if(this.props.user===''){
    //   return(<Redirect to={{pathname:'/'}}></Redirect>)
    // } 
    return (    
    <div>
      <Header/>
      <Switch>
        <Route path='/' component={Movielist} exact />
        <Route path='/manage' component={manageMovie} />
        <Route path='/movie-detail' component={MovieDetail}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/seatreserve' component={SeatReserve}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/history' component={History}/>
        <Route path='/gantipass' component={Gantipass}/>
        <Route path='/*' component={Pagenotfound}/>
      </Switch>
    </div>  );
  }
}
const mapStateToProps=(state)=>{
  return{
    user:state.user.username
  }
}
export default connect(mapStateToProps,{OnRegistersuccess,onLoginAdmin}) (App);

