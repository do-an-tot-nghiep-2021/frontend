import { login, getUser, loginwithgoogle, getDataUserGoogle } from "../../../Api/account"
import { useForm } from "react-hook-form";
import { useHistory, Redirect } from "react-router";
import { TokenAccount, SetUser } from "../../../hooks/useAccount";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const LoginAuth = () => {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [googleLoginUrl, setGoogleLoginUrl] = useState();

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
                        text: 'Vì lí do bảo mật nên mọi tà khoản sau 30 phút sẽ đăng nhập lại',
                        footer: '<a href="/login/account">Đăng nhập lại ngay?</a>'
                      })
                    history.push("/")
                }, 1200000);
                history.push("/admin")
            });
        } catch (error) {
            console.log(error)
        }
        
    }
    const getCode = window.location.search
    if (getCode) {
        getDataUserGoogle(getCode).then((Response)=> {
            console.log(Response)
        })
    }
    loginwithgoogle().then((Response) => {
        setGoogleLoginUrl(Response.data.url)
    })
    

    return (
        <>
            {(!SetUser.getUser()) ?
                <div className="form-login">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label className="text-light" >Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <span className="d-block text-danger mt-3">
                                    This field is required
                                </span>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="text-light" >Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                {...register("password", { required: true })}
                            />
                            {errors.password && (
                                <span className="d-block text-danger mt-3">
                                    This field is required
                                </span>
                            )}
                        </div>
                        <Link to="/register/account">Neu ban chua co tai khoan hay dang ky ngay!</Link><br/>
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                    <a className="btn btn-success" href={googleLoginUrl} >Login with gg</a>
                </div>
                :
                <Redirect to={{ pathname: "/" }} />
            }

        </>
    )
}

export default LoginAuth
