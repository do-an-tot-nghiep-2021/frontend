import HomeScreen from "../../screens/home/homepage"
import { useProducts } from "../../../../hooks/useProducts";
import BannerApp from "../../../../Layouts/app/component/banner";

const HomePageComponentApp = () => {
    
    const { products } = useProducts()
    return (
        <>
            <BannerApp />
            <div className="container-fluid">  
                <div className="row">
                    {
                        products.map(product =>(
                            <HomeScreen key={product.id}  product={product} />
                        ))
                    }     
                </div>
            </div>
        </>
    )
}

export default HomePageComponentApp
