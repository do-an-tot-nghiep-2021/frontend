import { useEffect, useState } from "react";
import { allvoucher, remotevoucher } from "../../../../Api/voucher";
import { Link } from "react-router-dom";
import VoucherScreenAuth from "../../screens/voucher/list";
import Swal from "sweetalert2";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";
import CreateVoucherScreen from "../../screens/voucher/create";

const ListVoucherComponent = () => {
  const [Vouchers, setVoucher] = useState([]);
  console.log(Vouchers);
  useEffect(() => {
    const getVoucher = async () => {
      try {
        const { data } = await allvoucher();
        setVoucher(data);
      } catch (error) {
        console.log(error);
      }
    };
    getVoucher();
  }, []);
  const onHandleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Bạn có muốn xóa voucher này không??",
        showCancelButton: true,
        confirmButtonText: "Xóa!!",
      }).then((result) => {
        if (result.isConfirmed) {
          const item = {
            id: id,
            token: TokenAccount.getToken(),
            user: SetUser.getUser(),
          };
          remotevoucher(item);
          const newVoucher = Vouchers.filter((item) => item.id !== id);
          Swal.fire("Thành Công!!!", "", "success");
          setVoucher(newVoucher);
        }
      });
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
                    <CreateVoucherScreen />
                    <table className="table m-table m-table--head-separator-danger">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name </th>
                          <th>Point</th>
                          <th>Value</th>
                          <th width="100">
                            <i className="flaticon-settings-1"></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <VoucherScreenAuth
                          data={Vouchers}
                          onDelete={onHandleDelete}
                        />
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
export default ListVoucherComponent;
