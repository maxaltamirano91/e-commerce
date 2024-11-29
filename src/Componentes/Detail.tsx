import { useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import styles from '../Componentes/Detail.module.css'



export const Detail = ( ) => {

  const {id} = useParams<string>()
  const idNumber = Number(id)

  
  const data = useSelector((state: RootState) => state.data);
 const productId = data.filter((el)=> el.id === idNumber)
 

  
  
  return (
    <div className={styles.detail}>
    {productId?.length > 0 ? productId.map((el) => {
      return (
        <div className={styles.card} key={el.id}>
          <div className={styles.info}>
            <p className={styles.title}>{el.title}</p>
            <p>$ {el.price}</p>
            <p>{el.description.substring(0,100)}...</p>
            <p>Category: {el?.category}</p>
          </div>
          <div className={styles.imagen}>
            <img src={el.image} alt={el.title} width="200px" height="250px" />
          </div>
        </div>
      );
    }): <p>Loading...</p>}
  </div>
  )
}
