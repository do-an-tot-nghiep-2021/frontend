import React, { useState, useEffect } from 'react';
import { SetUserGoogle } from "../../../../hooks/useAccount"
import NavProfile from "../../../../Layouts/app/component/nav-profile"
import { editprofile, getprofileidgoogle } from "../../../../Api/user"
import { useForm } from "react-hook-form"
import useUpload from "../../../../hooks/upload/useUpload"
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2';

const ProfileComponentApp = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [preview, setPreview] = useState('');
    const { loading, handleUpload } = useUpload();

    useEffect(async () => {
        if (SetUserGoogle.getUserGoogle()) {
            const newItems = {
                google_id : SetUserGoogle.getUserGoogle().google_id,
                id: SetUserGoogle.getUserGoogle().id
            }
            const respons = await getprofileidgoogle(newItems);
            const userGoogle = respons.data;
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
                        style={{width : "100%", borderRadius : "100px"}}
                    />
                </div>
            );
        }
        return null;
    }

    const onSubmit = async (data) => {
        const newData = {
            id : data.id,
            name: data.name, 
            google_id : data.google_id,
            phone : data.phone
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
        {SetUserGoogle.getUserGoogle() ?
            <div className="row">
                <NavProfile />
                <div className="col-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row" >
                            <div className="col-10">
                                <h3>Ho so</h3>
                                <input type="hidden" {...register("google_id")} />
                                <input type="hidden" {...register("id")} />
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Ten dang nhap</label>
                                    <input type="text" className="form-control" {...register("name", { required: true })} />
                                    {errors.name && <span className="text-danger">Khong de trong truong nay</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Email address</label>
                                    <input type="email" className="form-control" {...register("email")} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">So dien thoai</label>
                                    <input type="text" className="form-control" {...register("phone", { required: true })} required="" />
                                    {errors.phone && <span className="text-danger">Khong de trong truong nay</span>}
                                </div>

                                <button type="submit" className="btn btn-primary mt-2">Cập nhật</button>
                            </div>
                            <div className="col-2">
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
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            : <p className="text-danger text-center">Bạn chưa đăng nhập hãy đăng nhập</p> }
        </>
    )
}

export default ProfileComponentApp
