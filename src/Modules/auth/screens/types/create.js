import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createtype } from "../../../../Api/types";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";

const CreateTypeScreen = ({onRefeshData}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const newData = {
      token: TokenAccount.getToken(),
      user: SetUser.getUser(),
      ...data
    }
    try {
      await createtype(newData).then((response) => {
        if (!response.data.status) {
          Swal.fire(response.data.message, '', 'error')
        }
        if (response.data.status) {
          Swal.fire('Thành công!', '', 'success')
          onRefeshData()
        }
      })
    } catch (error) {
      Swal.fire('Không thể gửi request', '', 'error')
    }
  }

  return (
    <>
      <button type="button" className="btn btn-success" data-toggle="modal" data-target="#m_modal_add_type">Thêm mới</button>
      <div className="modal fade" id="m_modal_add_type" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Thêm Thuộc tính</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div class="form-group m-form__group">
                  <label for="name">Tên thuộc tính</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control m-input"
                    placeholder="vd: nóng, mát, đá,...."
                    {...register("name", { required: true, minLength: 3,maxLength:25, pattern: /^[^!@#$%~`^&*()_+\-=\[\]{};':"\\|.,<>\/?]*$/  })}
                  />
                  {errors.name?.type === "required" && (
                    <span className="d-block text-danger mt-3">
                      Không được để trống trường này!
                    </span>
                  )}
                  {errors.name?.type === "pattern" &&
                    <span className=" text-danger m-form__help">
                      Tên thuộc tính không chứa ký tự đăc biệt.
                    </span>
                  }
                  {errors.name?.type === "minLength" &&
                    <span className=" text-danger m-form__help">
                      Tên thuộc tính phải lớn hơn 3 ký tự.
                    </span>
                  }
                  {errors.name?.type === "maxLength" &&
                    <span className=" text-danger m-form__help">
                      Nhập tối đa 25 ký tự.
                    </span>
                  }
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

export default CreateTypeScreen;
