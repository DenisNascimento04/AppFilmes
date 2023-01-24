// import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import UserReducer from './store';

const store = configureStore({
    reducer: {pokemons: UserReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),  
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;