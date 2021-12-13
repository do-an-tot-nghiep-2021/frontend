import { alluser } from "../../../../Api/user"
import { useState, useEffect } from "react";
import { TokenAccount, SetUser } from '../../../../hooks/useAccount';
import ListUserScreen from "../../screens/user/list";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ListUserComponent = () => {
    const [users, setUsers] = useState([]);
    const [roleUser, setRoleUser] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    useEffect(() => {
        const getUsers = async () => {
            const newData = {
                token: TokenAccount.getToken(),
                user: SetUser.getUser(),
                role: roleUser
            }
            try {
                const { data } = await alluser(newData)
                setPages(Math.ceil(data.length / perPage))
                const items = data.slice(page * perPage, (page + 1) * perPage);
                setUsers(items)
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
    }, [page, roleUser]);

    const handlePageClick = (event) => {
        let page = event.selected;
        setPage(page)
    }

    const handleSelect = (e) => {
        setRoleUser(e.target.value);
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
                                    <span className="m-nav__link-text">Tài khoản</span>
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
                                        <div class="dataTables_length" >
                                            <select class="custom-select custom-select-sm form-control form-control-sm" style={{width : '60px'}} onChange={handleSelect}>
                                                <option value="0">Tất cả</option>
                                                <option value="1">User</option>
                                                <option value="10">Admin</option>
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
                                        {/* <CreateTypeScreen /> */}
                                        <table className="table m-table m-table--head-separator-danger">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Tài khoản</th>
                                                    <th scope="col">Tên khách hàng</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Số điện thoại</th>
                                                    <th scope="col">Quyền hạn</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <ListUserScreen data={users} />
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
    )
}

export default ListUserComponent
