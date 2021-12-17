import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { allorder, removeorder } from "../../../../Api/order";
import OrderScreenAuth from "../../screens/order/list";
import ReactPaginate from "react-paginate";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";

const ListOrderComponent = () => {
  const [Orders, setOrders] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [keySearch, setKeySearch] = useState('');
  const [date, setDate] = useState(0);
  const [status, setStatus] = useState(0);
  useEffect(() => {
    const getOrders = async () => {
      const newData = {
        token: TokenAccount.getToken(),
        user: SetUser.getUser(),
        keyword : keySearch,
        status : status,
        date : date
      }
      try {
        const { data } = await allorder(newData)
        setPages(Math.ceil(data.length / perPage))
        const items = data.slice(page * perPage, (page + 1) * perPage);
        setOrders(items)

      } catch (error) {
        console.log(error);
      }
    }
    getOrders();
  }, [page, keySearch, status, date]);
  
  const handlePageClick = (event) => {
    let page = event.selected;
    setPage(page)
  }
  const handleSelectDate = (e) => {
    setDate(e.target.value);
  }
  const handleSelectStatus = (e) => {
    setStatus(e.target.value);
  }
  const handleSearch = (e) => {
    setKeySearch(e.target.value)
  }
  const refresh = useCallback(() => {
    const getOrders = async () => {
      try {
        const newData = {
          token: TokenAccount.getToken(),
          user: SetUser.getUser(),
          keyword : keySearch,
          status : status,
          date : date
        }
        const {data} = await allorder(newData)
          setPages(Math.ceil(data.length / perPage))
          const items = data.slice(page * perPage, (page + 1) * perPage);
          setOrders(items)

      } catch (error) {
        console.log(error);
      }
    }
    getOrders();
  }, [page, keySearch, status, date])

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
              <div className="m-portlet m-portlet--mobile" style={{ marginBottom: 0 }}>
                <div className="m-portlet__head">
                  <div className="m-portlet__head-caption">

                  <div class="dataTables_length mr-3">
                      <input type="number" className="input-search-code" onChange={handleSearch} placeholder="Nhập mã code để tìm đơn hàng" />
                    </div>

                    <div class="dataTables_length mr-2" >
                      <select class="custom-select custom-select-sm form-control form-control-sm" defaultValue={0} style={{ width: '90px' }} onChange={handleSelectDate}>
                        <option value="0">Thời gian</option>
                        <option value="1">Hôm nay</option>
                        <option value="7">7 ngày qua</option>
                        <option value="30">30 ngày qua</option>
                        <option value="60">2 tháng trước</option>
                        <option value="90">3 tháng trước</option>
                        <option value="180">6 tháng trước</option>
                      </select>
                    </div>

                    <div class="dataTables_length" >
                      <select class="custom-select custom-select-sm form-control form-control-sm" defaultValue={0} style={{ width: '110px' }} onChange={handleSelectStatus}>
                        <option value="0">Trạng thái</option>
                        <option value="1">Chờ xử lý</option>
                        <option value="2">Chờ giao hàng</option>
                        <option value="3">Chờ vận chuyển</option>
                        <option value="4">Thành công</option>
                        <option value="5">Đã hủy</option>
                      </select>
                    </div>

                  </div>
                  <div className="m-portlet__head-tools">
                    <ReactPaginate
                      previousLabel={'Previous'}
                      nextLabel={'Next'}
                      pageCount={pages}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination-layout'}
                      pageClassName={'page-item-layout'}
                      previousClassName={'page-item-layout'}
                      nextClassName={'page-item-layout'}
                      pageLinkClassName={'page-link-layout'}
                      activeClassName={'active-page'}
                    />
                  </div>
                </div>
              </div>
              <div className="m-portlet__body">
                <div className="m-section">
                  <div className="m-section__content">
                    <table className="table m-table m-table--head-separator-danger">
                      <thead>
                        <tr>
                          <th>Mã đơn hàng</th>
                          <th>Tên khách hàng</th>
                          <th>Số điện thoại</th>
                          <th>Địa chỉ đặt hàng</th>
                          <th>Trạng thái</th>
                          <th>Thời gian</th>
                          <th>Chi tiết</th>
                          <th><i className="flaticon-settings-1"></i></th>
                        </tr>
                      </thead>
                      <tbody>
                        <OrderScreenAuth data={Orders} onRefeshData={refresh} />
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
