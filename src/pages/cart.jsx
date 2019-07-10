import React from 'react';
import {connect} from 'react-redux'
import {onGabungan} from './../redux/actions'
import Axios from 'axios'

class Cart extends React.Component {
    state = {
        filmpilihan:this.props.user.cart,

      }
    componentDidMount(){
        if(this.props.pilih.length!==0){
            var datafilm=this.state.filmpilihan
            datafilm.push({movie:this.props.movie.title,booked:this.props.pilih})
            this.props.onGabungan(datafilm)
            this.setState({filmpilihan:datafilm})
            if(this.state.filmpilihan.length!==0){
                var id=this.props.user.id
                Axios.patch('http://localhost:2000/users/'+id,{cart:this.state.filmpilihan})
                .then((res)=>{
                    console.log(res.data)
                    this.setState({filmpilihan:res.data.cart})
                })
                .catch((err)=>{
                    console.log(err)
                })
             

            }
        }
      
        
        // var pilihan=this.state.orderseat
        // pilihan.push(this.props.pilih)
        // this.setState({orderseat:pilihan})
        // console.log(this.state.orderseat);
        
        
    }
    rendercart=()=>{
        var alphabet='abcdefghijklmnopqrstuvwxyz'.toUpperCase()
        return this.state.filmpilihan.map((val,index)=>{
                return(
                    <tr>
                        <td>{index+1}</td>
                        <td>{val.movie}</td>
                        <td>
                          {val.booked.map((val1)=>
                          {return alphabet[val1[0]]+[val1[1]]
                          })}
                        </td>
                        <td>
                            <input value='delete' type='button'/>
                        </td>
                    </tr>
                )
            })
        
    }
    render() { 
        return (
        <div className='container row justify-content-center'>
            <table className='mt-5 bg-dark'>
                {this.state.filmpilihan===null?<h1>loading...</h1>: this.rendercart()}
            </table>
        </div> );
    }
}
const mapStateToProps=(state)=>{
    return{
        pilih:state.bebas.chosen,
        movie:state.movie,
        seat:state.seat.seat,
        user:state.user
    }
} 
export default connect(mapStateToProps,{onGabungan})(Cart);