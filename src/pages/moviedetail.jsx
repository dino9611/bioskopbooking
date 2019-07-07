import React from 'react';
import Axios from 'axios';
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'
import {Modal, ModalBody, ModalHeader,ModalFooter} from 'reactstrap'


class MovieDetail extends React.Component {
    state = {
        data:null,
        login:null,
        isOpen:false,
        loginfo:false,
      }
    //lifecycle
    componentDidMount(){
        var id=this.props.location.search.split('=')[1]
        Axios.get('http://localhost:2000/movies/'+id)
        .then((res)=>{
            console.log(res.data)
            this.setState({data:res.data})
            this.setState({login:null})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBuyTicketClick=()=>{
        if(this.props.user.id===0){
            this.setState({loginfo:true})
        }else{
            this.setState({login:true})
        }
    }
    onOKClick=()=>{ //okclick hanya ada dimodal
        this.setState({login:false})
    }
    renderMoviesdetail =()=>{
        if(this.state.login===false){
            return (<Redirect to='/login'></Redirect>)
        }else if(this.state.login===true){
            return(<Redirect to='/seatreserve'></Redirect>)
        }
        return(
            <div className="row">
                <div className="col-md-4">
                    <img height='430px' src={this.state.data.image} alt="sdada"/>
                </div>
                <div className="col-md-8">
                    {this.props.user.username}
                    <h1>{this.state.data.title}</h1>
                    <p>{this.state.data.genre}</p>
                    <h5>{this.state.data.sutradara}</h5>
                    <p>{this.state.data.duration} minutes</p>
                    <p>Playing at: {[this.state.data.playingAt].join('')}</p>
                    <p style={{fontStyle:'italic'}}> {this.state.data.sinopsis} </p>
                    <input onClick={this.onBuyTicketClick} type='button' className='btn-trailer-buy rounded mr-3' value='Buy tiket'/>
                    <input type='button' className='btn-trailer-buy rounded' value='Trailer' onClick={()=>this.setState({isOpen:true})}/> 
                </div>
                <div className="col-md-8 mt-5  ">
                    <Modal isOpen={this.state.isOpen} toggle={()=>this.setState({isOpen:false})} size='lg' className='' modalClassName='' centered='true'>
                        <div className='tbl-modal rounded-circle text-center' onClick={()=>this.setState({isOpen:false})}>X</div>
                        <iframe width="100%" height="500" className='mb-0' src={this.state.data.trailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title={this.state.data.id}></iframe>
                        {/* <ModalHeader>
                            Trailer {this.state.data.title}
                        </ModalHeader> */}
                        {/* <ModalBody className='p-0' >
                            
                        </ModalBody> */}
                        {/* <ModalFooter>
                            <input type='button' className='btn btn-danger' value='Close' onClick={()=>this.setState({isOpen:false})} />
                        </ModalFooter> */}
                    </Modal>
                    <Modal isOpen={this.state.loginfo} toggle={()=>this.setState({loginfo:false})} className='text-white' modalClassName='' contentClassName='bg-login' centered='true'>
                        <ModalHeader className='pt-4'>
                            <div className='tbl-modal rounded-circle text-center' onClick={()=>this.setState({loginfo:false})}>X</div>
                        </ModalHeader>
                        <ModalBody>
                            For buying this ticket you need to login first
                        </ModalBody>
                        <ModalFooter>
                            <input type='button' value='OK'className='btn-seat rounded-pill' onClick={this.onOKClick}/>
                        </ModalFooter>
                    </Modal>
                    
                </div>
            </div>
        )
    }
    render() { 
        if(this.state.data===null){
            return(<p>loading......</p>)
        }
        return (
            <div className='container mt-5 mb-5'>
                {this.renderMoviesdetail()}
            </div>
            
          );
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(MovieDetail);