import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { showproduct, updateproduct } from "../../../../Api/product";
import { allcategory } from "../../../../Api/category";
import { alltopping } from "../../../../Api/topping";
import { alltype } from "../../../../Api/types";
import useUpload from "../../../../hooks/upload/useUpload";

const UpdateProductScreen = () => {
  const history = useHistory();
  let { id } = useParams();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [preview, setPreview] = useState("");
  const { loading, handleUpload } = useUpload();

  // Code view category

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

  // Code view topping

  const [topping, setTopping] = useState([]);
  useEffect(() => {
    const getTopping = async () => {
      try {
        const { data } = await alltopping();
        setTopping(data);
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
      } catch (error) {
        console.log(error);
      }
    };
    getType();
  }, []);

  //   Code upload img

  const handleInputUploadChange = async (e) => {
    const file = e.target.files.length > 0 ? e.target.files[0] : null;

    if (file === null) {
      setPreview("");
      return;
    }

    const url = await handleUpload(file);

    setPreview(url);
  };

  // Code new add product

  const onSubmit = async (data) => {
    console.log(data)
    try {
      if (preview) {
        data.image = preview;
      }

      await updateproduct(data);

      history.push("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(async () => {
    const respons = await showproduct(id);
    const product = respons.data;
    console.log(product)
    
    
    if (product.image) {
      setPreview(product.image);
    }

    reset(product);
  }, [id]);

  
  // Code view img

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
    <div>
      <h4>Update product</h4>
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
              <label className="form-label">Categories</label>
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

          <div className="col-3">
            <div className="mb-3">
              <label className="form-label">Topping</label>
              {topping.map((item, index) => (
                <section key={index}>
                  <input
                    type="checkbox"
                    value={item.id}
                    defaultChecked={1}
                    {...register("product_topping", { required: false })}
                    
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
                    {...register("product_type", { required: false })}
                  />
                  {item.name}
                </section>
              ))}
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

        </div>

        <button type="submit" className="btn btn-primary mt-2">
          update
        </button>
      </form>
    </div>
  );
};

export default UpdateProductScreen;
