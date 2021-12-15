import { Link } from "react-router-dom";
import Slider from "react-slick";
import { formatNumber } from "../../../../Helpers/utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
const ProductCategoryDetail = ({product_cate}) => {
    const [numberSlide, setNumberSlide] = useState(product_cate && product_cate.length);
    const settings = {
        dots: true,
        infinite: true,
        speed: 1800,
        slidesToShow: numberSlide > 3 ? 4 : 2,
        slidesToScroll: 4,

    };
    return (
        <>
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
    )
}

export default ProductCategoryDetail
