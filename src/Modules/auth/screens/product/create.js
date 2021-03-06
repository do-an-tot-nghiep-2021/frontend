import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createproduct } from "../../../../Api/product";
import ClipLoader from "react-spinners/ClipLoader";
import useUpload from "../../../../hooks/upload/useUpload";
import { allcategory } from "../../../../Api/category";
import { alltopping } from "../../../../Api/topping";
import { alltype } from "../../../../Api/types";
import { SetUser, TokenAccount } from "../../../../hooks/useAccount";
import Swal from "sweetalert2";
const CreateProductScreen = ({onRefeshData}) => {
  const [preview, setPreview] = useState("");
  const { loading, handleUpload } = useUpload();

  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await allcategory();
        setCategory(data);
        // console.log(data);
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
        status : 1
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newData = {
      token: TokenAccount.getToken(),
      user: SetUser.getUser(),
      ...data
    }
    try {
      if (preview) {
        newData.image = preview;
      }
      await createproduct(newData).then((response) => {
        if (!response.data.status) {
          Swal.fire(response.data.message, '', 'error')
        }
        if (response.data.status) {
          Swal.fire('Th??nh c??ng!', '', 'success')
          onRefeshData()
        }
      })
    }catch (error) {
      Swal.fire('Kh??ng th??? g???i request', '', 'error')
    }
  };
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
        <div className="form-group mb-5">
          <img width="120" src={preview} className="mt-2 mb-5 rounded" />
        </div>
      );
    }
    return null;
  };


  return (
    <>
      <button type="button" className="btn btn-success" data-toggle="modal" data-target="#m_modal_product">Th??m m???i</button>
      <div className="modal fade" id="m_modal_product" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Th??m S???n ph???m</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">??</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">T??n s???n ph???m</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="vd: tr?? s???a, c?? ph??,..."
                        {...register("name", { required: true, minLength: 3,maxLength:25, pattern: /^[^!@#$%~`^&*()_+\-=\[\]{};':"\\|.,<>\/?]*$/ })}
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
                      <label className="form-label">Gi??</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="vd: 20.000??, 35.000??,..."
                        {...register("price", { required: true,min:0 })}
                      />
                      {errors.price?.type === "required" && (
                    <span className="d-block text-danger mt-3">
                      Kh??ng ???????c ????? tr???ng tr?????ng n??y!
                    </span>
                  )}
                  {errors.price?.type === "min" &&
                    <span className=" text-danger m-form__help">
                      Gi?? ti???n kh??ng ??m.
                    </span>
                  }
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Danh m???c</label>
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
                      {errors.cate_id && (
                        <span className="d-block text-danger">
                          Kh??ng ????? tr???ng tr?????ng n??y!
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
                            {...register("topping_id", { required: false })}
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
                            {...register("type_id", { required: false })}
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
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">????ng</button>
                <button type="submit" className="btn btn-primary">Th??m m???i</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProductScreen;
