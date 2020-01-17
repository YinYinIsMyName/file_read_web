import {Submit} from '../actionType'
const initialState = {
    text:" ",
}

const indexReducer=(state=initialState,action)=>{
    switch(action.type){
        case Submit:{
            return {...state,text:action.payload}
        }
        default:return state
    }
    
}
export default indexReducer