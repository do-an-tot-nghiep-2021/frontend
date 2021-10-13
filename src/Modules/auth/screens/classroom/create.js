import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';

import { allbuilding } from '../../../../Api/building';
import { createclass } from '../../../../Api/classroom';

const CreateClassroomScreen = () => {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [buildings, setBuildings] = useState([]);

    useEffect(() =>{
        const getBuildings = async () =>{
            try {
                const { data } = await allbuilding();
                setBuildings(data);
            } catch (error) {
                console.log(error);
            }
        }
        getBuildings();
    },[]);
    
    const onSubmit = async (data) => {
        try {
            console.log("data",data);
            await createclass(data);
            history.push("/admin/classroom");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h4>Create classroom</h4>
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
                    create
                </button>
            </form>
        </>
    )
}

export default CreateClassroomScreen;


