import { createSlice,  PayloadAction } from '@reduxjs/toolkit';
import { Producto } from '../Componentes/types';

interface ProductsState {
  data: Producto[];  
  detail: Producto[];  
  storage: Producto[],
  carrito: Producto[], 
}

const initialState: ProductsState = {
  data: [], 
  detail: [],
  storage: [],
  carrito:[],
};

export const productSlice = createSlice({ 
  name: "products",
  initialState,
  reducers: {
    dataBase:(state , action : PayloadAction<Producto[]>) =>{
    state.data = action.payload; 
  },

    addProduct: (state, action : PayloadAction<Producto>) => {
      console.log(action.payload);
      
      action.payload.id = state.data.length + 1;
      console.log(action.payload.id);
      console.log(action.payload , 'log de payload luego de ID');
      
      state.data = state.data.concat(action.payload)
      state.storage = [...state.storage , action.payload]
      
    },
    cleanStorageProduct: (state, action : PayloadAction<Producto[]>) => {
      const id = action.payload.map(el => el.id)
      console.log(id);
      
      state.carrito = state.carrito.filter((el) => { 
        return !id.includes(el.id);
      });
    },
    storageProduct: (state, action : PayloadAction<Producto>) => {
      state.carrito = [...state.carrito, action.payload];  
      state.storage = [...state.storage, action.payload];    
    },
  },
});

export const { storageProduct, dataBase, addProduct, cleanStorageProduct } = productSlice.actions;
