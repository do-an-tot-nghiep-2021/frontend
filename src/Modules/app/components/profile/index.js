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
                title: 'B???n c?? mu???n thay ?????i profile?',
                showCancelButton: true,
                confirmButtonText: 'c???p nh???t!',
            }).then((result) => {
                if (result.isConfirmed) {
                    editprofile(newData).then((response) => {
                        if (!response.data.status) {
                            Swal.fire(response.data.message, '', 'error')
                        }
                        if (response.data.status) {
                            Swal.fire('Th??nh c??ng!', '', 'success')
                            SetUserGoogle.saveRefreshUserGoogle(response.data.user)
                            window.location.reload();
                        }
                    })
                }
            })
        } catch (error) {
            Swal.fire("Kh??ng th??? g???i request", '', 'error')
        }
    }
    return (
        <>
            <section className="breadcrumb-nav">
                <div className="container">
                    <div className="breadcrumb-nav-inner">
                        <ul>
                            <li><Link to="/">Trang ch???</Link></li>
                            <li><a>T??i kho???n</a></li>
                            <li className="active"><a >H??? s??</a></li>
                        </ul>
                        <label className="now">H??? S??</label>
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
                                                <h5>H??? S?? C?? NH??N</h5>
                                                <input type="hidden" {...register("google_id")} />
                                                <input type="hidden" {...register("id")} />
                                                <div className="row">
                                                    <div className="form-group col-12">
                                                        <label htmlFor="exampleFormControlInput1">T??n ????ng k??  <span className="text-danger" style={{ fontSize: '20px' }}>*</span></label>
                                                        <input type="text" className="form-control" {...register("name", { required: true,maxLength:25, pattern: /^[^!@#$%~`^&*()_+\-=\[\]{};':"\\|.,<>\/?]*$/ })} />
                                                        {errors.name?.type === "required" && (
                                                            <span className="d-block text-danger">
                                                                Kh??ng ???????c ????? tr???ng tr?????ng n??y!
                                                            </span>
                                                        )}
                                                        {errors.name?.type === "maxLength" &&
                                                            <span className=" text-danger m-form__help">
                                                                T???i ??a 25 k?? t???.
                                                            </span>
                                                        }
                                                        {errors.name?.type === "pattern" &&
                                                            <span className=" text-danger m-form__help">
                                                                T??n kh??ng ch???a k?? t??? ????c bi???t.
                                                            </span>
                                                        }
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label htmlFor="exampleFormControlInput1">?????a ch??? email  <span className="text-danger" style={{ fontSize: '20px' }}>*</span></label>
                                                        <input type="email" className="form-control" {...register("email")} readOnly />
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label htmlFor="exampleFormControlInput1">S??? ??i???n tho???i  <span className="text-danger" style={{ fontSize: '20px' }}>*</span></label>
                                                        <input type="text" className="form-control" {...register("phone", { required: true, pattern: /((09|03|07|08|06|05)+([0-9]{8})\b)/g })}  />
                                                        {errors.phone?.type === "required" && (
                                                            <span className="d-block text-danger">
                                                                Kh??ng ???????c ????? tr???ng tr?????ng n??y!
                                                            </span>
                                                        )}
                                                        {errors.phone?.type === "pattern" &&
                                                            <span className=" text-danger m-form__help">
                                                                S??? ??i???n tho???i kh??ng ????ng ?????nh d???ng.
                                                            </span>
                                                        }
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn-large filter-btn" style={{ border: 'none' }}>C???p nh???t</button>
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
                                                    <span className="font-weight-bold">T??ch ??i???m : </span><NumberFormat value={userProfile.point} displayType={'text'} thousandSeparator={true} />
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
                            <p>B???n ch??a ????ng nh???p! <br /> B??y gi???, h??y ????ng nh???p t??i kho???n google c???a b???n ????? mua ????? u???ng t???i BeeCoffee nh??.</p>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default ProfileComponentApp
