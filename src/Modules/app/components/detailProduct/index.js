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
            type={products.product_type}
            product_cate={products.product_cate}
            topping={products.product_topping}
        />
    )
}

export default DetailProductComponentApp