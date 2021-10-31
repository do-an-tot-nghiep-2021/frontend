import { showproduct } from "../../../../Api/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DetailProductScreenApp from "../../screens/detailProduct";

const DetailProductComponentApp = () => {

    const { id } = useParams();
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const getProducts = async () => {
        try {
            const { data } = await showproduct(id);
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
        };
        getProducts();
    }, [id]);

    

    return (
        <DetailProductScreenApp 
            product={products} 
            cate={products.category} 
            type={products.product_type}
            topping={products.product_topping}
        />
    )
}

export default DetailProductComponentApp
