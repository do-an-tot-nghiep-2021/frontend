import { useEffect, useState, useCallback } from "react";
import { alltype, removetype } from "../../../../Api/types";
import { Link } from "react-router-dom";
import TypesScreenAuth from "../../screens/types/list";
import Swal from "sweetalert2";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";
import ReactPaginate from "react-paginate";
import CreateTypeScreen from "../../screens/types/create";

const ListTypesComponent = () => {
  const [Types, setTypes] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);


  useEffect(() => {
    const getTypes = async () => {
      try {
        const { data } = await alltype();
        setPages(Math.ceil(data.length / perPage))
        const items = data.slice(page * perPage, (page + 1) * perPage);
        setTypes(items)
      } catch (error) {
        console.log(error);
      }
    };
    getTypes();
  }, [page]);

  const refresh = useCallback(() => {
    const getTypes = async () => {
      try {
        const { data } = await alltype();
        setPages(Math.ceil(data.length / perPage))
        const items = data.slice(page * perPage, (page + 1) * perPage);
        setTypes(items)
      } catch (error) {
        console.log(error);
      }
    };
    getTypes();
  }, [page])

  const handlePageClick = (event) => {
    let page = event.selected;
    setPage(page)
  }

  const onHandleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Bạn có muốn xóa thuộc tính này?',
        showCancelButton: true,
        confirmButtonText: 'Xóa!',
      }).then((result) => {
        if (result.isConfirmed) {
          const item = {
            id: id,
            token: TokenAccount.getToken(),
            user: SetUser.getUser()
          }
          removetype(item);
          const newTypes = Types.filter((items) => items.id !== id);
          Swal.fire('Thành công!', '', 'success')
          setTypes(newTypes);
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
                  <span className="m-nav__link-text">Thuộc tính</span>
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
                    <CreateTypeScreen />
                    <button className="btn btn-warning ml-2" onClick={refresh}><i className="flaticon-refresh"></i> Refesh</button>
                  </div>
                  <div className="m-portlet__head-tools">
                  </div>
                </div>
              </div>
              <div className="m-portlet__body">
                <div className="m-section">
                  <div className="m-section__content">
                    <table className="table m-table m-table--head-separator-danger">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên Thuộc tính</th>
                          <th width="100"><i className="flaticon-settings-1"></i></th>
                        </tr>
                      </thead>
                      <tbody>
                        <TypesScreenAuth data={Types} onDelete={onHandleDelete} />
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
export default ListTypesComponent;
