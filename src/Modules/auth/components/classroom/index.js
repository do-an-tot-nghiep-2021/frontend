import React from 'react'
import { useState, useEffect } from "react";
import { allclass, removeclass } from "../../../../Api/classroom";
import { Link } from "react-router-dom";
import ClassroomScreenAuth from '../../screens/classroom/list';


const ClassroomListAuth = () => {
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() =>{
        const getClassroom = async () =>{
            try {
                const { data } = await allclass();
                setClassrooms(data);
                
            } catch (error) {
                console.log(error);
            }
        }
        getClassroom();
    },[]);
    
    const onHandleDelete = async (id) =>{
        try {
            await removeclass(id);
            const newClassroom = classrooms.filter(item => item.id !== id)
            setClassrooms(newClassroom);
        } catch (error) {
            
        }
    }
    return (
        <>
            <Link to="/admin/classroom/create" className="btn btn-primary mb-2">
                Create
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">building_id</th>
                        <th scope="col" width="200">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                    <ClassroomScreenAuth data={classrooms} onDelete={onHandleDelete} />
                </tbody>
            </table>
        </>
    )
}

export default ClassroomListAuth;
