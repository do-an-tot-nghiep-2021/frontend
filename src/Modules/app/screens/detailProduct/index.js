import { formatNumber } from "../../../../Helpers/utils";
import { useForm } from "react-hook-form";
import { useCart } from "../../../../hooks/useCart";
import { useParams } from "react-router-dom";

const DetailProductScreenApp = ({ product, cate, type, topping }) => {
  const { id } = useParams();
  const { addProduct, cartItems, increase } = useCart();

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    // addProduct(data)
  };

  return (
    <>
      <div className="product-detail">
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
                If you're planning to start an online store right away, look no
                further, get this template on templateForest. This product page
                demonstrates a "Simple Product".
              </p>
              <h3 className="text-coffee">{product.price}</h3>
              <div className="price-textbox">
                <span className="minus-text">
                  <i className="fas fa-minus" />
                </span>
                <input type="text" name="txt" placeholder={1} pattern="[0-9]" />
                <span className="plus-text">
                  <i className="fas fa-plus" />
                </span>
              </div>
              <a href="#" className="btn-large filter-btn">
                <i className="fa fa-shopping-bag" aria-hidden="true" /> Add to
                Cart
              </a>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProductScreenApp;
