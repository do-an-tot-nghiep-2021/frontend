import { useState } from "react";
import { useForm } from "react-hook-form";
import { createcategory } from "../../../../Api/category";
import ClipLoader from "react-spinners/ClipLoader";
import useUpload from "../../../../hooks/upload/useUpload";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";
import Swal from "sweetalert2";

const CreateFormScreen = () => {
  const [preview, setPreview] = useState("");
  const { loading, handleUpload } = useUpload();

  const handleInputUploadChange = async (e) => {
    const file = e.target.files.length > 0 ? e.target.files[0] : null;
    if (file === null) {
      setPreview("");
      return;
    }
    const url = await handleUpload(file);
    setPreview(url);
  };

  const { register, handleSubmit, formState: { errors }, } = useForm();
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
      await createcategory(newData).then((response) => {
        if (!response.data.status) {
          Swal.fire(response.data.message, '', 'error')
        }
        if (response.data.status) {
          Swal.fire('Thành công!', '', 'success')
        }
      })
    } catch (error) {
      Swal.fire("Không thể gửi request", '', 'error')
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
          <img width="120" src={preview} className="mt-2 mb-5  rounded" />
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <button type="button" className="btn btn-success" data-toggle="modal" data-target="#m_modal_cate">Thêm mới</button>
      <div className="modal fade" id="m_modal_cate" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Thêm tòa</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    {...register("name", { required: true, minLength: 3, pattern: /^[^!@#$%~`^&*()_+\-=\[\]{};':"\\|.,<>\/?]*$/  })}
                  />
                  {errors.name?.type === "required" && (
                    <span className="d-block text-danger mt-3">
                      Không được để trống trường này!
                    </span>
                  )}
                  {errors.name?.type === "pattern" &&
                  <span className=" text-danger m-form__help">
                    Tên danh mục không chứa ký tự đăc biệt.
                  </span>
                }
                {errors.name?.type === "minLength" &&
                  <span className=" text-danger m-form__help">
                    Tên danh mục phải lớn hơn 3 ký tự.
                  </span>
                }
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
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
                <button type="submit" className="btn btn-primary">Thêm mới</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateFormScreen;
