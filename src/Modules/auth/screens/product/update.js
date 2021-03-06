import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { showproduct, updateproduct } from "../../../../Api/product";
import { allcategory } from "../../../../Api/category";
import { alltopping } from "../../../../Api/topping";
import { alltype } from "../../../../Api/types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useUpload from "../../../../hooks/upload/useUpload";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";


const UpdateProductScreen = () => {
  let { id } = useParams();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [preview, setPreview] = useState("");
  const { loading, handleUpload } = useUpload();

  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await allcategory();
        setCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  const [topping, setTopping] = useState([]);
  useEffect(() => {
    const getTopping = async () => {
      const newData = {
        status: 1
      }
      try {
        const { data } = await alltopping(newData);
        setTopping(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTopping();
  }, []);

  const [type, setType] = useState([]);
  useEffect(() => {
    const getType = async () => {
      try {
        const { data } = await alltype();
        setType(data);
      } catch (error) {
        console.log(error);
      }
    };
    getType();
  }, []);

  const handleInputUploadChange = async (e) => {
    const file = e.target.files.length > 0 ? e.target.files[0] : null;
    if (file === null) {
      setPreview("");
      return;
    }
    const url = await handleUpload(file);
    setPreview(url);
  };

  const onSubmit = async (data) => {
    const newData = {
      token: TokenAccount.getToken(),
      user: SetUser.getUser(),
      ...data
    }
    if (preview) {
      newData.image = preview;
    }
    try {
      Swal.fire({
        title: 'B???n c?? mu???n thay ?????i s???n ph???m?',
        showCancelButton: true,
        confirmButtonText: 'c???p nh???t!',
      }).then((result) => {
        if (result.isConfirmed) {
          updateproduct(newData).then((response) => {
            if (!response.data.status) {
              Swal.fire(response.data.message, '', 'error')
            }
            if (response.data.status) {
              Swal.fire('Th??nh c??ng!', '', 'success')
            }
          })
        }
      })

    } catch (error) {
      Swal.fire("Kh??ng th??? g???i request", '', 'error')
    }
  };

  useEffect(async () => {
    const respons = await showproduct(id);
    const product = respons.data;
    if (product.image) {
      setPreview(product.image);
    }
    reset(product);
  }, [id]);

  const renderPreview = () => {
    if (loading) {
      return (
        <div className="form-group mb-2">
          <ClipLoader color="#000000" size={35} />
        </div>
      );
    }

    if (preview !== "") {
      return (
        <div className="form-group mb-2">
          <img width="120" src={preview} className="mt-2 rounded" />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="m-subheader">
        <div className="d-flex align-items-center">
          <div className="mr-auto">
            <ul className="m-subheader__breadcrumbs m-nav m-nav--inline">
              <li className="m-nav__item m-nav__item--home">
                <Link to="/admin" className="m-nav__link m-nav__link--icon">
                  <i className="m-nav__link-icon la la-home" />
                </Link>
              </li>
              <li className="m-nav__separator">-</li>
              <li className="m-nav__item">
                <a href className="m-nav__link">
                  <span className="m-nav__link-text">S???n ph???m</span>
                </a>
              </li>
              <li className="m-nav__separator">-</li>
              <li className="m-nav__item">
                <a href className="m-nav__link">
                  <span className="m-nav__link-text">c???p nh???t</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="m-content">
        <div className="row">
          <div className="col-xl-12">
            <div className="m-portlet">
              <div className="m-portlet__body">
                <div className="m-section">
                  <div className="m-section__content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-6">
                          <div className="mb-3">
                            <label className="form-label">T??n s???n ph???m</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="vd: tr?? s???a, c?? ph??,..."
                              {...register("name", { required: true, minLength: 3, maxLength: 25, pattern: /^[^!@#$%~`^&*()_+\-=\[\]{};':"\\|.,<>\/?]*$/ })}
                            />
                            {errors.name?.type === "required" && (
                              <span className="d-block text-danger mt-3">
                                Kh??ng ???????c ????? tr???ng tr?????ng n??y!
                              </span>
                            )}
                            {errors.name?.type === "pattern" &&
                              <span className=" text-danger m-form__help">
                                T??n s???n ph???m kh??ng ch???a k?? t??? ????c bi???t.
                              </span>
                            }
                            {errors.name?.type === "minLength" &&
                              <span className=" text-danger m-form__help">
                                T??n s???n ph???m ph???i l???n h??n 3 k?? t???.
                              </span>
                            }
                            {errors.name?.type === "maxLength" &&
                              <span className=" text-danger m-form__help">
                                Nh???p t???i ??a 25 k?? t???.
                              </span>
                            }
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="mb-3">
                            <label className="form-label">Gi?? s???n ph???m</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Price product ..."
                              {...register("price", { required: true })}
                            />
                            {errors.name && (
                              <span className="d-block text-danger">
                                Kh??ng ???????c ????? tr???ng tr?????ng n??y!
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="mb-3">
                            <label className="form-label">Lo???i s???n ph???m</label>
                            <select
                              className="form-control"
                              {...register("cate_id", { required: true })}
                            >
                              {category.map((item, index) => (
                                <option value={item.id} key={index}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            {errors.name && (
                              <span className="d-block text-danger">
                                Kh??ng ???????c ????? tr???ng tr?????ng n??y!
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="mb-3">
                            <label className="form-label">H??nh ???nh</label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="image"
                                accept="image/*"
                                onChange={handleInputUploadChange}
                              />
                              <label className="custom-file-label" htmlFor="image">
                                Choose image
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="mb-3">
                            <label className="form-label">Topping</label>
                            {topping.map((item, index) => (
                              <section key={index}>
                                <input
                                  type="checkbox"
                                  value={item.id}
                                  {...register("product_topping", { required: false })}
                                />
                                {item.name}
                              </section>
                            ))}
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="mb-3">
                            <label className="form-label">Thu???c t??nh</label>
                            {type.map((item, index) => (
                              <section key={index}>
                                <input
                                  type="checkbox"
                                  value={item.id}
                                  {...register("product_type", { required: false })}
                                />
                                {item.name}
                              </section>
                            ))}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="mb-3">
                            {renderPreview()}
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary mt-2">
                        C???p nh???t
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProductScreen;
