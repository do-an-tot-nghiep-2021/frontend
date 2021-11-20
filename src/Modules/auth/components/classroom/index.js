import React from 'react'
import { useState, useEffect } from "react";
import { allclass, removeclass } from "../../../../Api/classroom";
import { Link } from "react-router-dom";
import ClassroomScreenAuth from '../../screens/classroom/list';
import Swal from 'sweetalert2';
import { TokenAccount, SetUser } from '../../../../hooks/useAccount';
import ReactPaginate from "react-paginate";


const ClassroomListAuth = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    useEffect(() => {
        const getClassroom = async () => {
            try {
                const { data } = await allclass();
                setPages(Math.ceil(data.length / perPage ))
                const items = data.slice(page * perPage, (page + 1) * perPage);
                setClassrooms(items)

            } catch (error) {
                console.log(error);
            }
        }
        getClassroom();
    }, [page]);
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
            <Link to="/admin/classroom/create" className="btn btn-primary mb-2">
                Create
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Building</th>
                        <th scope="col" width="200">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>

                    <ClassroomScreenAuth data={classrooms} onDelete={onHandleDelete} />
                </tbody>
            </table>
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
        </>
    )
}

export default ClassroomListAuth;
