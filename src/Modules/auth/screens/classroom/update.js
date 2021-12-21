import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { updateclass, showclass } from '../../../../Api/classroom';
import { allbuilding } from '../../../../Api/building';
import { TokenAccount, SetUser } from '../../../../hooks/useAccount';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateClassroomScreen = () => {
    const { id } = useParams();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
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

    const onSubmit = async (data) => {
        const newData = {
            token: TokenAccount.getToken(),
            user: SetUser.getUser(),
            ...data
        }
        try {
            Swal.fire({
                title: 'Bạn có muốn thay đổi phòng?',
                showCancelButton: true,
                confirmButtonText: 'cập nhật!',
            }).then((result) => {
                if (result.isConfirmed) {
                    updateclass(newData).then((response) => {
                        if (!response.data.status) {
                            Swal.fire(response.data.message, '', 'error')
                        }
                        if (response.data.status) {
                            Swal.fire('Thành công!', '', 'success')
                        }

                    })

                }
            })

        } catch (error) {
            Swal.fire("Không thể gửi request", '', 'error')
        }
    }

    useEffect(async () => {
        const respons = await showclass(id);
        const classroom = respons.data;
        reset(classroom);
    }, [id]);

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
                                    <span className="m-nav__link-text">Phòng</span>
                                </a>
                            </li>
                            <li className="m-nav__separator">-</li>
                            <li className="m-nav__item">
                                <a href className="m-nav__link">
                                    <span className="m-nav__link-text">cập nhật</span>
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
                            <div className="m-portlet__body">
                                <div className="m-section">
                                    <div className="m-section__content">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-5">
                                                <label className="form-label">Tên phòng</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="form-control m-input"
                                                    placeholder="vd: p101, p102, L101,...."
                                                    {...register("name", { required: true, minLength: 3,maxLength:25, pattern: /^[^!@#$%~`^&*()_+\-=\[\]{};':"\\|.,<>\/?]*$/ })}
                                                />
                                                {errors.name?.type === "required" && (
                                                    <span className="d-block text-danger mt-3">
                                                        Không được để trống trường này!
                                                    </span>
                                                )}
                                                {errors.name?.type === "pattern" &&
                                                    <span className=" text-danger m-form__help">
                                                        Tên phòng học không chứa ký tự đăc biệt.
                                                    </span>
                                                }
                                                {errors.name?.type === "minLength" &&
                                                    <span className=" text-danger m-form__help">
                                                        Tên phòng học phải lớn hơn 3 ký tự.
                                                    </span>
                                                }
                                                {errors.name?.type === "maxLength" &&
                                                    <span className=" text-danger m-form__help">
                                                        Nhập tối đa 25 ký tự.
                                                    </span>
                                                }
                                            </div>
                                            <div className="mb-5">
                                                <label className="form-label">Tòa</label>
                                                <select
                                                    className="form-control"
                                                    {...register("building_id", {required:true})}
                                                >
                                                    <option value="">Chọn tòa nhà</option>
                                                    {buildings.map((item, index) => (
                                                        <option value={item.id} key={index}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.building_id && (
                                                    <span className="d-block text-danger">
                                                        Không được để trống trường này!
                                                    </span>
                                                )}
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                Cập nhật
                                            </button>
                                        </form>
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

export default UpdateClassroomScreen;
