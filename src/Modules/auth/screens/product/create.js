import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createproduct } from "../../../../Api/product";
import ClipLoader from "react-spinners/ClipLoader";
import useUpload from "../../../../hooks/upload/useUpload";
import { allcategory } from "../../../../Api/category";
import { alltopping } from "../../../../Api/topping";
import { alltype } from "../../../../Api/types";

const CreateProductScreen = () => {
  const history = useHistory();
  const [preview, setPreview] = useState("");
  const { loading, handleUpload } = useUpload();

  // Code view category

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

  // Code view topping

  const [topping, setTopping] = useState([]);
  useEffect(() => {
    const getTopping = async () => {
      try {
        const { data } = await alltopping();
        setTopping(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTopping();
  }, []);

  // Code view types

  const [type, setType] = useState([]);
  useEffect(() => {
    const getType = async () => {
      try {
        const { data } = await alltype();
        setType(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getType();
  }, []);

  //Code upload img

  const handleInputUploadChange = async (e) => {
    const file = e.target.files.length > 0 ? e.target.files[0] : null;

    if (file === null) {
      setPreview("");
      return;
    }

    const url = await handleUpload(file);

    setPreview(url);
  };

  //Code add product

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      if (preview) {
        data.image = preview;
      }
      await createproduct(data);
      history.push("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  //Code view img

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
    <div>
      <h4>Create Product</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name product ..."
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="d-block text-danger mt-3">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Price product ..."
                {...register("price", { required: true })}
              />
              {errors.name && (
                <span className="d-block text-danger mt-3">
                  This field is required
                </span>
              )}
            </div>
          </div>
          
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Description product ..."
                {...register("description", { required: true })}
              />
              {errors.name && (
                <span className="d-block text-danger mt-3">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Categories</label>
              <select
                className="form-control"
                {...register("cate_id")}
                defaultValue="0"
              >
                {category.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Image</label>
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
                {renderPreview()}
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
              <label className="form-label">Type</label>
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
        </div>
        <button type="submit" className="btn btn-primary mt-5">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProductScreen;
