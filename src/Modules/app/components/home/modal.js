import { showproduct } from "../../../../Api/product";
import { useEffect, useState } from "react";

function ModalProduct({ setOpenModal, idproduct }) {
  const [products, setProducts] = useState([]);

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
    <>
      <div className="modal fade show" id="m_modal_detail_product" tabIndex={-1} style={{ display: 'inline-block' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Sản phẩm chi tiết</h5>
            </div>
            <div className="modal-body">
              {products.name}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => {
                setOpenModal(false);
              }}>Đóng</button>
              <button type="submit" className="btn btn-primary">Thêm mới</button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default ModalProduct;
