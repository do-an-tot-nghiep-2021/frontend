import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { createsize } from "../../../../Api/size";
import { TokenAccount, SetUser } from '../../../../hooks/useAccount';


const CreateSizeScreen = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const onSubmit = async (data) => {
    const newData = {
      token: TokenAccount.getToken(),
      user: SetUser.getUser(),
      ...data
    }
    console.log(newData)
    try {
      await createsize(newData).then((response) => {

        if (!response.data.status) {
          setError(response.data.message);
          setTimeout(function () {
            setError("");
          }, 5000);
          setSuccess(false);
        }
        if (response.data.status) {
          setError("")
          setSuccess(true);
          setTimeout(function () {
            setSuccess(false);
          }, 1500);
        }

      })
    } catch (error) {
      setError("Không Thể gửi Request")
      setTimeout(function () {
        setError("");
      }, 3000);
    }
  }

  const showSuccess = () => {
    return (
      <div className="row no-gutters" style={{ position: 'absolute', left: '72%', top: '10px' }} >
        <div className="col-lg-12 col-md-12 ml-auto">
          <div className={`alert alert-success shadow ${success ? "show" : "fade"}`} role="alert" style={{ borderRadius: '3px' }}>
            <div>
              <svg width="3em" height="3em" viewBox="0 0 16 16" className="m-1 bi bi-shield-fill-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 .5c-.662 0-1.77.249-2.813.525a61.11 61.11 0 0 0-2.772.815 1.454 1.454 0 0 0-1.003 1.184c-.573 4.197.756 7.307 2.368 9.365a11.192 11.192 0 0 0 2.417 2.3c.371.256.715.451 1.007.586.27.124.558.225.796.225s.527-.101.796-.225c.292-.135.636-.33 1.007-.586a11.191 11.191 0 0 0 2.418-2.3c1.611-2.058 2.94-5.168 2.367-9.365a1.454 1.454 0 0 0-1.003-1.184 61.09 61.09 0 0 0-2.772-.815C9.77.749 8.663.5 8 .5zm2.854 6.354a.5.5 0 0 0-.708-.708L7.5 8.793 6.354 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
              </svg>
              <span style={{ fontSize: '12px' }} className="mb-0 font-weight-light"><b className="mr-1">Thành công!</b>Thêm thành công.</span>
            </div>

          </div>
        </div>
      </div>


    );
  };

  const showError = () => {
    return (
      <div className="row no-gutters" style={{ position: 'absolute', left: '75%', top: '10px' }} >
        <div className="col-lg-12 col-md-12 ml-auto">
          <div className={`alert alert-danger shadow ${error ? "show" : "fade"}`} role="alert" style={{ borderRadius: '3px' }}>
            <div>
              <svg width="3em" height="3em" viewBox="0 0 16 16" className="m-1 bi bi-exclamation-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
              <span style={{ fontSize: '12px' }} className="mb-0 font-weight-light"><b className="mr-1">Thất bại! </b> {error}.</span>
            </div>

          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <h4>Create size</h4>
      {showSuccess()}
      {showError()}
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

        <button type="submit" className="btn btn-primary mt-5">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateSizeScreen;
