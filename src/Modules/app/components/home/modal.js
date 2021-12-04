import { showproduct } from "../../../../Api/product";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {useCart} from "../../../../hooks/useCart"
import { formatNumber } from "../../../../Helpers/utils";

function ModalProduct({ setOpenModal, idproduct }) {
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState([]);
  const { addProduct } = useCart();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await showproduct(idproduct);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [idproduct]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const price_topping = (data.topping) ? (data.topping.length)*7000 : 0
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
  };

  return (
    <>
      <div
        className="modal fade show"
        id="m_modal_detail_product"
        tabIndex={-1}
        style={{ display: "inline-block" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Sản phẩm chi tiết
              </h5>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <img
                        className="img-product-detail"
                        src={product.image}
                        alt=""
                      />
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

                      <h3 className="text-coffee">
                        {formatNumber(product.price * (count + 1))}
                      </h3>
                      <div className="price-textbox">
                        {count < 1 ? (
                          <span className="minus-text">
                            <i className="fas fa-minus" />
                          </span>
                        ) : (
                          <span className="minus-text">
                            <i
                              className="fas fa-minus"
                              onClick={() => setCount(count - 1)}
                            />
                          </span>
                        )}
                        <input type="text" value={count + 1} />
                        <span className="plus-text">
                          <i
                            className="fas fa-plus"
                            onClick={() => setCount(count + 1)}
                          />
                        </span>
                      </div>

                      <div className="topping_product">
                        <div className="row">
                          {product.product_topping &&
                            product.product_topping.map((item, index) => (
                              <section key={index} className="mr-2">
                                <input
                                  type="checkbox"
                                  value={item.name}
                                  {...register("topping", { required: false })}
                                />
                                <br />
                                {item.name}
                                <br />
                                {item.price}
                              </section>
                            ))}

                          {product.product_type &&
                            product.product_type.map((item, index) => (
                              <section key={index} className="mr-2">
                                <input
                                  type="radio"
                                  value={item.name}
                                  {...register("type", { required: false })}
                                />
                                <br />
                                {item.name}
                                <br />
                                {item.price}
                              </section>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Đóng
              </button>
              <button type="submit" className="btn btn-primary">
                Thêm mới
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalProduct;
