import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { showtopping, updatetopping } from "../../../../Api/topping";


const UpdateToppingScreen = () => {

    const history = useHistory();
    let { id } = useParams();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    


    const onSubmit = async (data) => {
        try {
            await updatetopping(data);
            history.push('/admin/toppings');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async () => {
        const respons = await showtopping(id);
        console.log(respons.data)
        const topping = respons.data;
        reset(topping);
    }, [id]);

    return (
        <div>
            <h4>Update product</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-2">
                    <input type="text"
                        name="name"
                        className="form-control"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span className="text-danger">This field is required</span>}
                </div>
                <div className="form-group mb-2">
                    <input type="text"
                        name="price"
                        className="form-control"
                        {...register("price", { required: true })}
                    />
                    {errors.price && <span className="text-danger">This field is required</span>}
                </div>

                

                <button type="submit" className="btn btn-primary mt-2">update</button>
            </form>
        </div>
    )
}

export default UpdateToppingScreen
