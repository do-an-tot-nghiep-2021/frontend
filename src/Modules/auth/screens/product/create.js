import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { create } from "../../../../Api/product";
import ClipLoader from "react-spinners/ClipLoader";
import useUpload from "../../../../hooks/upload/useUpload";
import { all } from "../../../../Api/category";

const CreateProductScreen = () => {
  const history = useHistory();
  const [preview, setPreview] = useState("");
  const { loading, handleUpload } = useUpload();

  // Code view category

  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await all();
        setCategory(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
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
    console.log(data, "data input");
    try {
      if (preview) {
        data.image = preview;
      }
      await create(data);
      console.log(data, "data new add");
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
        <div className="mb-3">
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
        <div className="mb-3">
          <label className="form-label">Point</label>
          <input
            type="number"
            className="form-control"
            placeholder="Point product ..."
            {...register("point", { required: true })}
          />
          {errors.name && (
            <span className="d-block text-danger mt-3">
              This field is required
            </span>
          )}
        </div>
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
        <button type="submit" className="btn btn-primary mt-5">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProductScreen;
