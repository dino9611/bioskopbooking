import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import{Route} from 'react-router-dom'
import Movielist from './pages/movielist'
import manageMovie from './pages/admin/manageMovie'
import MovieDetail from './pages/moviedetail'
import Register from './pages/register'
import Login from './pages/login'
import SeatReserve from './pages/seatreserve'

function App() {
  return (
    <div>
      <Header/>
      <Route path='/' component={Movielist} exact />
      <Route path='/manage' component={manageMovie} />
      <Route path='/movie-detail' component={MovieDetail}/>
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
      <Route path='/seatreserve' component={SeatReserve}/>
    </div>
  );
}

export default App;
