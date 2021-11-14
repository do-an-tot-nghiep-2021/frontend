import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { createbuilding } from '../../../../Api/building';

const CreateBuildingScreen = () => {
    const history = useHistory();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            await createbuilding(data).then((response) => {
                if (!response.data) {
                    setError("Ten da ton tai");
                    setSuccess(false);
                }else{
                    setError("")
                    setSuccess(true);
                }
              })
        } catch (error) {
            console.log(error);
        }
    }
    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: success ? "block" : "none" }}>
                Bạn đã tạo thành công.
            </div>
        );
    };

    const showError = () => {
        return (
            <span className="text-danger" style={{ display: error ? "block" : "none" }}>
                {error}
            </span>
        );
    };
    return (
        <>
            <h4>Create building</h4>
            {showSuccess()}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        {...register("name", { required: true })}
                    />
                    {errors.name && (
                        <span className="d-block text-danger mt-3">
                            This field is required
                        </span>
                    )}
                    {showError()}
                </div>
                <button type="submit" className="btn btn-primary mt-5">
                    create
                </button>
            </form>
        </>
    )
}

export default CreateBuildingScreen;
