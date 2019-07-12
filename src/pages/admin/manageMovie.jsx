import React from 'react';
//Material Ui
import {
    Table,
    TableBody,
    TableCell, 
    Paper,
    Container,
    TableHead,
    TableRow,
} from '@material-ui/core'
// import {red} from '@material-ui/core/colors'
import {DeleteForeverRounded,EditAttributesSharp} from '@material-ui/icons'
import Axios from 'axios'
import {Modal, ModalBody, ModalHeader,ModalFooter,FormGroup,Label,Input} from 'reactstrap'
import {ModalEdit} from './../../components/modal'
import Pagenotfound from './../pagesnotfound'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
class Managemovie extends React.Component {
    //state
    state = { 
        data:[],
        modalOpen:false, 
        deleted : false,
        editselected:-1,
        editmodal:false,
        readmore:-1,
        modaldelete:false,
        deletetittle:null,
        deleteid:null,
        deleteindex:null,
    }
    //lifecycle
    componentDidMount(){
        Axios.get('http://localhost:2000/movies')
        .then((res)=>{
            this.setState({data:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    //functions
    rendersinopsis=(text)=>{
        var a= text.split(' ')
        var arr=[]
        for(let i=0;i<5;i++){
            arr.push(a[i])
        }
        return arr.join(' ')+' ......'
    }
    onBtnEditClick=(index)=>{
        this.setState({editselected:index})
        this.setState({editmodal:true})
    }
    onBtnCancelEdit=()=>{
        this.setState({editselected:-1})
    }
    //onSaveEdituntukbukanmodal function
    onSaveEdit=(index,i,)=>{
        var a=this.refs
        // var playingAt=[]
        // if(this.refs.radio1.refs.radio1inner.checked===true){
        //     playingAt.push(9)
        // }
        // if(this.refs.radio2.refs.radio2inner.checked===true){
        //     playingAt.push(14)
        // }
        // if(this.refs.radio3.refs.radio3inner.checked===true){
        //     playingAt.push(16)
        // }
        // if(this.refs.radio4.refs.radio4inner.checked===true){
        //     playingAt.push(20)
        // }
        // if(this.refs.radio5.refs.radio5inner.checked===true){
        //     playingAt.push(22)
        // }
        var playingAt=[]
        var jam=[9,14,16,20,22]
        for(var j=1;j<6;j++){
            if(this.refs['radio'+j].refs['radio'+j+'inner'].checked===true){
                playingAt.push(jam[j-1])
            }
        }
        if(
            a.edittittle.value!=='' &&
            a.editgenre.value!=='' && 
            a.editsinopsis.value!=='' &&
            playingAt.length>0 &&
            a.editduration.value!=='' &&
            a.editsutradara.value!=='' &&
            a.editimage.value!==''&&
            a.edittrailer.value!==''){
                Axios.put('http://localhost:2000/movies/'+index+'/',{
                    title: a.edittittle.value,
                    genre: a.editgenre.value,
                    sinopsis: a.editsinopsis.value,
                    playingAt: playingAt,
                    trailer:a.edittrailer.value,
                    duration: a.editduration.value ,
                    sutradara: a.editsutradara.value,
                    image:a.editimage.value,
                }).then((res)=>{
                    // bisa dengan cara
                        var data = this.state.data
                        data[i]=res.data
                        this.setState({data:data})
                        alert('ADD Data Success')
        
                }).catch((err)=>{
                    console.log(err)
                })
                this.setState({editselected:-1})
            }else{
                alert('tidak boleh kosong')
            }
    }
    closemodal=()=>{
        this.setState({editmodal:false})
    }
    onSaveModal=(datamodal)=>{
        var data = this.state.data
        data=datamodal
        this.setState({data:data})
        this.setState({editmodal:false})
    }
    rendermodal=()=>{
        if(this.state.editselected!==-1){
            return(
                <div>
                <ModalEdit index={this.state.editselected} modalopen={this.state.editmodal} data={this.state.data} 
                    closemodal={this.closemodal} save={this.onSaveModal}
                />
                </div>
            )
        }
    }    
    renderDataMovies=()=>{
        return this.state.data.map((val,index)=>{
            if(this.state.readmore===index){
                return(
                    <TableRow>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{val.title}</TableCell>
                        <TableCell>{val.sutradara}</TableCell>
                        <TableCell><img src={val.image} alt={'poster'+index+1} height='50px'></img></TableCell>
                        <TableCell>{val.genre}</TableCell>
                        <TableCell>{val.playingAt.join(',')}</TableCell>
                        {/* <TableCell>{val.trailer}</TableCell> */}
                        <TableCell>{val.duration}</TableCell>
                        <TableCell>{val.sinopsis}<span style={{fontSize:'12px'}} onClick={()=>this.setState({readmore:-1})} className='merah'> Tutup</span></TableCell>
                        <TableCell><EditAttributesSharp className='petunjuk ' color='primary' onClick={()=>this.onBtnEditClick(index)}/></TableCell>
                        <TableCell><DeleteForeverRounded className='petunjuk' color='error' onClick={()=>this.btnDeleteonClick(val.id , index)} /></TableCell>
                    </TableRow> 
                )
            }
            return(
                <TableRow>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell>{val.sutradara}</TableCell>
                    <TableCell><img src={val.image} alt={'poster'+index+1} height='50px'></img></TableCell>
                    <TableCell>{val.genre}</TableCell>
                    <TableCell>{val.playingAt.join(',')}</TableCell>
                    {/* <TableCell>{val.trailer}</TableCell> */}
                    <TableCell>{val.duration}</TableCell>
                    <TableCell>{this.rendersinopsis(val.sinopsis)}<span style={{fontSize:'12px'}} onClick={()=>this.setState({readmore:index})} className='merah'> Readmore</span></TableCell>
                    <TableCell><EditAttributesSharp className='petunjuk ' color='primary' onClick={()=>this.onBtnEditClick(index)}/></TableCell>
                    <TableCell><DeleteForeverRounded className='petunjuk' color='error' onClick={()=>this.btnDeleteonClick(val.id , index,val.title)} /></TableCell>
                </TableRow> 
            )
            //=====edit didalam table code dibawah===
            // if(this.state.editselected!==-1){
            //     return(
            //             <TableRow>
            //             <TableCell>{index+1}</TableCell>
            //             <TableCell><input type="text" ref='edittittle' className='form-control' defaultValue={val.title}/></TableCell>
            //             <TableCell><input type="text" ref='editsutradara' className='form-control' defaultValue={val.sutradara}/></TableCell>
            //             <TableCell><input type="text" ref='editimage' className='form-control' defaultValue={val.image}/></TableCell>
            //             <TableCell><input type="text" ref='editgenre' className='form-control' defaultValue={val.genre}/></TableCell>
            //             <div className='mt-3'>
            //                 <FormGroup inline>
            //                     <Label>
            //                         Playing At:
            //                     </Label>
            //                 </FormGroup>
            //                 <FormGroup check inline>
            //                     <Label check>
            //                         <Input ref='radio1' innerRef='radio1inner' type='checkbox'/>09.00
            //                     </Label>
            //                 </FormGroup>
            //                 <FormGroup check inline>
            //                     <Label check>
            //                         <Input ref='radio2' innerRef='radio2inner' type='checkbox'/>14.00
            //                     </Label>
            //                 </FormGroup>
            //                 <FormGroup check inline>
            //                     <Label check>
            //                         <Input ref='radio3' innerRef='radio3inner' type='checkbox'/>16.00
            //                     </Label>
            //                 </FormGroup>
            //                 <FormGroup check inline>
            //                     <Label check>
            //                         <Input ref='radio4' innerRef='radio4inner' type='checkbox'/>20.00
            //                     </Label>
            //                 </FormGroup>
            //                 <FormGroup check inline>
            //                     <Label check>
            //                         <Input ref='radio5' innerRef='radio5inner' type='checkbox'/>22.00
            //                     </Label>
            //                 </FormGroup>
            //             </div>
            //             <TableCell><input type="text" ref='editTrailer' className='form-control' defaultValue={val.trailer}/></TableCell>
            //             <TableCell><input type="number" ref='editduration' className='form-control' defaultValue={val.duration}/></TableCell>
            //             <TableCell><textarea ref='editsinopsis' className='form-control' defaultValue={val.sinopsis}/></TableCell>
            //             <TableCell><SaveRounded className='petunjuk' onClick={()=>this.onSaveEdit(val.id,index)}/></TableCell>
            //             <TableCell><CancelRounded className='petunjuk' onClick={this.onBtnCancelEdit}/></TableCell>
            //         </TableRow> 
            //     )
            // }

        })
    }
    btnDeleteonClick=(index , i,title)=>{
        this.setState({deletetittle:title,deleteid:index,deleteindex:i,modaldelete:true})

    }
    onYesClick=()=>{
        var id=this.state.deleteid
        var index=this.state.deleteindex
        Axios.delete('http://localhost:2000/movies/'+ id+'/')
        .then((res)=>{
            // console.log(res.data)
            if(res.status === 200){
                var data = this.state.data
                data.splice(index , 1)
                this.setState({data,modaldelete:false})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    btnSaveonClick=()=>{
        var a=this.refs
        // bisa dengan cara ini
        // var playingAt=[]
        // if(this.refs.radio1.refs.radio1inner.checked===true){
        //     playingAt.push(9)
        // }
        // if(this.refs.radio2.refs.radio2inner.checked===true){
        //     playingAt.push(14)
        // }
        // if(this.refs.radio3.refs.radio3inner.checked===true){
        //     playingAt.push(16)
        // }
        // if(this.refs.radio4.refs.radio4inner.checked===true){
        //     playingAt.push(20)
        // }
        // if(this.refs.radio5.refs.radio5inner.checked===true){
        //     playingAt.push(22)
        // }
        // bisa juga dengan cara ini
        var playingAt=[]
        var jam=[9,14,16,20,22]
        for(var i=1;i<6;i++){
            if(this.refs['radio'+i].refs['radio'+i+'inner'].checked===true){
                playingAt.push(jam[i-1])
            }
        }
        if(
            a.title.value!=='' &&
            a.genre.value!=='' && 
            a.sinopsis.value!=='' &&
            playingAt.length>0 &&
            a.duration.value!=='' &&
            a.sutradara.value!=='' &&
            a.image.value!==''&&
            a.trailer.value!==''){
            Axios.post('http://localhost:2000/movies',{
                title: a.title.value,
                genre: a.genre.value,
                sinopsis: a.sinopsis.value,
                playingAt: playingAt,
                duration: a.duration.value ,
                trailer:a.trailer.value,
                sutradara: a.sutradara.value,
                image:a.image.value,
                seats:a.seats.value,
                booked:[]
            }).then((res)=>{
                // bisa dengan cara
                // this.setState({data : [...this.state.data , res.data]})
                // bisa juga dengan ini
                var arr=this.state.data
                arr.push(res.data)
                this.setState({data:arr,modalOpen:false})
                alert('ADD Data Success')
                // Axios.get('http://localhost:2000/movies')
                // .then((res)=>{
                //     this.setState({data:res.data})
                // })
                // .catch((err)=>{
                //     console.log(err)
                // })
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            alert('gagal')
        }
    }
    // close modal

    render() {
        if(this.props.user.id===0){
            return (<Redirect to='/'></Redirect>)
        }
        if(this.props.user.role!=='admin'){
            return (<Pagenotfound/>)
        }
        return ( 
            <Container fixed>
                <h1>Manage movie Page</h1>
                <input type='button' className='btn btn-manage  mb-3' value='Add Data' onClick={()=>this.setState({modalOpen:true})} />
                {/* modalll start */}
                    <Modal className='text-dark' isOpen={this.state.modalOpen} toggle={() => this.setState({modalOpen : false})}>
                        <ModalHeader>
                            Add Movie
                        </ModalHeader>
                        <ModalBody>
                            <input ref='title' type='text' className='form-control mt-2' placeholder='Title' />
                            <input ref='sutradara' type='text' className='form-control mt-2' placeholder='Sutradara' />
                            <input ref='genre' type='text' className='form-control mt-2' placeholder='Genre' />
                            <input ref='image' type='text' className='form-control mt-2' placeholder='Image' />
                            <div className='mt-3 '>
                                <FormGroup check inline>
                                    <Label>
                                        Playing At:
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input ref='radio1' innerRef='radio1inner' type='checkbox'/>09.00
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input ref='radio2' innerRef='radio2inner' type='checkbox'/>14.00
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input ref='radio3' innerRef='radio3inner' type='checkbox'/>16.00
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input ref='radio4' innerRef='radio4inner' type='checkbox'/>20.00
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input ref='radio5' innerRef='radio5inner' type='checkbox'/>22.00
                                    </Label>
                                </FormGroup>
                            </div>
                            <input ref='trailer' type='text' className='form-control mt-2' placeholder='Trailer' />
                            <textarea ref='sinopsis'type='text' className='form-control mt-2' placeholder='sinopsis' />
                            <input ref='duration' type='number' className='form-control mt-2' placeholder='Duration' />
                            <input ref='seats' type='number' className='form-control mt-2' placeholder='Seats' />
                        </ModalBody>
                        <ModalFooter>
                            <input type='button' value='Cancel' className='btn btn-danger' onClick={()=>this.setState({modalOpen:false})} />
                            <input type='button' value='Save' className='btn btn-success' onClick={this.btnSaveonClick} />
                        </ModalFooter>    
                    </Modal>
                    {this.rendermodal()}
                    <Modal isOpen={this.state.modaldelete} centered='true' className='' contentClassName='bg-login text-white' toggle={()=>this.setState({modaldelete:false})} className='text-dark'>
                        <ModalBody>
                            Apakah anda yakin untuk menghapus film <span className='text-weiht-bolder'>{'"'+this.state.deletetittle+'"'}</span>?
                        </ModalBody>
                        <ModalFooter>
                            <input type='button' className='btn-manage rounded lbr-btn' value='Yes'onClick={this.onYesClick}/>
                            <input type='button' value='Cancel' className='btn-manage rounded lbr-btn' onClick={()=>this.setState({modaldelete:false})}/>
                        </ModalFooter>
                    </Modal>
                {/* modal end */}
                <Paper>
                    <Table>
                        <TableHead>
                            <TableCell>No.</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Sutradara</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Playing At</TableCell>
                            {/* <TableCell>Trailer</TableCell> */}
                            <TableCell>Duration</TableCell>
                            <TableCell>Sinopsis</TableCell>
                            <TableCell>{this.state.editselected===-1?'Edit':'Save'}</TableCell>
                            <TableCell>{this.state.editselected===-1?'Delete':'Cancel'}</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.renderDataMovies()}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        );
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
export default connect(mapStateToProps) (Managemovie);