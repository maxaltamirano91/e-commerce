import styles from '../Componentes/NavBar.module.css'

import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';


interface EventProps {
    handleCleanLocalStorage: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }
export const NavBar = (props : EventProps) => {
    const {handleCleanLocalStorage } = props;
    const productos = useSelector((state : RootState)=> state.carrito)
    console.log(productos , 'log productos');
        
    const suma = productos.length


  return (
    <div className={styles.navBar}>
      <Link to='/'>
      <p>Inicio</p>
      </Link>
        
        <Link to='/createProducto'>
        <p>Crear producto</p>
        </Link>
        <div className={styles.input}>
        <input type="text" placeholder="buscar"/> 
        <button>Buscar</button>
        </div>
        <div>
        <p><ShoppingCart /></p>
        <p>{suma}</p>
        </div>
        <button onClick={handleCleanLocalStorage} className={styles.carrito}>Vaciar</button>
         {/* <button className={styles.carrito}>Vaciar Carrito</button> */}
    </div>
  )
}
