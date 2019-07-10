const INITIAL_STATE={seat:[]}

export default(state=INITIAL_STATE,action)=>{
    if(action.type==='GABUNGAN'){
        return {...INITIAL_STATE,seat:action.payload}
    }else{
        return state
    }
}