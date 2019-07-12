import React from 'react';
import {Modal, ModalBody, ModalHeader,ModalFooter,FormGroup,Label,Input} from 'reactstrap'
import Axios from 'axios'

export class ModalEdit extends React.Component{
    state={
        data:this.props.data,
    }
    //function modal
    dataref=(index,i)=>{
        var a=this.refs
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
                    seats:a.editseats.value,
                    booked:this.state.data[this.props.index].booked
                }).then((res)=>{
                    // bisa dengan cara
                        var data = this.state.data
                        data[i]=res.data
                        this.setState({data:data})
                        this.props.save(this.state.data)
                        alert('ADD Data Success')
                }).catch((err)=>{
                    console.log(err)
                })
            }else{
                alert('tidak boleh kosong')
            }
    }
    render(){
        return(
        <Modal className='text-dark' isOpen={this.props.modalopen} toggle={this.props.closemodal}>
            <ModalHeader>
                Edit Movie {'"'+this.state.data[this.props.index].title+'"'}
            </ModalHeader>
            <ModalBody>
                <input ref='edittittle' type='text' className='form-control mt-2' placeholder='Title' defaultValue={this.state.data[this.props.index].title} />
                <input ref='editsutradara' type='text' className='form-control mt-2' placeholder='Sutradara' defaultValue={this.state.data[this.props.index].sutradara}/>
                <input ref='editgenre' type='text' className='form-control mt-2' placeholder='Genre' defaultValue={this.state.data[this.props.index].genre}/>
                <input ref='editimage' type='text' className='form-control mt-2' placeholder='Image' defaultValue={this.state.data[this.props.index].image} />
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
                <input ref='edittrailer' type='text' className='form-control mt-2' placeholder='Trailer' defaultValue={this.state.data[this.props.index].trailer} />
                <textarea ref='editsinopsis'type='text' className='form-control mt-2' placeholder='sinopsis' defaultValue={this.state.data[this.props.index].sinopsis} />
                <input ref='editduration' type='number' className='form-control mt-2' placeholder='Duration' defaultValue={this.state.data[this.props.index].duration}/>
                <input ref='editseats' type='number' className='form-control mt-2' placeholder='Seats' defaultValue={this.state.data[this.props.index].seats}/>
            </ModalBody>
            <ModalFooter>
                <input type='button' value='Cancel' className='btn btn-danger' onClick={this.props.closemodal} />
                <input type='button' value='Save' className='btn btn-success' onClick={()=>this.dataref(this.state.data[this.props.index].id,this.props.index,this.dataref)} />
            </ModalFooter>    
        </Modal>
        )
    }
}