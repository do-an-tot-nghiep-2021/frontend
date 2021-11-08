import React, { createContext, useState, useEffect } from 'react';
import { allproduct } from '../Api/product';
export const ProductsContext = createContext()

const ProductsContextProvider = ({children}) => {

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const getProducts = async () => {
        try {
            const { data } = await allproduct();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
        };
        getProducts();
    }, []);

    return ( 
        <ProductsContext.Provider value={{products}} >
            { children }
        </ProductsContext.Provider>
     );
}
 
export default ProductsContextProvider;