export const storeUser = (user)=>{
return {
    type:'STORE_USER',
    payload:user
}
}

export const storeUserInfo = (user)=>{
    return {
        type:"STORE_USER_INFO",
        payload:user
    }
}