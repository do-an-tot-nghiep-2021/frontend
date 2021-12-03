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
                      <div className="mb-5">
                        <label className="form-label">Tên topping</label>
                        <input
                          type="text"
                          id="name"
                          className="form-control m-input"
                          placeholder="vd: Trân trâu trắng, trân trâu đen,...."
                          {...register("name", { required: true, minLength: 3, pattern: /^[^!@#$%~`^&*()_+\-=\[\]{};':"\\|.,<>\/?]*$/ })}
                        />
                        {errors.name?.type === "required" && (
                          <span className="d-block text-danger mt-3">
                            Không được để trống trường này!
                          </span>
                        )}
                        {errors.name?.type === "pattern" &&
                          <span className=" text-danger m-form__help">
                            Tên topping không chứa ký tự đăc biệt.
                          </span>
                        }
                        {errors.name?.type === "minLength" &&
                          <span className=" text-danger m-form__help">
                            Tên topping phải lớn hơn 3 ký tự.
                          </span>
                        }
                      </div>
                      <div className="mb-5">
                        <label className="form-label">Giá</label>
                        <input
                          type="number"
                          id="name"
                          className="form-control m-input"
                          placeholder="vd: 7000đ,...."
                          {...register("price", { required: true, min: 0 })}
                        />
                        {errors.price?.type === "required" && (
                          <span className="d-block text-danger mt-3">
                            Không được để trống trường này!
                          </span>
                        )}
                        {errors.price?.type === "min" && (
                          <span className="d-block text-danger mt-3">
                            Giá topping không âm.
                          </span>
                        )}
                      </div>
                      {/* <div className="mb-5">
                        <label className="form-label">Trạng thái</label><br />
                        <select {...register("status", { required: true })}>
                          <option value="0">hết hàng</option>
                          <option value="1">còn hàng</option>
                        </select>
                      </div> */}
                      <div className="form-group m-form__group">
                        <label htmlFor="exampleInputPassword1 d-block">Trạng thái:</label>
                        <div className="m-radio-inline">
                          <label className="m-radio m-radio--solid">
                            <input type="radio" name="example_2" {...register("status")} value="1" checked /> Còn hàng
                            <span />
                          </label>
                          <label className="m-radio m-radio--solid">
                            <input type="radio" name="example_2" {...register("status")} value="0" /> Hết hàng
                            <span />
                          </label>
                        </div>
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
