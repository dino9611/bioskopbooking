import React from 'react';
import Axios from 'axios'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import Icon from '@material-ui/core/Icon'
// import clsx from 'clsx'
// import {DetailsRounded} from '@material-ui/icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCouch} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

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
    // dari movie list kirim id ke movie detail
    // di movie detail kita get movie berdasarkan ID
    // dapat data, kemudian taruh di state
    // lalu state di render
    renderMovies=()=>{
        return this.state.data.map((val)=>{
            return(
                    <div className=' p-2'>
                        <div className="hitam text-center" >
                            {/* <div className='text-center  '>
                            </div> */}
                            {/* <div to={'/Movie-Detail?id='+val.id} className='tampak text-center'>
                            </div> */}
                            <Link to={'/Movie-Detail?id='+val.id} className='tampak text-center ' style={{textDecoration:'none'}} >
                                <FontAwesomeIcon  icon={faCouch}/>  
                                <div className='movie-detail rounded'>Buy Ticket</div>
                            </Link>
                        </div>
                        <div className="position-relative lama px-auto text-center py-1 mt-2 mr-4">{val.duration}<br/>min</div>
                        <div className='mycard card'>
                            <img src={val.image} alt={'poster'+val.id} width='100%' />
                            <div className="px-2 py-4 ">
                                <div className='font-weight-bolder' style={{height:'50px'}}>{val.title}<br/></div>
                                <span className='sutradara font-weight-bolder'>{val.sutradara}<br/></span>
                                <div className='bg-dark rounded-pill text-center genre mt-3'><span>{val.genre}</span></div>
                            </div>
                        </div>
                    </div>
            )
        })
    }
    render() { 
        var settings = 
            {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 1,
                
              };
          var settings2 = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            
          };
        return (
            <div className='container mt-3 px-2 pb-4'>
                <div className=' justify-content-center'>
                    {
                        window.innerWidth>200? 
                        <Slider {...settings}>{this.renderMovies()}</Slider>:
                        <Slider {...settings2}>{this.renderMovies()}</Slider>
                    }
                    {/* <Slider {...settings}>
                        {this.renderMovies()}
                    </Slider> */}

                </div>
            </div>
          );
    }
}
 
export default Movielist;