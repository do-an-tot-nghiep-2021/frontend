import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
const OrderScreenAuth = ({data}) => {
  return (
    <>
      {data && data.map((items, index) => (
        <div className="row mb-5" key={index}>
          <div className="col-12 progress-bar bg-info rounded p-2 mb-1"></div>
          <div className="col-6">
          {items.products.map((item, key)=>(
              <div className="row" key={key}>
                <div className="col-2 mb-2">
                  <img src={item.image} className="rounded" width="100"/>
                </div>
                <div className="col-10">
                  <span className="font-weight-bold">{item.name}</span><br/>
                  Topping : 
                  {item.topping.map((i, k)=>(
                    <span key={k}>{i.name},</span>
                  ))}<br/>
                  <span>Quantity : {item.quantity}</span>
                  
                </div>
              </div>
            ))}
          </div>
          <div className="col-4">
            <span>Tên khách hàng : {items.user.name}</span><br/>
            <span>Số điện thoại : {items.user.phone}</span><br/>
            <span>Địa chỉ: {items.building.name}, {items.classroom.name}</span><br/>
            <span>Trạng thái đơn hàng: {items.status}</span><br/>
            <span>Phương thức thanh toán: {items.payment}</span><br/>
          </div>
          <div className="col-2">
            <Link to={`/admin/orders/${items.id}`} className="btn btn-warning">update</Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default  OrderScreenAuth
    ;
