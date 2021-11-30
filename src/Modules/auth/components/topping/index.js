import { useEffect, useState, useCallback } from "react";
import { alltopping, removetopping } from "../../../../Api/topping";
import { Link } from "react-router-dom";
import ToppingScreenAuth from "../../screens/topping/list";
import Swal from "sweetalert2";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";
import CreateToppingScreen from "../../screens/topping/create";

const ListToppingComponent = () => {
  const [Toppings, setToppings] = useState([]);
  useEffect(() => {
    const getToppings = async () => {
      try {
        const { data } = await alltopping();
        setToppings(data);
      } catch (error) {
        console.log(error);
      }
    };
    getToppings();
  }, []);
  const refresh = useCallback(() => {
    const getToppings = async () => {
      try {
        const { data } = await alltopping();
        setToppings(data);
      } catch (error) {
        console.log(error);
      }
    };
    getToppings();
  }, [])

  const onHandleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Bạn có muốn xóa topping này?',
        showCancelButton: true,
        confirmButtonText: 'Xóa!',
      }).then((result) => {
        if (result.isConfirmed) {
          const item = {
            id: id,
            token: TokenAccount.getToken(),
            user: SetUser.getUser()
          }
          removetopping(item)
          const newToppings = Toppings.filter((items) => items.id !== id);
          Swal.fire('Thành công!', '', 'success')
          setToppings(newToppings);

        }
      })
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
                  <span className="m-nav__link-text">Lớp học</span>
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
            {/*begin::Portlet*/}
            <div className="m-portlet">
              <div className="m-portlet__body">
                <div className="m-section">
                  <div className="m-section__content">
                    <CreateToppingScreen />
                    <button className="btn btn-warning ml-2" onClick={refresh}><i className="flaticon-refresh"></i> Refesh</button>
                    <table className="table m-table m-table--head-separator-danger">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên topping</th>
                          <th>Giá</th>
                          <th>Trạng thái</th>
                          <th width="100"><i className="flaticon-settings-1"></i></th>
                        </tr>
                      </thead>
                      <tbody>
                        <ToppingScreenAuth data={Toppings} onDelete={onHandleDelete} />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Link to="/admin/toppings/create" className="btn btn-primary mb-2">
        Create
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col" width="150">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <ToppingScreenAuth data={Toppings} onDelete={onHandleDelete} />
        </tbody>
      </table> */}
    </>
  );
};
export default ListToppingComponent;
