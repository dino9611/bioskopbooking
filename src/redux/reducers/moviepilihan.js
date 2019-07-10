const INITIAL_STATE={movie:''}

export default(state=INITIAL_STATE,action)=>{
    if(action.type==='MOVIE'){
        return action.payload
    }else if(action.type==='GABUNGAN'){
        return action.payload
    }else{
        return state
    }
}