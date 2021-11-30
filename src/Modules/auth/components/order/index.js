import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allorder, removeorder } from "../../../../Api/order";
import OrderScreenAuth from "../../screens/order/list";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";

const ListOrderComponent = () => {
  const [Orders, setOrders] = useState([]);
  useEffect(async () => {
    if (SetUser.getUser()) {
      const data = {
        token: TokenAccount.getToken(),
        user: SetUser.getUser(),
      }
      console.log(data)
      const respons = await allorder(data);
      setOrders(respons.data)
    }
  }, []);

  const onHandleDelete = async (id) => {
    try {
      await removeorder(id);
      const newOrders = Orders.filter((items) => items.id !== id);
      setOrders(newOrders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="m-subheader">
        <div className="d-flex align-items-center">
          <div className="mr-auto">
            <ul className="m-subheader__breadcrumbs m-nav m-nav--inline">
              <li className="m-nav__item m-nav__item--home">
                <Link to="/admin" className="m-nav__link m-nav__link--icon">
                  <i className="m-nav__link-icon la la-home" />
                </Link>
              </li>
              <li className="m-nav__separator">-</li>
              <li className="m-nav__item">
                <a href className="m-nav__link">
                  <span className="m-nav__link-text">Đơn hàng</span>
                </a>
              </li>
              <li className="m-nav__separator">-</li>
              <li className="m-nav__item">
                <a href className="m-nav__link">
                  <span className="m-nav__link-text">danh sách</span>
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>
      <div className="m-content">
        <div className="row">
          <div className="col-xl-12">
            <div className="m-portlet">
              <div className="m-portlet__body">
                <div className="m-section">
                  <div className="m-section__content">
                    <table className="table m-table m-table--head-separator-danger">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên khách hàng</th>
                          <th>Số điện thoại</th>
                          <th>Địa chỉ đặt hàng</th>
                          <th>Trạng thái</th>
                          <th>Chi tiết</th>
                          <th><i className="flaticon-settings-1"></i></th>
                        </tr>
                      </thead>
                      <tbody>
                        <OrderScreenAuth data={Orders} onDelete={onHandleDelete} />
                      </tbody>
                    </table>
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
export default ListOrderComponent;
