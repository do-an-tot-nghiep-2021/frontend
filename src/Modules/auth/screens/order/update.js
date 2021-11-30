import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { showorder, updateorder } from "../../../../Api/order";


const UpdateOrderScreen = ({ id }) => {
  console.log(id)
  const history = useHistory();
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
    const order = respons.data;
    reset(order);
  }, [id]);

  return (
    <>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Cập nhật trạng thái đơn hàng {id}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
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
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
              <button type="submit" className="btn btn-primary">Cập nhật</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateOrderScreen
