import { formatNumber } from "../../../../Helpers/utils";
import { useForm } from "react-hook-form";
import { useCart } from "../../../../hooks/useCart";
import { useParams } from "react-router-dom";
import { useState } from "react";
const DetailProductScreenApp = ({ product, cate, type, topping }) => {
    const [count, setCount] = useState(0);
    const { id } = useParams();
    const { addProduct } = useCart();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = async (data) =>{
        const newProduct = {
            ...product,
            topping : data.topping
        }
        addProduct(newProduct)
    }
    return (
        <>
            <div className="product-detail">
            <form onSubmit={handleSubmit(onSubmit)}>
            
            
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <img className="img-product-detail" src={product.image} alt="" />
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <h4 className="text-coffee">{product.name}</h4>
                            <div className="star-review-collect">
                                <div className="star-rating">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <span
                                        className="star-rating-customer"
                                        style={{ width: "50%" }}
                                    ></span>
                                </div>
                            </div>
                            <p className="desc-detail">
                                {product.description}
                            </p>
                            <h3 className="text-coffee">{formatNumber(product.price)}</h3>
                            <div className="price-textbox">
                                {(count < 1) ? <span className="minus-text">
                                    <i className="fas fa-minus" />
                                </span> :
                                    <span className="minus-text">
                                        <i className="fas fa-minus" onClick={() => setCount(count - 1)} />
                                    </span>
                                }
                                <input type="text" name="txt" value={count + 1} />
                                <span className="plus-text">
                                    <i className="fas fa-plus" onClick={() => setCount(count + 1)} />
                                </span>
                            </div>
                            <button type="submit" className="btn-large filter-btn">
                                <i className="fa fa-shopping-bag" aria-hidden="true" /> Add to
                                Cart
                            </button>

                            <div className="share-tag">
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <div className="tag-wrap">
                                            <h5>TAGS</h5>
                                            <a href="#" className="tag-btn">
                                                Audio
                                            </a>
                                            <a href="#" className="tag-btn">
                                                Service
                                            </a>
                                            <a href="#" className="tag-btn">
                                                Cupcake
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="topping_product">
                                <div className="row">
                                {topping && topping.map((item, index) => (
                                    <section key={index}>
                                    <input
                                        type="checkbox"
                                        value={item.name}
                                        {...register("topping", { required: false })}
                                    />
                                    {item.name}
                                    </section>
                                ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </>
    );
};

export default DetailProductScreenApp;
