import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';

const ListProductScreen = (props) => {

  return (
    <>
      {props.data.map((item, index) => (
        <tr key={index}>
          <th scope="row">
            {index + 1}
          </th>
          <td>
            <img
              src={item.image}
              className="rounded"
              style={{ objectFit: "cover", width: "70px", height: "70px" }}
            />
          </td>
          <td>
            {item.name}
          </td>
          <td>
            <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
          </td>
          <td>
            {item.category?.name || 'N/A'}
          </td>
          <td>
            <button type="button" className="btn m-btn--pill m-btn--air btn-secondary m-btn m-btn--custom m-btn--label-primary m-btn--bolder" data-toggle="modal" data-target={`#m_modal_order_${item.id}`}>Chi tiết</button>
            <div className="modal fade" id={`m_modal_order_${item.id}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Topping và Thuộc tính</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-2">
                      <h6>Topping :</h6>
                      {item.product_topping.map((item, index) => (
                        <span class="m-badge m-badge--brand m-badge--wide m-badge--rounded m-1" key={index}>{item.name}</span>
                      ))}
                    </div>
                    <div>
                      <h6>Thuộc tính :</h6>
                      {item.product_type.map((item, index) => (
                        <span class="m-badge m-badge--danger m-badge--wide m-badge--rounded m-1" key={index}>{item.name}</span>
                      ))}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td>
            <Link to={`/admin/products/${item.id}`} className="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">
              <i class="la la-edit"></i>
            </Link>
            <a className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete" onClick={() => props.onDelete(item.id)}>
              <i class="la la-trash"></i>
            </a>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ListProductScreen;
