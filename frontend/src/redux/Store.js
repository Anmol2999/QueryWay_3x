import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice"
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from 'redux-persist'


const persistConfiq = {
    key:"root",
    storage
}
const persistedReducer = persistReducer(persistConfiq,authReducer)

 export const store=configureStore({
    reducer:{
        auth:persistedReducer
    }
 })

export const persistor = persistStore(store)
