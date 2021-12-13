import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { showvoucher, updatevoucher } from "../../../../Api/voucher";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import useUpload from '../../../../hooks/upload/useUpload';
import { Link } from "react-router-dom";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";

const UpdateVoucherScreen = () => {
  const [preview, setPreview] = useState('');
  const { loading, handleUpload } = useUpload();
  let { id } = useParams();
  const { register, reset, handleSubmit, formState: { errors }, } = useForm();

  const handleInputUploadChange = async (e) => {
    const file = e.target.files.length > 0 ? e.target.files[0] : null;
    if (file === null) {
      setPreview('');
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
      )
    }
    if (preview !== '') {
      return (
        <div className="form-group mb-2">
          <img
            width="120"
            src={preview} className="mt-2 rounded"
          />
        </div>
      );
    }
    return null;
  }
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
      Swal.fire({
        title: "Bạn có muốn thay đổi topping?",
        showCancelButton: true,
        confirmButtonText: "cập nhật!",
      }).then((result) => {
        if (result.isConfirmed) {
          updatevoucher(newData).then((response) => {
            if (!response.data.status) {
              Swal.fire(response.data.message, "", "error");
            }
            if (response.data.status) {
              Swal.fire("Thành công!", "", "success");
            }
          });
        }
      });
    } catch (error) {
      Swal.fire("Không thể gửi request", "", "error");
    }
  };

  useEffect(async () => {
    const respons = await showvoucher(id);
    const voucher = respons.data;
    if (voucher.image) {
      setPreview(voucher.image);
    }
    reset(voucher);
  }, [id]);

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
                  <span className="m-nav__link-text">Phiếu ưu đãi</span>
                </a>
              </li>
              <li className="m-nav__separator">-</li>
              <li className="m-nav__item">
                <a href className="m-nav__link">
                  <span className="m-nav__link-text">cập nhật</span>
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
                    <form id="form-add" onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label className="form-label">Mã ưu đãi</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="vd: Sale10%, BLACKFIREDAY,..."
                          {...register("name", { required: true })}
                        />
                        {errors.name && (
                          <span className="d-block text-danger mt-3">
                            Trường này không để trống.
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Số điểm</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="vd: 10000, 20000,..."
                          {...register("point", { required: true, min: 0 })}
                        />
                        {errors.point?.type === "required" && (
                          <span className="d-block text-danger mt-3">
                            Giá voucher không để trống.
                          </span>
                        )}
                        {errors.point?.type === "min" && (
                          <span className="d-block text-danger mt-3">
                            Giá voucher không âm.
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Giá trị(%)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="vd: 10%, 20%,..."
                          {...register("value", { required: true })}
                        />
                        {errors.name && (
                          <span className="d-block text-danger mt-3">
                            Trường này không để trống.
                          </span>
                        )}
                      </div>
                      <div className="form-group mb-3">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="image"
                            accept="image/*"
                            onChange={handleInputUploadChange}
                          />

                          <label
                            className="custom-file-label"
                            htmlFor="image"
                          >
                            Choose image
                          </label>
                        </div>
                        {renderPreview()}
                      </div>
                      <button type="submit" className="btn btn-primary mt-5">
                        Cập nhật
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

export default UpdateVoucherScreen;
