import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { showbuilding, updatebuilding } from '../../../../Api/building';

const UpdateBuildingScreen = () => {
    const history = useHistory();
    const { id } = useParams();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) =>{
        try {
            await updatebuilding(data).then((response) => {
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

    useEffect(async () => {
        const respons = await showbuilding(id);
        console.log(respons.data)
        const building = respons.data;
        reset(building);
    }, [id]);

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
            <h4>Update building</h4>
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

export default UpdateBuildingScreen;
