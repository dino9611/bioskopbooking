import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    
    Paper,
    Container,
    TableHead,
    TableRow,
} from '@material-ui/core'
import Axios from 'axios'
import {connect} from 'react-redux'

class History extends React.Component {
    state = {
        datatransaksi:[]
      }
    componentDidMount(){
        var id=this.props.user.id
        Axios.get('http://localhost:2000/users/'+id)
        .then((res)=>{
            this.setState({datatransaksi:res.data.transaction})
        })
    }
    rendertransaksi=()=>{
        if(this.state.datatransaksi===0){
            return <div>Loading</div>
        }
        return this.state.datatransaksi.map((val,index)=>{
            return(
                <TableRow>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell>
                      {val.quantity}
                    </TableCell>
                    <TableCell>
                      {val.totalharga}
                    </TableCell>
                </TableRow>
            )
        })
    }
    render() { 
        return ( 
        <Container>
            <Paper>
                <Table>
                    <TableHead>
                        <TableCell>No.</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Jumlah kursi</TableCell>
                        <TableCell>Total Harga</TableCell>
                    </TableHead>
                    <TableBody>
                        {this.rendertransaksi()}
                    </TableBody>
                </Table>

            </Paper>
        </Container> 
         );
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
} 
export default connect (mapStateToProps) (History);