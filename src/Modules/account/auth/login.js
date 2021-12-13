import { login, getUser } from "../../../Api/account"
import { useForm } from "react-hook-form";
import { useHistory, Redirect } from "react-router";
import { TokenAccount, SetUser } from "../../../hooks/useAccount";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const LoginAuth = () => {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await login(data).then((user) => {
                TokenAccount.saveToken(user.data.token)
            });
            getUser(localStorage.getItem('token')).then((userToken) => {
                SetUser.saveUser(userToken.data)
                setTimeout(function () {
                    TokenAccount.removeToken()
                    SetUser.removeUser()
                    Swal.fire({
                        title: 'Tài khoản hết thời gian',
                        text: 'Vì lí do bảo mật nên mọi tài khoản sau 30 phút sẽ đăng nhập lại',
                        footer: '<a href="/login/account">Đăng nhập lại ngay?</a>'
                    })
                    history.push("/")
                }, 1200000);
                history.push("/admin")
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Tài khoản hoặc mật khẩu không chính xác',
              })
        }

    }

    return (
        <>
            {(!SetUser.getUser()) ?
                <div className="oxyy-login-register" style={{ fontFamily: 'Quicksand' }}>
                    <div className="container-fluid px-0">
                        <div className="row g-0 min-vh-100">
                            {/* Welcome Text
========================= */}
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
                            {/* Welcome Text End */}
                            {/* Login Form
========================= */}
                            <div className="col-md-8 d-flex flex-column align-items-center bg-dark">
                                <div className="container my-auto py-5">
                                    <div className="row g-0">
                                        <div className="col-11 col-md-8 col-lg-7 col-xl-6 mx-auto">
                                            <h2 className="text-white mb-4">Đăng nhập vào tài khoản của bạn</h2>

                                            <form className="form-dark" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="mb-3">
                                                    <label className="form-label text-light" htmlFor="emailAddress">Tài khoản</label>
                                                    <input type="email" className="form-control" required placeholder="@gmail.com" {...register("email", { required: true })} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label text-light" htmlFor="loginPassword" >Mật khẩu</label>
                                                    <Link className="float-end text-5" to="/forgot-password/account">Quên mật khẩu ?</Link>
                                                    <input type="password" className="form-control" required placeholder="********" {...register("password", { required: true })} />
                                                </div>
                                                <button type="submit" className="btn btn-primary my-2" style={{ fontSize: "14px" }} type="submit">Đăng nhập</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Login Form End */}
                        </div>
                    </div>
                </div>
                :
                <Redirect to={{ pathname: "/" }} />
            }

        </>
    )
}

export default LoginAuth
