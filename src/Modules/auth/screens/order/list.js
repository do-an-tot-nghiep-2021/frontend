import { formatNumber } from "../../../../Helpers/utils";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { showorder, updateorder } from "../../../../Api/order";
import Swal from 'sweetalert2'

const OrderScreenAuth = ({ data }) => {

  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const [idOrder, setIdOrder] = useState();
  const [status, setStatus] = useState();
  const handleChange = (e) => {
    setStatus(e.target.value);
  };
  const onSubmit = async (data) => {
    const newData = {
      ...data,
      status: status
    }
    try {
      Swal.fire({
        title: 'Bạn có muốn thay đổi trạng thái đơn hàng?',
        showCancelButton: true,
        confirmButtonText: 'cập nhật!',
      }).then((result) => {
        if (result.isConfirmed) {
          updateorder(newData).then(response => {
            console.log(response)
            if (!response.data) {
              Swal.fire(response.data.message, '', 'error')
            }
            if (response.data) {
              Swal.fire('Thành công!', '', 'success')
            }
          })
        }
      })
    } catch (error) {
      Swal.fire('Không thể gửi request', '', 'error')
    }
  }
  useEffect(async () => {
    const respons = await showorder(idOrder);
    const order = respons.data;
    reset(order);
  }, [idOrder]);

  return (
    <>
      {data && data.map((items, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{items.user.name}</td>
          <td>0{items.phone}</td>
          <td>{items.building.name}, {items.classroom.name}</td>
          <td><span className={items.color}>{items.status}</span></td>
          <td>
            <button type="button" className="btn btn-brand btn-sm m-btn m-btn--custom" style={{background : '#8d49cf'}} data-toggle="modal" data-target={`.exampleModal${items.id}`}>
              Chi tiết
            </button>
          </td>
          <td>
            <i class="la la-edit" data-toggle="modal" data-target={`#m_modal_order_${items.id}`} onClick={() => setIdOrder(items.id)}></i>
            <div className="modal fade" id={`m_modal_order_${items.id}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Cập nhật trạng thái đơn hàng</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Status</label><br />
                        <select {...register("status", { required: true })} onChange={handleChange} className="form-control">
                          <option value="1">Đơn hàng đang chờ xử lý</option>
                          <option value="2">Đơn hàng đang chờ nhân viên giao hàng</option>
                          <option value="3">Đơn hàng đang được vận chuyển</option>
                          <option value="4">Đơn hàng đã vận chuyển thành công</option>
                          <option value="5">Đơn hàng đã bị hủy</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
                      <button type="submit" className="btn btn-primary">Cập nhật</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <a className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete" onClick={() => props.onDelete(item.id)}>
              <i class="la la-trash"></i>
            </a> */}
          </td>
          <div className={`modal fade exampleModal${items.id}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel" style={{ marginBottom: 0, lineHeight: 1.5, fontWeight: 500, color: '#495057' }}>Chi tiết đơn đặt hàng</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="table-responsive">
                    <table className="table table-centered table-nowrap">
                      <thead>
                        <tr>
                          <th scope="col" style={{ fontWeight: 600, color: '#495057', fontSize: '14px' }}>Sản phẩm</th>
                          <th scope="col" style={{ fontWeight: 600, color: '#495057', fontSize: '14px' }}>Tên sản phẩm</th>
                          <th scope="col" style={{ fontWeight: 600, color: '#495057', fontSize: '14px' }}>Giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.products.map((item, key) => (
                          <tr key={key}>
                            <th scope="row">
                              <div>
                                <img src={item.image} alt="" style={{ height: '4rem', width: '4rem', objectFit: 'cover', borderRadius: '7px' }} />
                              </div>
                            </th>
                            <td>
                              <div>
                                <h5 className="text-truncate" style={{ fontWeight: 600, color: '#495057', fontSize: '14px' }}>{item.name} {item.type ? `(${item.type})` : ""}</h5>
                                <p className="text-muted mb-0" style={{ color: '#495057', fontSize: '13px' }}>{formatNumber(item.price)} x {item.quantity}</p>
                                {item.topping.map((i, k) => (
                                  <span key={k}>{i.name},</span>
                                ))}
                              </div>
                            </td>
                            <td style={{ color: '#495057', fontSize: '13px' }}>{formatNumber(item.quantity * item.price)}</td>
                          </tr>
                        ))}
                        <tr>
                          <h6>Nội dung : </h6>
                          <span>{items.note ? items.note : "Trống!"}</span>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <h6 className="m-0 text-right" style={{ color: '#495057', fontWeight: '700' }}>Tổng phụ:</h6>
                          </td>
                          <td>
                            {formatNumber(items.price_total)}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <h6 className="m-0 text-right" style={{ color: '#495057', fontWeight: '700' }}>Thanh toán:</h6>
                          </td>
                          <td>
                          {items.payment}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <h6 className="m-0 text-right" style={{ color: '#495057', fontWeight: '700' }}>Tổng giá:</h6>
                          </td>
                          <td>
                            {formatNumber(items.price_total)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-success" data-dismiss="modal">Đóng</button>
                </div>
              </div>
            </div>
          </div>
        </tr>
      ))}
    </>
  );
};

export default OrderScreenAuth
  ;
