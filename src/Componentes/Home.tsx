import styles from "../Componentes/Home.module.css"

import { Card } from "./Card"

import { Producto } from "./types"
import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useReadLocalStorage } from 'usehooks-ts'
import { AppDispatch } from "../redux/store"
import { RootState } from '../redux/store';
import { dataBase, storageProduct} from "../redux/reducer"


interface Storage {
    store : Producto
}

export const Home = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    const store = useReadLocalStorage<Storage['store']>('productoKey') 

    
    const dataApi = useSelector((state: RootState) => state.data); 
    console.log(dataApi.length , 'log de dataApi');
       
    const local = useSelector((state: RootState) => state.storage) 
    // console.log(local , 'log de Local');
    
    const productos = dataApi.concat(local.length > 0 ? local[0] : []);
    console.log(productos , 'log de productos');
    
 



useEffect(()=>{
    async function fetchData() {
            const response = await fetch(`https://fakestoreapi.com/products/`); 
            const data = await response.json();
            dispatch(dataBase(data));
      }
      fetchData();
      if(store){        
        dispatch(storageProduct(store))
        }
  },[dispatch,store])


// const handleCleanLocalStorage = () =>{
// cleanLocalStore()
// dispatch(cleanStorageProduct([]))
// }




  return (
    <div className={styles.contenedor}>
    {/* <div className={styles.navBar}>
        <p>Inicio</p>
        <p>Crear producto</p>
        <p>Productos</p>
        <div className={styles.input}>
        <input type="text" placeholder="buscar"/> 
        <button>Buscar</button>
        </div>
        <button onClick={handleCleanLocalStorage} className={styles.carrito}>Vaciar Carrito</button>
    </div> */}
        <Card  productos={productos} />
        {/* <Form/> */}
    </div>
    
  )
}
