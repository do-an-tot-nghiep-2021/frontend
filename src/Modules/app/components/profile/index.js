import React, { useState, useEffect } from 'react';
import { SetUserGoogle } from "../../../../hooks/useAccount"
import NavProfile from "../../../../Layouts/app/component/nav-profile"
import { editprofile, getprofileidgoogle } from "../../../../Api/user"
import { useForm } from "react-hook-form"
import useUpload from "../../../../hooks/upload/useUpload"
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const ProfileComponentApp = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [preview, setPreview] = useState('');
    const [userProfile, setUserProfile] = useState([]);
    const { loading, handleUpload } = useUpload();


    useEffect(async () => {
        if (SetUserGoogle.getUserGoogle()) {
            const newItems = {
                google_id: SetUserGoogle.getUserGoogle().google_id,
                id: SetUserGoogle.getUserGoogle().id
            }
            const respons = await getprofileidgoogle(newItems);
            const userGoogle = respons.data;
            setUserProfile(userGoogle)
            if (userGoogle.image) {
                setPreview(userGoogle.image);
            }
            reset(userGoogle);
        }

    }, []);

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
                        src={preview} className="mt-2"
                        style={{ width: "100%", borderRadius: "100px" }}
                    />
                </div>
            );
        }
        return null;
    }

    const onSubmit = async (data) => {
        const newData = {
            id: data.id,
            name: data.name,
            google_id: data.google_id,
            phone: data.phone
        }
        if (preview) {
            newData.image = preview;
        }
        console.log(newData)
        try {
            Swal.fire({
                title: 'Bạn có muốn thay đổi profile?',
                showCancelButton: true,
                confirmButtonText: 'cập nhật!',
            }).then((result) => {
                if (result.isConfirmed) {
                    editprofile(newData).then((response) => {
                        if (!response.data.status) {
                            Swal.fire(response.data.message, '', 'error')
                        }
                        if (response.data.status) {
                            Swal.fire('Thành công!', '', 'success')
                            SetUserGoogle.saveRefreshUserGoogle(response.data.user)
                            window.location.reload();
                        }
                    })
                }
            })
        } catch (error) {
            Swal.fire("Không thể gửi request", '', 'error')
        }
    }
    return (
        <>
            <section className="breadcrumb-nav">
                <div className="container">
                    <div className="breadcrumb-nav-inner">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li><a>Tài khoản</a></li>
                            <li className="active"><a >Hồ sơ</a></li>
                        </ul>
                        <label className="now">HỒ SƠ</label>
                    </div>
                </div>
            </section>

            {SetUserGoogle.getUserGoogle() ?
                <section class="default-section shop-checkout bg-grey">
                    <div class="container">
                        <div className="row">
                            <NavProfile />
                            <div class="col-md-9 col-sm-9 col-xs-12 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                                <div class="shop-checkout-right">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row" >
                                            <div className="col-9">
                                                <h5>HỒ SƠ CÁ NHÂN</h5>
                                                <input type="hidden" {...register("google_id")} />
                                                <input type="hidden" {...register("id")} />
                                                <div className="row">
                                                    <div className="form-group col-12">
                                                        <label htmlFor="exampleFormControlInput1">Tên đăng ký  <span className="text-danger" style={{ fontSize: '20px' }}>*</span></label>
                                                        <input type="text" className="form-control" {...register("name", { required: true, pattern: /^[^!@#$%~`^&*()_+\-=\[\]{};':"\\|.,<>\/?]*$/ })} />
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
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label htmlFor="exampleFormControlInput1">Địa chỉ email  <span className="text-danger" style={{ fontSize: '20px' }}>*</span></label>
                                                        <input type="email" className="form-control" {...register("email")} readOnly />
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label htmlFor="exampleFormControlInput1">Số điện thoại  <span className="text-danger" style={{ fontSize: '20px' }}>*</span></label><input type="text" className="form-control" {...register("phone", { required: true, pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g })} />
                                                        {errors.phone?.type === "required" && (
                                                            <span className="d-block text-danger mt-3">
                                                                Không được để trống trường này!
                                                            </span>
                                                        )}
                                                        {errors.phone?.type === "pattern" &&
                                                            <span className=" text-danger m-form__help">
                                                                Số điện thoại không đúng định dạng.
                                                            </span>
                                                        }

                                                    </div>
                                                </div>
                                                <button type="submit" className="btn-large filter-btn" style={{ border: 'none' }}>Cập nhật</button>
                                            </div>
                                            <div className="col-3">
                                                {renderPreview()}
                                                <div>
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
                                                </div>
                                                <div className="text-center mt-2">
                                                    <span className="font-weight-bold">Tích điểm : </span><NumberFormat value={userProfile.point} displayType={'text'} thousandSeparator={true} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <section className="default-section shop-cart bg-grey">
                    <div className="container">
                        <div className="order-complete-box wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                            <img src="https://cdn.tecotecshop.com/assets/img/no-cart.png" style={{ width: "400px", height: "300px" }} alt="" />
                            <p>Bạn chưa đăng nhập! <br /> Bây giờ, hãy đăng nhập tài khoản google của bạn để mua đồ uống tại BeeCoffee nhé.</p>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default ProfileComponentApp
