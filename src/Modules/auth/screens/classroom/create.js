import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { allbuilding } from '../../../../Api/building';
import { createclass } from '../../../../Api/classroom';
import { TokenAccount, SetUser } from '../../../../hooks/useAccount';
import Swal from 'sweetalert2';

const CreateClassroomScreen = ({onRefeshData}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [buildings, setBuildings] = useState([]);
    useEffect(() => {
        const getBuildings = async () => {
            try {
                const { data } = await allbuilding()
                setBuildings(data);
            } catch (error) {
                console.log(error);
            }
        }
        getBuildings();
    }, []);

    const onSubmit = async (data) => {
        const newData = {
            token: TokenAccount.getToken(),
            user: SetUser.getUser(),
            ...data
        }
        try {
            await createclass(newData).then((response) => {
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
            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#m_modal_6">Thêm mới</button>
            <div className="modal fade" id="m_modal_6" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Thêm phòng</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <div class="form-group m-form__group">
                                    <label for="name">Tên phòng</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control m-input"
                                        placeholder="vd: p101, p102, L101,...."
                                        {...register("name", { required: true, minLength: 3, pattern: /^[^!@#$%~`^&*()_+\-=\[\]{};':"\\|.,<>\/?]*$/ })}
                                    />
                                    {errors.name?.type === "required" && (
                                        <span className="d-block text-danger mt-3">
                                            Không được để trống trường này!
                                        </span>
                                    )}
                                    {errors.name?.type === "pattern" &&
                                        <span className=" text-danger m-form__help">
                                            TTên phòng học không chứa ký tự đăc biệt.
                                        </span>
                                    }
                                    {errors.name?.type === "minLength" &&
                                        <span className=" text-danger m-form__help">
                                            Tên phòng học phải lớn hơn 3 ký tự.
                                        </span>
                                    }
                                </div>
                                <div class="form-group m-form__group">
                                    <label for="building">Chọn tòa nhà</label>
                                    <select class="form-control m-input m-input--square" id="building" {...register("building_id", { required: true })}>
                                        {buildings && buildings.map((item, index) => (
                                            <option value={item.id} key={index}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.building_id && (
                                        <span className="d-block text-danger">
                                            Không được để trống trường này!
                                        </span>
                                    )}
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
    )
}

export default CreateClassroomScreen;


