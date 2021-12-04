import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { createorder } from "../../../../Api/order";
import * as React from 'react';

const CreateOrderScreen = () => {
  const history = useHistory();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const onSubmit = async (data) => {
    console.log(data)
    try {
      await createorder(data);
      history.push('/admin/orders')
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <h4>Thêm đơn hàng</h4>
      <form id="form-add" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label className="form-label">Tên đơn:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            {...register("name", { required: true, minLength: 3, pattern: /^[^!@#$%~`^&*()_+\-=\[\]{};':"\\|.,<>\/?]*$/ })}
          />
          {errors.name?.type === "required" && (
            <span className="d-block text-danger mt-3">
              Không được để trống trường này!
            </span>
          )}
          {errors.name?.type === "pattern" &&
            <span className=" text-danger m-form__help">
              Tên đơn hàng không chứa ký tự đăc biệt.
            </span>
          }
          {errors.name?.type === "minLength" &&
            <span className=" text-danger m-form__help">
              Tên đơn hàng phải lớn hơn 3 ký tự.
            </span>
          }
        </div>
        <div className="mb-5">
          <label className="form-label">Giá tiền:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter price"
            {...register("price", { required: true, min: 0 })}
          />
          {errors.price?.type === "required" && (
            <span className="d-block text-danger mt-3">
              Không được để trống trường này!
            </span>
          )}
          {errors.price?.type === "min" && (
            <span className="d-block text-danger mt-3">
              Giá topping không âm.
            </span>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Trạng thái</label><br />

          <select {...register("status", { required: true })}>
            <option value="0">Chưa xác nhận</option>
            <option value="1">Đã xác nhận</option>

          </select>
        </div>
        {/* <div className="form-group m-form__group">
          <label htmlFor="exampleInputPassword1 d-block">Trạng thái:</label>
          <div className="m-radio-inline">
            <label className="m-radio m-radio--solid">
              <input type="radio" name="example_2" {...register("status")} value="1" checked /> Đã xác nhận
              <span />
            </label>
            <label className="m-radio m-radio--solid">
              <input type="radio" name="example_2" {...register("status")} value="0" /> Chưa xác nhận
              <span />
            </label>
          </div>
        </div> */}
        <button type="submit" className="btn btn-primary mt-5">
          Thêm
        </button>
      </form>
    </div>
  );
};

export default CreateOrderScreen;
