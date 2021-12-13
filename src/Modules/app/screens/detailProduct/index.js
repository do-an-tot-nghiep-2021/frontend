import { formatNumber } from "../../../../Helpers/utils";
import { useForm } from "react-hook-form";
import { useCart } from "../../../../hooks/useCart";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const DetailProductScreenApp = ({ product, product_cate, type, topping }) => {
    const [count, setCount] = useState(0);
    const [numberSlide, setNumberSlide] = useState(product_cate && product_cate.length);
    const { id } = useParams();
    const { addProduct } = useCart();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const settings = {
        dots: true,
        infinite: true,
        speed: 1800,
        slidesToShow: numberSlide > 3 ? 4 : 2,
        slidesToScroll: 4,

    };


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
            <section className="breadcrumb-nav">
                <div className="container">
                    <div className="breadcrumb-nav-inner">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active"><a>{product.name}</a></li>
                        </ul>
                        <label className="now">Sản phẩm chi tiết</label>
                    </div>
                </div>
            </section>
        
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
                                <h4 className="text-coffee"> {product.name}</h4>
                                <div className="star-review-collect">
                                    <div className="star-rating">
                                        <span className="star-rating-customer" style={{ width: '50%' }}>
                                        </span>
                                    </div>
                                    <a href="#" className="review-text">03 customer review</a>
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
            
            <section className="default-section comment-review-tab bg-grey v-pad-remove wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <div className="container">
                    <div className="tab-part">

                        <div className="tab-content">

                            <div role="tabpanel" className="tab-pane active" id="reviews">
                                <div className="title text-center">
                                    <h3 className="text-coffee">2 Comment</h3>
                                </div>
                                <div className="comment-blog">
                                    <div className="comment-inner-list">
                                        <div className="comment-img">
                                            <img src="images/comment-img1.png" alt="" />
                                        </div>
                                        <div className="comment-info">
                                            <h5>Anna Taylor</h5>
                                            <span className="comment-date">AUGUST 9, 2016 10:57 AM</span>
                                            <p>Aqua Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                    <div className="comment-inner-list">
                                        <div className="comment-img">
                                            <img src="images/comment-img1.png" alt="" />
                                        </div>
                                        <div className="comment-info">
                                            <h5>Anna Taylor</h5>
                                            <span className="comment-date">AUGUST 9, 2016 10:57 AM</span>
                                            <p>Aqua Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {product_cate && product_cate.length > 1 ?
                <section className="default-section wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                    <div className="container">
                        <div className="title text-center">
                            <h3 className="text-coffee">Sản phẩm liên quan</h3>
                        </div>
                        <div className="product-wrapper">
                            <div class="owl-theme">
                                <Slider {...settings}>
                                    {product_cate && product_cate.map((product) => (
                                        <div className="item" key={product.id}>
                                            <div className="product-img">
                                                <Link to={`/product/${product.id}`}>
                                                    <img src={product.image} alt="" style={{width : "261px", height : "182px", objectFit : "cover"}} />
                                                    <span className="icon-basket fontello" />
                                                </Link>
                                            </div>
                                            <h5>{product.name}</h5>
                                            <span>{formatNumber(product.price)}</span>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
                : ""}
        </>
    );
};

export default DetailProductScreenApp;