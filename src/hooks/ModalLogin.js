import React from "react";
import "./modal.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { login, getUser } from "../Api/account";
import { TokenAccount, SetUser } from "./useAccount";
import { Link } from "react-router-dom";

function ModalLogin({ setOpenModal }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            await login(data).then((user) => {
                TokenAccount.saveToken(user.data.token)
            });
            getUser(localStorage.getItem('token')).then((userToken) => {
                SetUser.saveUser(userToken.data)
                setOpenModal(false)
            });
        } catch (error) {
            console.log(error)
        }
        
    }
    
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="text-light" >Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="d-block text-danger mt-3">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="text-light" >Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <span className="d-block text-danger mt-3">
                                This field is required
                            </span>
                        )}
                    </div>
                    <Link to="/register/customer">Neu ban chua co tai khoan hay dang ky ngay!</Link><br/>
                    <button type="submit" className="btn btn-danger bg-danger">
                        Login
                    </button>
                </form>


        </div>
        
      </div>
    </div>
  );
}

export default ModalLogin;
