import { useState } from "react"

import { Producto } from "../Componentes/types"


interface LocalStorage {
 storage : Producto
}

export const useLocalStorage = ( key : string, initialValue : LocalStorage['storage'] ) =>{

    const [storeValue, setStoreValue] = useState<LocalStorage['storage']>(() => {
        console.log("llega");
        
        try {
            const item = window.localStorage.getItem(key)  
            console.log(item);
            
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            return initialValue;
            
        }
    })
    const setValue = ( value : Producto )=>{
        
    try {
            setStoreValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(error)
    }
        }

    return [storeValue, setValue] as const;
}