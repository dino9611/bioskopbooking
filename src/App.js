import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/header'
// import{Router} from 'react-router-dom'
import Movielist from './pages/movielist'

function App() {
  return (
    <div>
      <Header/>
      <Movielist/>
    </div>
  );
}

export default App;
