import { createSlice } from "@reduxjs/toolkit"

interface User {
    alldata: any[],
    data: any
}

const initialState: User = {
    alldata: [],
    data: []
}

export const usuario = createSlice({
    name: 'poke-api',
    initialState,
    reducers: {

        setData: (state, actions) => {
            state.alldata = actions.payload
        },

        limitPokemons: (state, actions) => {
            state.data = state.alldata.filter((item,i) => {
                if (actions.payload < i) {
                    return {...item}
                }
            })
        },
        
    }
})

export const { limitPokemons, setData } = usuario.actions
export default usuario.reducer;