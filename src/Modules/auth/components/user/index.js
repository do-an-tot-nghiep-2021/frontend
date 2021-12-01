import { alluser } from "../../../../Api/user"
import { useState, useEffect } from "react";
import { TokenAccount, SetUser } from '../../../../hooks/useAccount';
import ListUserScreen from "../../screens/user/list";
import { Link } from "react-router-dom";

const ListUserComponent = () => {
    const [users, setUsers] = useState([]);
    const [roleUser, setRoleUser] = useState(0);
    useEffect(() => {
        const getUsers = async () => {
            const data = {
                token: TokenAccount.getToken(),
                user: SetUser.getUser(),
                role: roleUser
            }
            try {
                const users = await alluser(data).then(Response => {
                    setUsers(Response.data);
                });
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
    }, [roleUser]);

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
                                        <button className="btn btn-primary m-2" onClick={() => setRoleUser(10)}>Admin</button>
                                        <button className="btn btn-primary m-2" onClick={() => setRoleUser(1)}>User</button>
                                    </div>
                                    <div className="m-portlet__head-tools">
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
                                                    <th width="100"><i className="flaticon-settings-1"></i></th>
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
