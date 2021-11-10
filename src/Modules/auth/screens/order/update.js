import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { showorder, updateorder } from "../../../../Api/order";


const UpdateOrderScreen = () => {

    const history = useHistory();
    let { id } = useParams();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    


    const onSubmit = async (data) => {
        try {
            await updateorder(data);
            history.push('/admin/orders');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async () => {
        const respons = await showorder(id);
        console.log(respons.data)
        const order = respons.data;
        reset(order);
    }, [id]);

    return (
        <div>
            <h4>Update product</h4>
            <form id="form-add" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter price"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="d-block text-danger mt-3">
              This field is required
            </span>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label><br />

          <select {...register("status", { required: true })}>
            <option value="0">Chưa xác nhận</option>
            <option value="1">Đã xác nhận</option>
            
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-5">
          create
        </button>
      </form>
        </div>
    )
}

export default UpdateOrderScreen
