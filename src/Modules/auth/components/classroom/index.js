import React from 'react'
import { useState, useEffect, useCallback } from "react";
import { allclass, removeclass } from "../../../../Api/classroom";
import { Link } from "react-router-dom";
import ClassroomScreenAuth from '../../screens/classroom/list';
import Swal from 'sweetalert2';
import { TokenAccount, SetUser } from '../../../../hooks/useAccount';
import ReactPaginate from "react-paginate";
import '../../../../Layouts/auth/assets/vendors/custom/datatables/datatables.bundle.css';
import CreateClassroomScreen from '../../screens/classroom/create';


const ClassroomListAuth = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    useEffect(() => {
        const getClassroom = async () => {
            try {
                const { data } = await allclass();
                setPages(Math.ceil(data.length / perPage))
                const items = data.slice(page * perPage, (page + 1) * perPage);
                setClassrooms(items)

            } catch (error) {
                console.log(error);
            }
        }
        getClassroom();
    }, [page]);

    const refresh = useCallback(() => {
        const getClassroom = async () => {
            try {
                const { data } = await allclass();
                setPages(Math.ceil(data.length / perPage))
                const items = data.slice(page * perPage, (page + 1) * perPage);
                setClassrooms(items)

            } catch (error) {
                console.log(error);
            }
        }
        getClassroom();
      }, [page])
    const handlePageClick = (event) => {
        let page = event.selected;
        setPage(page)
    }
    const onHandleDelete = async (id) => {
        try {
            Swal.fire({
                title: 'Bạn có muốn xóa class này?',
                showCancelButton: true,
                confirmButtonText: 'Xóa!',
            }).then((result) => {
                if (result.isConfirmed) {
                    const item = {
                        id: id,
                        token: TokenAccount.getToken(),
                        user: SetUser.getUser()
                    }
                    removeclass(item)
                    const newClassroom = classrooms.filter(item => item.id !== id)
                    Swal.fire('Thành công!', '', 'success')
                    setClassrooms(newClassroom);

                }
            })
        } catch (error) {

        }
    }
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
                                        <CreateClassroomScreen />
                                        <button className="btn btn-warning ml-2" onClick={refresh}><i className="flaticon-refresh"></i> Refesh</button>
                                        <table className="table m-table m-table--head-separator-danger">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên phòng</th>
                                                    <th>Tòa</th>
                                                    <th width="100"><i className="flaticon-settings-1"></i></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <ClassroomScreenAuth data={classrooms} onDelete={onHandleDelete} />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8"></div>
                                <div className="col-4">
                                    <ReactPaginate
                                        previousLabel={'<'}
                                        nextLabel={'>'}
                                        pageCount={pages}
                                        onPageChange={handlePageClick}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ClassroomListAuth;
