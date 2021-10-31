import { formatNumber } from "../../../../Helpers/utils"
import { useForm } from "react-hook-form";
import { useCart } from "../../../../hooks/useCart"
import { useParams } from "react-router-dom";



const DetailProductScreenApp = ({ product, cate, type, topping }) => {
    const { id } = useParams();
    const { addProduct, cartItems, increase } = useCart();

    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }

    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        // addProduct(data)

    };

    return (
        <div className="container mt-5">
            

            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" defaultValue={product.name} {...register("name")} />
            <input type="hidden" defaultValue={product.image} {...register("image")} />
            <input type="hidden" defaultValue={product.description} {...register("description")} />
            <input type="hidden" defaultValue={product.price} {...register("price")} />
            <input type="hidden" defaultValue={product.cate_id} {...register("cate_id")} />
            
            <div className="row">
                <div className="col-6">
                    <img src={product.image} width="400" />
                </div>
                <div className="col-6">
                    <h4>{product.name}</h4>
                    <h5>{formatNumber(product.price)}</h5>
                    <p>{product.description}</p> 
                    {/* <p>Category : {cate.name}</p>  */}
                    {/* <select {...register("type")}>
                        {type.map((item) => (
                            <option value={item.name} key={item.id} className="form-control">{item.name}</option>
                        ))}
                    </select> */}
                    
                    <button type="submit" className="btn btn-primary mt-5">
                        Create
                    </button>
                
                </div>
                {/* <div>
                    {
                        isInCart(product) &&
                        <button
                            onClick={() => increase(product)}
                            className="btn btn-outline-primary btn-sm">Add more</button>
                    }

                    {
                        !isInCart(product) &&
                        <button
                            onClick={() => addProduct(product)}
                            className="btn btn-primary btn-sm">Add to cart</button>
                    }
                </div> */}
            </div>    
            </form>
        </div>
    )
}

export default DetailProductScreenApp
