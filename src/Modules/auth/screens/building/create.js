import React from 'react'
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { create } from '../../../../Api/building';

const CreateBuildingScreen = () => {
    const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = async (data) =>{
        try {
            await create(data);
            history.push("/admin/building");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h4>Create building</h4>
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
                </div>
                <button type="submit" className="btn btn-primary mt-5">
                    create
                </button>
            </form>
        </>
    )
}

export default CreateBuildingScreen;
