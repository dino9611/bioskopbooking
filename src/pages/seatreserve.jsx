import React from 'react';
import numeral from 'numeral'
import Axios from 'axios'
import { Modal,ModalHeader,ModalFooter,ModalBody } from 'reactstrap';
import{Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {onOKPilihan,onMoviePilihan,OnRegistersuccess} from './../redux/actions/auth'
import Pagenotfouund from './pagesnotfound'
import { ApiURL } from '../supports/UApiURL';

class SeatReserve extends React.Component {
    state = {
        seats:260,
        baris:13,
        booked:[],
        pilih:[],
        harga:0,
        datamovie:null,
        modalopen:false,
        openredirect:false,
    }
    // lifecycle
    componentDidMount(){
        // var id=this.props.location.search.split('=')[1]
        // Axios.get('http://localhost:2000/movies/'+id)
        // .then((res)=>{
            // }).catch((err)=>{
                //     console.log(err)
                // })
        if(this.props.location.state!==undefined){
            this.setState({
                datamovie:this.props.location.state,
                seats:this.props.location.state.seats,
                baris:this.props.location.state.seats/20})
                Axios.get(ApiURL+'/movies/'+this.props.location.state.id)
                .then((res)=>{
                    this.setState({booked:res.data.booked})
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            }
    // functions
    onBtnOrderClick=(baris,seats)=>{
        var arr=[baris,seats]
        var data=this.state.pilih
        data.push(arr)
        this.setState({pilih:data})
    }
    onCancelBtnClick=(baris,seats)=>{
        var arr=[baris,seats]
        var data=this.state.pilih
        var cancel=data.filter((val)=>{return val.join('') !==arr.join('')})
        // var cancel=data.indexOf(arr)
        this.setState({pilih:cancel})
    }
    renderPilih=()=>{
        var alphabet='abcdefghijklmnopqrstuvwxyz'.toUpperCase()
        return this.state.pilih.map((val,index)=>{
            if(index===this.state.pilih.length-1){
                return(alphabet[val[0]]+(val[1]+1))
            }
            return (
                alphabet[val[0]]+(val[1]+1)+','
            )
        })
    }
    renderSeat=()=>{
        var arr=[]
        for(let i=0;i<this.state.baris;i++){
            arr.push([])
            for(let j=0;j<this.state.seats/this.state.baris;j++){
                arr[i].push(1)
            }
        }
        for(let j=0;j<this.state.booked.length;j++){
            arr[this.state.booked[j][0]][this.state.booked[j][1]]=3
        }
        for(let a=0;a<this.state.pilih.length;a++){
            arr[this.state.pilih[a][0]][this.state.pilih[a][1]]=2
        }
        var alphabet='abcdefghijklmnopqrstuvwxyz'.toUpperCase()
        var jsx=arr.map((val,index)=>{
            return(
                <tr>
                    {
                        val.map((val1,i)=>{
                            if(val1===3){
                                return(
                                    <input type='button' disabled value={alphabet[index] +(i+1)} className='rounded btn-disble mr-2 mt-2 bg-danger text-center text-align-canter'/>
                                )
                            }else if(val1===2){
                                return(
                                    <input type='button' onClick={()=>this.onCancelBtnClick(index,i)} value={alphabet[index] +(i+1)} className='rounded  btn-order mr-2 mt-2 btn-pilih text-center text-align-canter'/>
                                )
                            }
                            return(
                                <input type='button' onClick={()=>this.onBtnOrderClick(index,i)} value={alphabet[index]+(i+1)} className='rounded btn-order mr-2 mt-2 text-center text-align-canter'/>
                            )
                        })
                    }
                </tr>
            )
        })
        return jsx
    }
    onClickReset=()=>{
        this.setState({pilih:[]})
    }
    renderharga=()=>{
        var jumlahseat=this.state.pilih.length
        var totalharga=numeral(jumlahseat*35000).format(0,0) 
        
        if(jumlahseat===0){
            return(null)
        }
        return(
            jumlahseat+' Persons = Rp.35000,00 X '+jumlahseat+' = Rp.'+totalharga+ ',00'
        )
    }
    OnBtnOkClick=()=>{
        if(this.state.pilih.length===0){
            alert('harus pesan ')
            this.setState({modalopen:false})
        }else{
            var quantity=this.state.pilih.length
            var seats=this.state.pilih
            var totalharga=quantity*35000
            var movie=this.props.location.state.title
            var usercart=this.props.user.cart
            var arr=[...usercart,{title:movie,quantity,totalharga,seats}]
            for(var i=0;i<usercart.length;i++){
                if(movie===usercart[i].title){
                    usercart[i].quantity+=quantity
                    usercart[i].totalharga+=totalharga
                    usercart[i].seats.push(...seats)
                    arr=usercart
                }
            }
            Axios.patch(ApiURL+'/users/'+this.props.id,{
                cart:arr
            })
            .then((res)=>{
                this.props.OnRegistersuccess(res.data)
                var booked =this.props.location.state.booked
                var arr=[...booked,...this.state.pilih]
                Axios.patch(ApiURL+'/movies/'+this.props.location.state.id,{
                    booked:arr
                })
                .then((res)=>{
                    console.log(res.data)
                    this.setState({booked:res.data.booked,pilih:[], openredirect:true})
                })
                .catch((err)=>{
                    console.log(err)
                })
            })
            .catch((err)=>{
                console.log(err)
            })
            // this.setState({openredirect:true})
        }
    }
    onBuyClick=()=>{
        if(this.state.pilih!==0){
            var booked =this.props.location.state.booked
            var arr=[...booked,...this.state.pilih]
            Axios.patch(ApiURL+'/movies/'+this.props.location.state.id,{
                booked:arr
            })
            .then((res)=>{
                console.log(res.data)
                this.setState({booked:res.data.booked,pilih:[]})
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    }
    render() { 
        if(this.props.location.state===undefined||this.props.user.role==='admin'){
            return(<Pagenotfouund/>)
        }
        if(this.state.openredirect===true){
            return(<Redirect to='/cart'></Redirect>)
        }
        if(this.props.user.id===0){
            return (<Redirect to='/'></Redirect>)
        }
        if(this.state.datamovie===null){
            return(<h1>Loading....</h1>)
        }
        return ( 
        <div className='container mt-5 mb-5  text-center'>
            <h1>{this.props.location.state.title}</h1>
            <h1>Order Seat Here</h1>
            <input type='button' value='Reset' onClick={this.onClickReset} className='float-right btn-seat rounded-pill reset'/>
            <input type='button' value='Cart' onClick={()=>this.setState({modalopen:true})} className='float-right btn-seat rounded-pill reset'/>
            <br/>
            <div className='row justify-content-center mt-3'>
                <table className=''>
                    {this.renderSeat()}
                </table>
            <div className="mt-4 rounded" style={{backgroundColor:'whitesmoke',width:'100%',height:'30px',border:'0.5px solid #5b0008',textAlign:'center',fontWeight:'bolder',color:' #5b0008'}}>
                Layar
            </div>
            </div>
            <h5 className='mt-3'>
                Pilih: {this.renderPilih()}    
            </h5>
            <h5>
                {this.renderharga()}
            </h5>
    
            <Modal isOpen={this.state.modalopen} toggle={()=>this.setState({modalopen:false})} className='text-white' modalClassName='' contentClassName='bg-login-seat' centered='true'>
                <ModalHeader className='pt-4'>
                    <div className='tbl-modal rounded-circle text-center' onClick={()=>this.setState({modalopen:false})}>X</div>
                </ModalHeader>
                <ModalBody>
                    Apakah kamu Yakin?
                </ModalBody>
                <ModalFooter>
                    <input type='button' value='OK'className='btn-seat rounded-pill' onClick={this.OnBtnOkClick}/>
                    <input type='button' value='Cancel'className='btn-seat rounded-pill' onClick={()=>this.setState({modalopen:false})}/>
                </ModalFooter>
            </Modal>
        </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.user,
        id:state.user.id,
        transaction:state.user.transaction
    }
}
export default connect(mapStateToProps,{onOKPilihan,onMoviePilihan,OnRegistersuccess}) (SeatReserve);