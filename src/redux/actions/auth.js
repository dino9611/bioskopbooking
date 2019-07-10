export const OnRegistersuccess=(data)=>{
    return{
        type:'REGISTER_SUCCESS',
        payload: data,
    }
}
export const OnLoginSuccess=(data)=>{
    return{
        type:'LOGIN_SUCCESS',
        payload:data
    }
}
export const onLogout=()=>{
    return{
        type:'LOG_OUT'
    }
}
export const onOKPilihan=(data)=>{
    return{
        type:'PILIHAN',
        payload:data
    }
}
export const onMoviePilihan=(data)=>{
    return{
        type:'MOVIE',
        payload:data
    }
}
export const onGabungan=(data)=>{
    return{
        type:'GABUNGAN',
        payload:data
    }
}