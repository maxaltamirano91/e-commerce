import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./reducer";

const store = configureStore({
  reducer: productSlice.reducer,
});


// Tipos para dispatch y estado
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 
