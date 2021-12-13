import { SetResetEmail } from "../../../hooks/useAccount"
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { resetpass } from "../../../Api/account";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const ConfirmCodeAuth = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const history = useHistory()
    const onSubmit = async (data) => {
        const newData = {
            email : SetResetEmail.getResetEmail(),
            token : data.code,
            password : data.pass
        }
        console.log(newData)
        try {
            await resetpass(newData).then((response) => {
                if (!response.data.status) {
                    Swal.fire(response.data.message, '', 'error')
                }
                if (response.data.status) {
                    Swal.fire("Đổi mật khẩu thành công", '', 'success')
                    SetResetEmail.removeResetEmail()
                    history.push("/login/account")
                }
            });
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Lỗi gửi request',
              })
        }
    }
    return (
        <>
            {(SetResetEmail.getResetEmail()) ?
                <div className="oxyy-login-register" style={{ fontFamily: 'Quicksand' }}>
                    <div className="container-fluid px-0">
                        <div className="row g-0 min-vh-100">
                            
                            <div className="col-md-4">
                                <div className="hero-wrap d-flex align-items-center h-100">
                                    <div className="hero-mask opacity-5 bg-dark" />
                                    <div className="hero-bg hero-bg-scroll" style={{ backgroundImage: 'url("http://dev-backend.tk/backgroudform.jpg")' }} />
                                    <div className="hero-content mx-auto w-100 h-100">
                                        <div className="container d-flex flex-column h-100">
                                            <div className="row g-0">
                                                <div className="col-11 col-lg-9 mx-auto">
                                                    <div className="logo mt-5 mb-5">
                                                        <a className="d-flex" href="/" title="BeeCoffee">
                                                            <img src={process.env.PUBLIC_URL + '/text-logo-footer.png'} width="145" alt="BeeCoffee" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-0 mt-3">
                                                <div className="col-11 col-lg-9 mx-auto">
                                                    <h1 className="text-9 text-white fw-300 mb-5">
                                                        <span className="fw-500">Chào mừng bạn</span>, Đến với trang quản lý của BeeCoffee!</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             
                            <div className="col-md-8 d-flex flex-column align-items-center bg-dark">
                                <div className="container my-auto py-5">
                                    <div className="row g-0">
                                        <div className="col-11 col-md-8 col-lg-7 col-xl-6 mx-auto">
                                            <h2 className="text-white mb-4">Quên mật khẩu</h2>

                                            <form className="form-dark" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="mb-3">
                                                    <label className="form-label text-light" htmlFor="emailAddress">Nhập mã code mà bạn nhận được trong email</label>
                                                    <input type="text" className="form-control" {...register("code", { required: true })} required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label text-light" htmlFor="emailAddress">Nhập mật khẩu mới</label>
                                                    <input type="text" className="form-control" {...register("pass", { required: true })} required/>
                                                </div>
                                                <button type="submit" className="btn btn-primary my-2" style={{ fontSize: "14px" }} type="submit">Reset mật khẩu</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                :
                <Redirect to={{ pathname: "/forgot-password/account" }} />
            }

        </>
    )
}

export default ConfirmCodeAuth
