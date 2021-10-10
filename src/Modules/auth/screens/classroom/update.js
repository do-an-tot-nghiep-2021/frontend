import React, { useState, useEffect } from 'react'
import { useHistory,useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { update,show } from '../../../../Api/classroom';
import { all } from '../../../../Api/building';

const UpdateClassroomScreen = () => {
    const history = useHistory();
    const { id } = useParams();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [buildings, setBuildings] = useState([]);

    useEffect(() =>{
        const getBuildings = async () =>{
            try {
                const { data } = await all();
                setBuildings(data);
                
            } catch (error) {
                console.log(error);
            }
        }
        getBuildings();
    },[]);

    const onSubmit = async (data) => {
        try {
           
            await update(data);
            history.push("/admin/classroom");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        const respons = await show(id);
        
        const classroom = respons.data;  
        console.log("class",classroom);
        reset(classroom);
    }, [id]);

    return (
        <>
            <h4>update classroom</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
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
                    <label className="form-label">Building</label>
                    <select
                        className="form-control"
                        {...register("building_id")}
                        defaultValue="0"
                    >
                        {buildings.map((item, index) => (
                            <option value={item.id} key={index}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-5">
                    update
                </button>
            </form>
        </>
    )
}

export default UpdateClassroomScreen;
