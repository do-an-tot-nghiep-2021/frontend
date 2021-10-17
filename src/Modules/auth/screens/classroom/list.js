import React from 'react'
import { Link } from 'react-router-dom'

const ClassroomScreenAuth = (props) => {
    return (
        <>
            {props.data.map((item, index) => (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.building?.name || 'N/A'}</td>
                    <td>
                        <button
                            onClick={() => props.onDelete(item.id)}
                            className="btn btn-danger"
                        >
                            delete
                        </button>
                        <Link
                            to={`/admin/classroom/${item.id}`}
                            className="btn btn-warning"
                        >
                            update
                        </Link>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default ClassroomScreenAuth;
