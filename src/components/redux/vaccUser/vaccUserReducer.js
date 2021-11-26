const initialStateUser = {user:null};

const vaccUserReducer = (state=initialStateUser,action)=>{
    switch(action.type){
        case 'STORE_USER':
            return {user:action.payload};
        case 'STORE_USER_INFO':
            return {...state,userInfo:action.payload}
        default:
            return state;
    }
}

export default vaccUserReducer;