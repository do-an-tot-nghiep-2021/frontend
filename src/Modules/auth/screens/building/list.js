import React from 'react'
import { Link } from 'react-router-dom'

const BuildingScreenAuth = (props) => {
    return (
        <>
            {props.data.map((item, index) => (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>
                        <Link to={`/admin/building/${item.id}`} className="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">
                            <i class="la la-edit"></i>
                        </Link>
                        <a className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete" onClick={() => props.onDelete(item.id)}>
                            <i class="la la-trash"></i>
                        </a>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default BuildingScreenAuth;
