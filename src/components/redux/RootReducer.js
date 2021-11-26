import vaccUserReducer from "./vaccUser/vaccUserReducer";
import {combineReducers} from 'redux'

export default combineReducers({
    vaccUser:vaccUserReducer
})