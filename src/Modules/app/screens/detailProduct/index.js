import { formatNumber } from "../../../../Helpers/utils"
import { useForm } from "react-hook-form";
import { useCart } from "../../../../hooks/useCart"
import { useParams } from "react-router-dom";
import {  useEffect } from "react";



const DetailProductScreenApp = ({ product }) => {
    const { id } = useParams();
    const { addProduct, cartItems, increase } = useCart();

    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        console.log(data)

    };

    useEffect(async () => {
        reset(product);
      }, [id]);
    return (
        <div className="container">
            

            <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="hidden"
                {...register("name", { required: true })}
            />
            <input
                type="hidden"
                {...register("image", { required: true })}
            />
            <input
                type="hidden"
                {...register("price", { required: true })}
            />
            <input
                type="hidden"
                {...register("description", { required: true })}
            />
            <input
                type="hidden"
                {...register("cate_id", { required: true })}
            />
            <div className="row">
                <div className="col-6">
                    <img src={product.image} width="400" />
                </div>
                <div className="col-6">
                    <h4>{product.name}</h4>
                    <h5>{formatNumber(product.price)}</h5>
                    <p>{product.description}</p> 
                    {/* <p>Category : {product.category.name}</p>  */}
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
