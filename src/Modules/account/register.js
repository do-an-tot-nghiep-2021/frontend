import { useState } from "react";
import { useForm } from "react-hook-form";
import { registeraccount } from "../../Api/account";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { SetUser } from "../../hooks/useAccount";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const showSuccess = () => {
        return (
            <div
                className="alert alert-info"
                style={{ display: success ? "block" : "none" }}
            >
                Bạn đã tạo tài khoản thành công. Click để{" "}
                <Link to="/login/account">đăng nhập</Link>
            </div>
        );
    };

    const showError = () => {
        return (
            <div
                className="alert alert-danger"
                style={{ display: error ? "block" : "none" }}
            >
                {error}
            </div>
        );
    };

    const onSubmit = async (data) => {
        await registeraccount(data)
            .then(() => {
                setError("");
                setSuccess(true);
            })
            .catch((error) => {
                setError(error.response.data.error);
            });

    }
    return (
        <>
            {(!SetUser.getUser()) ?
                <div className="form-login">
                    {showError()}
                    {showSuccess()}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label className="text-light" >name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                {...register("name", { required: true })}
                            />
                            {errors.email && (
                                <span className="d-block text-danger mt-3">
                                    This field is required
                                </span>
                            )}
                        </div>
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
                            <label className="text-light" >Phone</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter phone"
                                {...register("phone", { required: true })}
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
                        <input type="hidden" value="https://picsum.photos/200/300.jpg" {...register("image")} />
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                </div>
                :
                <Redirect to={{ pathname: "/" }} />
            }
        </>
    )
}

export default Register
