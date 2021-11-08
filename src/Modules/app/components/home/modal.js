import React from "react";
import "./modal.css";
import { showproduct } from "../../../../Api/product";
import { useEffect, useState } from "react";

function ModalProduct({ setOpenModal, idproduct }) {
  const [products, setProducts] = useState([]);
  console.log(products.product_topping)
    
    useEffect(() => {
        const getProducts = async () => {
        try {
            const { data } = await showproduct(idproduct);
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
        };
        getProducts();
    }, [idproduct]);    
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <img src={products.image} width="200"/>
        <p>{products.name}</p>
        <p>{products.price}</p>
        {products.product_topping && products.product_topping.map((item) => (
          <div key={item.id}>
            <input type="checkbox"  />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModalProduct;
