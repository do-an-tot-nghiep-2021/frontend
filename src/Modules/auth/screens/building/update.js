import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { show, update } from '../../../../Api/building';

const UpdateBuildingScreen = () => {
    const history = useHistory();
    const { id } = useParams();
    console.log(id, 'haha')
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) =>{
        try {
            await update(data);
            history.push("/admin/building");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        const respons = await show(id);
        console.log(respons.data)
        const building = respons.data;
        reset(building);
    }, [id]);
    return (
        <>
            <h4>Update building</h4>
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

export default UpdateBuildingScreen;
