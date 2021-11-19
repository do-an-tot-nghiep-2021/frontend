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
      <form  onSubmit={handleSubmit(onSubmit)}>
        
        <div className="mb-3">
          <label className="form-label">Status</label><br />

          <select {...register("status", { required: true })} className="form-control">
            <option value="1">Đơn hàng đang chờ xử lý</option>
            <option value="2">Đơn hàng đang chờ nhân viên giao hàng</option>
            <option value="3">Đơn hàng đang được vận chuyển</option>
            <option value="4">Đơn hàng đã vận chuyển thành công</option>
            <option value="5">Đơn hàng đã bị hủy</option>
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
