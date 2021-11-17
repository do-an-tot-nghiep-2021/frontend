import React from 'react'
import { useState, useEffect } from "react";
import { allbuilding, removebuilding } from "../../../../Api/building";
import { Link } from "react-router-dom";
import BuildingScreenAuth from '../../screens/building/list';
import Swal from 'sweetalert2';
import { TokenAccount, SetUser } from '../../../../hooks/useAccount';

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

    const onHandleDelete = async (id) =>{
        try {
            Swal.fire({
                title: 'Bạn có muốn xóa building này?',
                showCancelButton: true,
                confirmButtonText: 'Xóa!',
              }).then((result) => {
                if (result.isConfirmed) {
                  const item = {
                    id: id,
                    token: TokenAccount.getToken(),
                    user: SetUser.getUser()
                  }
                  removebuilding(item)
                  const newbuildings = buildings.filter(item => item.id !== id)
                  Swal.fire('Thành công!', '', 'success')
                  setBuildings(newbuildings);
                  
                } 
              })
        } catch (error) {
            console.log(error)
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
