import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2';
import { showcategory, updatecategory } from "../../../../Api/category";
import useUpload from '../../../../hooks/upload/useUpload';
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";
import { Link } from 'react-router-dom';

const UpdateFormScreen = () => {
    let { id } = useParams()
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [preview, setPreview] = useState('');
    const { loading, handleUpload } = useUpload();

    const handleInputUploadChange = async (e) => {
        const file = e.target.files.length > 0 ? e.target.files[0] : null;
        if (file === null) {
            setPreview('');
            return;
        }
        const url = await handleUpload(file);
        setPreview(url);
    };

    const renderPreview = () => {
        if (loading) {
            return (
                <div className="form-group mb-2">
                    <ClipLoader color="#000000" size={35} />
                </div>
            )
        }
        if (preview !== '') {
            return (
                <div className="form-group mb-2">
                    <img
                        width="120"
                        src={preview} className="mt-2 rounded"
                    />
                </div>
            );
        }
        return null;
    }

    const onSubmit = async (data) => {
        const newData = {
            token: TokenAccount.getToken(),
            user: SetUser.getUser(),
            ...data
        }
        if (preview) {
            newData.image = preview;
        }
        try {
            Swal.fire({
                title: 'Bạn có muốn thay đổi thuộc tính?',
                showCancelButton: true,
                confirmButtonText: 'cập nhật!',
            }).then((result) => {
                if (result.isConfirmed) {
                    updatecategory(newData).then((response) => {
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
        const respons = await showcategory(id);
        const category = respons.data;
        if (category.image) {
            setPreview(category.image);
        }
        reset(category);
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
                                    <span className="m-nav__link-text">Danh mục sản phẩm</span>
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
                                            <div className="form-group mb-5">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter name"
                                                    {...register("name", { required: true, minLength: 3, pattern: /^[^!@#$%~`^&*()_+\-=\[\]{};':"\\|.,<>\/?]*$/ })}
                                                />
                                                {errors.name?.type === "required" && (
                                                    <span className="d-block text-danger mt-3">
                                                        Không được để trống trường này!
                                                    </span>
                                                )}
                                                {errors.name?.type === "pattern" &&
                                                    <span className=" text-danger m-form__help">
                                                        Tên danh mục không chứa ký tự đăc biệt.
                                                    </span>
                                                }
                                                {errors.name?.type === "minLength" &&
                                                    <span className=" text-danger m-form__help">
                                                        Tên danh mục phải lớn hơn 3 ký tự.
                                                    </span>
                                                }
                                            </div>
                                            <div className="form-group mb-5">
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        className="custom-file-input"
                                                        id="image"
                                                        accept="image/*"
                                                        onChange={handleInputUploadChange}
                                                    />

                                                    <label
                                                        className="custom-file-label"
                                                        htmlFor="image"
                                                    >
                                                        Choose image
                                                    </label>
                                                </div>
                                                {renderPreview()}
                                            </div>
                                            <button type="submit" className="btn btn-primary mt-2">Cập nhật</button>
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

export default UpdateFormScreen
