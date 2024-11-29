import styles from '../Componentes/Card.module.css'
import { Link} from 'react-router-dom';
import { Producto } from './types'

import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { storageProduct} from '../redux/reducer';

interface Props{
    productos: Array<Producto>
}



export const Card = (props:  Props) => {
    const { productos} = props
    const dispatch = useDispatch<AppDispatch>()

    const handleAddProductoCarrito = ( id : number) =>{
    const producto = productos.find(el => el.id === id)
    console.log(producto , 'log de producto');
    
     if(producto) dispatch(storageProduct(producto))
    }


  return (
<div className={styles.cards}>
  {productos?.length > 0 ? productos.map((el) => {
    return (
      <div className={styles.card} key={el.id}>
        <div className={styles.info}>
          <p className={styles.title}>{el.title}</p>
          <p>$ {el.price}</p>
          {/* <p>{el.description.substring(0,100)}...</p> */}
          <p>Category: {el?.category}</p>
        </div>
        <div className={styles.imagen}>
        <Link to={`/detail/${el.id}`}>
          <img src={el.image} alt={el.title} width="200px" height="250px" />
          </Link>
        </div>
        <button onClick={() => handleAddProductoCarrito( el.id)}>
        Add Carrito</button>
      </div>
    );
  }): <p>Loading...</p>}
</div>
  )
}
