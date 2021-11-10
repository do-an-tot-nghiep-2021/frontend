import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { showactive, updateactive } from "../../../../Api/active";


const UpdateActiveScreen = () => {

    const history = useHistory();
    let { id } = useParams();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    


    const onSubmit = async (data) => {
        try {
            await updateactive(data);
            history.push('/admin/actives');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async () => {
        const respons = await showactive(id);
        console.log(respons.data)
        const active = respons.data;
        reset(active);
    }, [id]);

    return (
        <div>
            <h4>Update </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-2">
                    <input type="text"
                        name="name"
                        className="form-control"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span className="text-danger">This field is required</span>}
                </div>
             

                

                <button type="submit" className="btn btn-primary mt-2">update</button>
            </form>
        </div>
    )
}

export default UpdateActiveScreen
