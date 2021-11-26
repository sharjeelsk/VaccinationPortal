import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import RootReducer from './RootReducer'
import { persistStore,persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
//import thunk from 'redux-thunk'
const persistConfig = {
    key:'root',
    storage:storageSession
}
const persistedReducer = persistReducer(persistConfig,RootReducer)

export const store = createStore(persistedReducer,applyMiddleware(logger))
export const Persister = persistStore(store)