import React from 'react';
import Axios from 'axios'
class Movielist extends React.Component {
    state = { 
        data:[],
    
    }
    componentDidMount(){
        this.getDataMovies()
    }
    getDataMovies=()=>{
        Axios.get('http://localhost:2000/movies')
        .then((res)=>{
            this.setState({data:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    renderMovies=()=>{
        return this.state.data.map((val)=>{
            return(
                <div className='col-md-3 mycard '>
                    <div className="position-absolute lama mx-auto text-center py-auto justify-cent mt-2 mr-2">{val.duration}<br/>min</div>
                    <img src={val.image} alt={'poster'+val.id} width='100%' />
                    <div className=" p-2">
                        <p>{val.title}</p>
                        <div className='bg-light rounded-pill text-center genre'><span>{val.genre}</span></div>
                    </div>
                </div>
            )
        })
    }
    render() { 
        return (
            <div className='container mt-5'>
                <div className='row'>
                {this.renderMovies()}
                </div>
            </div>
          );
    }
}
 
export default Movielist;