import { login, getUser, loginwithgoogle, getDataUserGoogle } from "../../../Api/account"
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { TokenAccount, SetUser } from "../../../hooks/useAccount";
import { Link } from "react-router-dom";
import { useState } from "react";

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

        </>
    )
}

export default LoginAuth
