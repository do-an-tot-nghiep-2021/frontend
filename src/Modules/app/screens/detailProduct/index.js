import { formatNumber } from "../../../../Helpers/utils";
import { useForm } from "react-hook-form";
import { useCart } from "../../../../hooks/useCart";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const DetailProductScreenApp = ({ product, product_cate, type, topping }) => {

    const [count, setCount] = useState(0);
    const { addProduct } = useCart();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const price_topping = (data.topping) ? (data.topping.length) * 7000 : 0
        const newProduct = {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price + price_topping,
            quantity: count + 1,
            topping: (data.topping ? data.topping : ""),
            type: (data.type ? data.type : "")
        }
        addProduct(newProduct)
        Swal.fire('Đã thêm vào giỏ hàng!', '', 'success')
    }
    return (
        <>
            <section className="default-section shop-single pad-bottom-remove">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-12 col-md-6 col-sm-12 col-lg-5 col-xl-5 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                                <div className="slider slider-for slick-shop">
                                    <div>
                                        <img src={product.image} alt=""  style={{height : "312px", objectFit : "cover"}}/>
                                    </div>

                                </div>

                            </div>
                            <div className="col-12 col-md-6 col-sm-12 col-lg-7 col-xl-7 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                                <h2 className="text-coffee"> {product.name}</h2>
                                <div className="star-review-collect">
                                    {/* <div className="star-rating">
                                        <span className="star-rating-customer" style={{ width: '50%' }}>
                                        </span>
                                    </div> */}
                                    {/* <a href="#" className="review-text">03 customer review</a> */}
                                </div>

                                <h3 className="text-coffee">{formatNumber((product.price) * (count + 1))}</h3>
                                <div className="price-textbox">
                                    {(count < 1) ? <span className="minus-text">
                                        <i className="fas fa-minus" />
                                    </span> :
                                        <span className="minus-text">
                                            <i className="fas fa-minus" onClick={() => setCount(count - 1)} />
                                        </span>
                                    }
                                    <input type="text" value={count + 1} />
                                    <span className="plus-text"><i className="fas fa-plus" onClick={() => setCount(count + 1)} /></span>
                                </div>
                                <button type="submit" className="btn-large filter-btn" style={{ border: 'none' }}>
                                    <i className="fa fa-shopping-bag mr-2" aria-hidden="true" />
                                    Thêm vào giỏ hàng
                                </button>

                                {type && type.length > 0 ?
                                    <div className="type_product mt-3">
                                        <h5>Chọn thuộc tính <span className="text-danger" style={{ fontSize: '20px' }}>*</span></h5>
                                        <div className="row mt-3">
                                            {type && type.map((item, index) => (
                                                <div className="col-2">
                                                    <section key={index} className="d-flex justify-content-between">
                                                        <div>
                                                            <input type="radio" value={item.name} {...register("type", { required: true })} />
                                                        </div>
                                                        {errors.type && <span className="text-danger">Không để trống trường này</span>}
                                                        <div>
                                                            <span>{item.name}</span><br />{item.price}
                                                        </div>
                                                    </section>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    : ""}

                                {topping && topping.length > 0 ?
                                    <div className="topping_product mt-5">
                                        <h5>Thêm Topping (option)</h5>
                                        <div className="row mt-3">
                                            {topping && topping.map((item, index) => (
                                                item.status == 0 ? "" :
                                                <div className="col-4">
                                                    <section key={index} className="mr-2 d-flex flex-row">
                                                        <div className="p-2">
                                                            <input type="checkbox" value={item.name}{...register("topping", { required: false })} />
                                                        </div>
                                                        <div className="p-2">
                                                            <span>{item.name}</span><br />{formatNumber(item.price)}
                                                        </div>
                                                    </section>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    : ""}

                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default DetailProductScreenApp;