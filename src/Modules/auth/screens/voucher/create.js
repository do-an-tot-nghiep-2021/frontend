import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createvoucher } from "../../../../Api/voucher";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";

const CreateVoucherScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const newData = {
      token: TokenAccount.getToken(),
      user: SetUser.getUser(),
      ...data,
    };
    try {
      await createvoucher(newData).then((response) => {
        if (!response.data.status) {
          Swal.fire(response.data.message, "", "error");
        }
        if (response.data.status) {
          Swal.fire("Thành công!", "", "success");
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
                  <label for="name">Tên Voucher</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control m-input"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="d-block text-danger">
                      Không được để trống trường này!
                    </span>
                  )}
                </div>
                <div class="form-group m-form__group">
                  <label for="name">Point</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control m-input"
                    {...register("point", { required: true })}
                  />
                  {errors.name && (
                    <span className="d-block text-danger">
                      Không được để trống trường này!
                    </span>
                  )}
                </div>
                <div class="form-group m-form__group">
                  <label for="name">Value</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control m-input"
                    {...register("value", { required: true })}
                  />
                  {errors.name && (
                    <span className="d-block text-danger">
                      Không được để trống trường này!
                    </span>
                  )}
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