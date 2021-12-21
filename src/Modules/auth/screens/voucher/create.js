import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import { createvoucher } from "../../../../Api/voucher";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";
import useUpload from "../../../../hooks/upload/useUpload";
import { useState } from "react";
const CreateVoucherScreen = ({onRefeshData}) => {
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

  const {register,handleSubmit,watch,formState: { errors },} = useForm();
  const onSubmit = async (data) => {
    const newData = {
      token: TokenAccount.getToken(),
      user: SetUser.getUser(),
      ...data,
    };
    if (preview) {
      newData.image = preview;
    }
    try {
      await createvoucher(newData).then((response) => {
        if (!response.data.status) {
          Swal.fire(response.data.message, "", "error");
        }
        if (response.data.status) {
          Swal.fire("Thành công!", "", "success");
          onRefeshData()
        }
      });
    } catch (error) {
      Swal.fire("Không thể gửi request", "", "error");
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-toggle="modal"
        data-target="#m_modal_voucher"
      >
        Thêm mới
      </button>
      <div
        className="modal fade"
        id="m_modal_voucher"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Thêm Voucher
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div class="form-group m-form__group">
                  <label for="name">Mã ưu đãi</label>
                  <input
                    type="text"
                    placeholder="vd: Sale10%, BLACKFIREDAY,..."
                    className="form-control m-input"
                    {...register("name", { required: true,maxLength:25 })}
                  />
                  {errors.name?.type === "required" && (
                    <span className="d-block text-danger">
                      Không được để trống trường này!
                    </span>
                  )}
                  {errors.name?.type === "maxLength" &&
                    <span className=" text-danger m-form__help">
                      Nhập tối đa 25 ký tự.
                    </span>
                  }
                </div>
                <div class="form-group m-form__group">
                  <label for="name">Số điểm</label>
                  <input
                    type="number"
                    id="name"
                    className="form-control m-input"
                    placeholder="vd: 10000, 20000,..."
                    {...register("point", { required: true, min: 0 })}
                  />
                  {errors.point?.type === "required" && (
                    <span className="d-block text-danger mt-3">
                      Không được để trống trường này!
                    </span>
                  )}
                  {errors.point?.type === "min" && (
                    <span className="d-block text-danger mt-3">
                      Giá voucher không âm.
                    </span>
                  )}
                </div>
                <div class="form-group m-form__group">
                  <label for="name">Giá trị(%)</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="vd: 10%, 20%,..."
                    className="form-control m-input"
                    {...register("value", { required: true,maxLength:25 })}
                  />
                  {errors.value?.type === "required" && (
                    <span className="d-block text-danger">
                      Không được để trống trường này!
                    </span>
                  )}
                  {errors.value?.type === "maxLength" &&
                    <span className=" text-danger m-form__help">
                      Nhập tối đa 25 ký tự.
                    </span>
                  }
                </div>
                <div class="form-group m-form__group">
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
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" className="btn btn-primary">
                  Thêm mới
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateVoucherScreen;
