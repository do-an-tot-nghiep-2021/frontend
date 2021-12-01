import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { showtopping, updatetopping } from "../../../../Api/topping";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { TokenAccount, SetUser } from '../../../../hooks/useAccount';

const UpdateToppingScreen = () => {
  let { id } = useParams();
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const newData = {
      token: TokenAccount.getToken(),
      user: SetUser.getUser(),
      ...data
    }
    try {
      Swal.fire({
        title: 'Bạn có muốn thay đổi topping?',
        showCancelButton: true,
        confirmButtonText: 'cập nhật!',
      }).then((result) => {
        if (result.isConfirmed) {
          updatetopping(newData).then((response) => {
            if (!response.data.status) {
              Swal.fire(response.data.message, '', 'error')
            }
            if (response.data.status) {
              Swal.fire('Thành công!', '', 'success')
            }
          })
        }
      })
    } catch (error) {
      Swal.fire("Không thể gửi request", '', 'error')
    }
  }

  useEffect(async () => {
    const respons = await showtopping(id);
    const topping = respons.data;
    reset(topping);
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
                  <span className="m-nav__link-text">Topping</span>
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
                        <label className="form-label">Tên topping</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter name"
                          {...register("name", { required: true })}
                        />
                        {errors.name && (
                          <span className="d-block text-danger mt-3">
                            This field is required
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Giá</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter price"
                          {...register("price", { required: true })}
                        />
                        {errors.price && (
                          <span className="d-block text-danger mt-3">
                            This field is required
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Trạng thái</label><br />
                        <select {...register("status", { required: true })}>
                          <option value="0">hết hàng</option>
                          <option value="1">còn hàng</option>
                        </select>
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
  )
}

export default UpdateToppingScreen
