import { showproduct } from "../../../../Api/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DetailProductScreenApp from "../../screens/detailProduct";
import { Link } from "react-router-dom";
import ProductCategoryDetail from "./productCate";

const DetailProductComponentApp = () => {

    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const getProducts = async () => {
            try {
                const { data } = await showproduct(id);
                setLoading(false)
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, [id]);

    const renderPreview = () => {
        if (loading) {
            return (
                <section className="default-section shop-single pad-bottom-remove mb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 col-sm-12 col-lg-5 col-xl-5 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                                <div className="slider slider-for slick-shop">
                                    <div>
                                        <img src="https://www.vinamilk.com.vn/the-gioi-an-dam/wp-content/themes/bot-dinh-duong/tpl/dist/assets/images/dummy/540x479.png" alt="" style={{ height: "312px", objectFit: "cover" }} />
                                    </div>
                                </div>

                            </div>
                            <div className="col-12 col-md-6 col-sm-12 col-lg-7 col-xl-7 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                                <div style={{ backgroundColor: "#CCCCCC", height: "25px", width: "40%", "borderRadius": "20px" }}></div>
                                <div className="my-5 " style={{ backgroundColor: "#CCCCCC", height: "25px", width: "20%", "borderRadius": "20px" }}></div>
                                <di className="row">
                                    <div className="col-3">
                                        <div style={{ backgroundColor: "#CCCCCC", height: "45px", width: "100%", "borderRadius": "40px" }}></div>
                                    </div>
                                    <div className="col-5">
                                        <div style={{ backgroundColor: "#CCCCCC", height: "45px", width: "100%", "borderRadius": "40px" }}></div>
                                    </div>
                                </di>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }

    return (
        <>
            <section className="breadcrumb-nav">
                <div className="container">
                    <div className="breadcrumb-nav-inner">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active"><a>{products.name}</a></li>
                        </ul>
                        <label className="now">Sản phẩm chi tiết</label>
                    </div>
                </div>
            </section>
            {renderPreview()}
            {!loading ?
                <DetailProductScreenApp
                    product={products}
                    type={products.product_type}
                    product_cate={products.product_cate}
                    topping={products.product_topping}
                />
                : ""}
            <ProductCategoryDetail product_cate={products.product_cate} />
        </>
    )
}

export default DetailProductComponentApp