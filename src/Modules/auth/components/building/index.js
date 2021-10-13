import React from 'react'
import { useState, useEffect } from "react";
import { allbuilding, removebuilding } from "../../../../Api/building";
import { Link } from "react-router-dom";
import BuildingScreenAuth from '../../screens/building/list';


const BuildingListAuth = () => {
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
    // console.log("object",buildings);
    const onHandleDelete = async (id) =>{
        try {
            await removebuilding(id);
            const newbuildings = buildings.filter(item => item.id !== id)
            setBuildings(newbuildings);
        } catch (error) {
            
        }
    }
    return (
        <>
            <Link to="/admin/building/create" className="btn btn-primary mb-2">
                Create
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col" width="200">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                    <BuildingScreenAuth data={buildings} onDelete={onHandleDelete} />
                </tbody>
            </table>
        </>
    )
}

export default BuildingListAuth;
