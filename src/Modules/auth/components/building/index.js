import React from 'react'
import { useState, useEffect, useCallback } from "react";
import { allbuilding, removebuilding } from "../../../../Api/building";
import { Link } from "react-router-dom";
import BuildingScreenAuth from '../../screens/building/list';
import Swal from 'sweetalert2';
import { TokenAccount, SetUser } from '../../../../hooks/useAccount';
import CreateBuildingScreen from '../../screens/building/create';

const BuildingListAuth = () => {
    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        const getBuildings = async () => {
            try {
                const { data } = await allbuilding();
                setBuildings(data);

            } catch (error) {
                console.log(error);
            }
        }
        getBuildings();
    }, []);

    const refresh = useCallback(() => {
        const getBuildings = async () => {
            try {
                const { data } = await allbuilding();
                setBuildings(data);
            } catch (error) {
                console.log(error);
            }
        };
        getBuildings();
    }, [])

    const onHandleDelete = async (id) => {
        try {
            Swal.fire({
                title: 'Bạn có muốn xóa building này?',
                showCancelButton: true,
                confirmButtonText: 'Xóa!',
            }).then((result) => {
                if (result.isConfirmed) {
                    const item = {
                        id: id,
                        token: TokenAccount.getToken(),
                        user: SetUser.getUser()
                    }
                    removebuilding(item)
                    const newbuildings = buildings.filter(item => item.id !== id)
                    Swal.fire('Thành công!', '', 'success')
                    setBuildings(newbuildings);

                }
            })
        } catch (error) {
            console.log(error)
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
                                    <span className="m-nav__link-text">Tòa</span>
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
                                        <CreateBuildingScreen onRefeshData={refresh} />
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
                                                    <th>Tên tòa</th>
                                                    <th width="100"><i className="flaticon-settings-1"></i></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <BuildingScreenAuth data={buildings} onDelete={onHandleDelete}  />
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

export default BuildingListAuth;
