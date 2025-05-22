import { createSlice } from '@reduxjs/toolkit';

const pedidosSlice = createSlice({
    name: 'pedidos',
    initialState: [],
    reducers: {
        agregarPedido: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { agregarPedido } = pedidosSlice.actions;
export default pedidosSlice.reducer;