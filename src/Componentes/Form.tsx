import styles from '../Componentes/Form.module.css'

import { Producto } from "./types"

import { useDispatch, useSelector } from "react-redux"
import {  useEffect, useState, ChangeEvent } from "react"
import { RootState } from '../redux/store';
import { AppDispatch } from '../redux/store'
import { addProduct} from '../redux/reducer'
import { useLocalStorage } from 'usehooks-ts'

interface FormState {
    form : Producto
}

interface Storage {
    store : Producto[]
}

export const Form = () => {

    const newProduct = useSelector((state: RootState) => state.data);
    const dispatch = useDispatch<AppDispatch>();
    const [form, setForm] = useState<FormState['form']>({
        "id": 0,
        "title":'',
        "price": 0,
        "description": '',
        "category": '',
        "image": '',
    })

    const [storeValue, setStoreValue] = useLocalStorage<Storage['store']>('productoKey', [{
        id: 0,
        title: '',
        price: 0,
        description: '',
        category: '',
        image: ''
      }])



    const handleSubmit = (e : ChangeEvent<HTMLFormElement> ) =>{
    e.preventDefault()
    if(!form.title || !form.price || !form.image) return alert(' form vacio');
    setStoreValue([...storeValue ,form])
    // dispatch(storageProduct(form))
    dispatch(addProduct(form))
    setForm({
        "id": 0,
        "title":'',
        "price": 0,
        "description": '',
        "category": '',
        "image": '',
    })
}

const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) =>{   
       setForm({
        ...form,        
        [e.target.name] : e.target.value
       })
    }
   
    useEffect(()=>{

    },[newProduct])
    
   return (
  
   <form onSubmit={handleSubmit} className={styles.form}>
   {/* <input type="number" value={form.id} name='id' onChange={handleChange} placeholder="id"/> */}
   <input type="text" value={form.title} name='title' onChange={handleChange}placeholder="title" />
   <input type="text" value={form.category} name='category' onChange={handleChange} placeholder="category"/>
   <input type="number" value={form.price} name='price' onChange={handleChange}placeholder="price" />
   <input type="text" value={form.image} name='image' onChange={handleChange}placeholder="image" />
   <textarea value={form.description} name='description' onChange={handleChange}placeholder="description"/>
   <button>New product</button>
</form>
  
  )
}
