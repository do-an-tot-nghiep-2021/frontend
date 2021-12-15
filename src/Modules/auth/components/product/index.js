import { useEffect, useState, useCallback } from "react";
import { allproduct, removeproduct } from "../../../../Api/product";
import ListProductScreen from "../../screens/product/list";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import CreateProductScreen from "../../screens/product/create";
import { SetUser, TokenAccount } from "../../../../hooks/useAccount";
import Swal from "sweetalert2";

const ListProductComponent = () => {
  const [Products, setProducts] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await allproduct();
        setPages(Math.ceil(data.length / perPage))
        const items = data.slice(page * perPage, (page + 1) * perPage);
        setProducts(items);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [page]);

  const handlePageClick = (event) => {
    let page = event.selected;
    setPage(page)
  }

  const refresh = useCallback(() => {
    const getProducts = async () => {
      try {
        const { data } = await allproduct()
        setPages(Math.ceil(data.length / perPage))
        const items = data.slice(page * perPage, (page + 1) * perPage);
        setProducts(items)
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [page])
  const onHandleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Bạn có muốn xóa sản phẩm này?',
        showCancelButton: true,
        confirmButtonText: 'Xóa!',
      }).then((result) => {
        if (result.isConfirmed) {
          const item = {
            id: id,
            token: TokenAccount.getToken(),
            user: SetUser.getUser()
          }
          removeproduct(item)
          const newProducts = Products.filter((item) => item.id !== id);
          Swal.fire('Thành công!', '', 'success')
          setProducts(newProducts);
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
                  <span className="m-nav__link-text">Sản phẩm</span>
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
                    <CreateProductScreen onRefeshData={refresh} />
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
                          <th scope="col">#</th>
                          <th scope="col">Sản phẩm</th>
                          <th scope="col">Tên sản phẩm</th>
                          <th scope="col">Giá</th>
                          <th scope="col">Danh mục sản phẩm</th>
                          <th scope="col text-center">Topping&Types</th>
                          <th width="100"><i className="flaticon-settings-1"></i></th>
                        </tr>
                      </thead>
                      <tbody>
                        <ListProductScreen data={Products} onDelete={onHandleDelete} />
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
export default ListProductComponent;
