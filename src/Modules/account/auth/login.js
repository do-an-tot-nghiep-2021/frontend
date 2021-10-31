import { loginadmin, getUserLogin } from "../../../Api/account"
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { authenticate } from "../../../Api/account";
import { isAuthenticated } from "../../../Api/account";
const LoginAuth = () => {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    

    const onSubmit = async (data) => {
        await loginadmin(data).then((dataUser) => {
            if (dataUser.error) {
                console.log('huhu')
            }
            authenticate(dataUser, () => {
                localStorage.setItem('accessToken', dataUser.data.token)
                history.push("/admin");
            });
        });
    }

    const IsTokenAccess = localStorage.getItem("accessToken") !== null
    if (IsTokenAccess) {
        getUserLogin(localStorage.getItem('accessToken'))
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
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>


            </div>

        </>
    )
}

export default LoginAuth
