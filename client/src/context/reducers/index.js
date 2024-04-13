import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer"
import alertReducer from "./alertReducer";
import allUserReducer from "./allUserReducer";
import cartReducer from "./cartReducer";
import displayCartReducer from "./displayCartReducer";
const myReducers=combineReducers({

    user:userReducer,
    alert:alertReducer,
    products:productReducer,
    cart:cartReducer,
    allUsers:allUserReducer,
    isCart:displayCartReducer,

});

export default myReducers;