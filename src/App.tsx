import './App.css'
import styles from './App.module.css'

import {  Route, Routes } from 'react-router-dom';

import { useDispatch, useSelector  } from "react-redux"
import {  useLocalStorage } from 'usehooks-ts'
import { AppDispatch, RootState } from "./redux/store"
import { cleanStorageProduct } from './redux/reducer';



import {Home}from './Componentes/Home'
import { Detail } from './Componentes/Detail';
import { NavBar } from './Componentes/NavBar';

import { Producto } from './Componentes/types';
import { Form } from './Componentes/Form';

interface cleanCarrito {
  clean : Producto
}

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const clean = useSelector((state : RootState)=> state.carrito)
 
  

  const [, , cleanLocalStore] = useLocalStorage('productoKey', 0);

  const handleCleanLocalStorage = () =>{
    cleanLocalStore()
    dispatch(cleanStorageProduct(clean))
    }
  
  return (
    <div  className={styles.title}>
       <NavBar handleCleanLocalStorage={handleCleanLocalStorage}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/detail/:id" element={<Detail/>} />
          <Route path='/createProducto' element={<Form/>} />
        </Routes>
    </div>
  );
}

export default App
