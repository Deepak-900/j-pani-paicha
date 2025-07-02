import { combineReducers, createStore } from 'redux';
import productReducer from './productStore';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';


const rootReducer = combineReducers({
    productStore: productReducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(persistedReducer)
export let persistor = persistStore(store);