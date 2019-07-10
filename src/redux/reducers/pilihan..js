const INITIAL_STATE={chosen:[]}

export default(state=INITIAL_STATE,action)=>{
    if(action.type==='PILIHAN'){
        return {...INITIAL_STATE , chosen : action.payload}
    }else{
        return state
    }
}