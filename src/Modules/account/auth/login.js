import { login, getUser } from "../../../Api/account"
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { TokenAccount, SetUser } from "../../../hooks/useAccount";
import { Link } from "react-router-dom";

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
                history.push("/admin")
            });
        } catch (error) {
            console.log(error)
        }
        
    }
    const IsTokenAccess = localStorage.getItem("token") !== null
    if (IsTokenAccess) {
        
    }
    

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


            </div>

        </>
    )
}

export default LoginAuth
