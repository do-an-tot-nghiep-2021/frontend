import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { createtopping } from "../../../../Api/topping";
import * as React from 'react';

const CreateToppingScreen = () => {
  const history = useHistory();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const onSubmit = async (data) => {

    try {

      await createtopping(data);
      console.log("object", data)
      history.push('/admin/toppings')
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <h4>Create topping</h4>
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
            <option value="0">hết hàng</option>
            <option value="1">còn hàng</option>
            
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-5">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateToppingScreen;
