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