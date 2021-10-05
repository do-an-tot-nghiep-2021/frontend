import { Link } from "react-router-dom"

const CategoryScreenAuth = (props) => {
    
    return (
        <>
            {props.data.map((item,index)=>(
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{item.name}</td>
                    <td><img src={item.image} width="150" height="100" className="rounded" style={{objectFit: 'cover'}} /></td>
                    <td>
                        <button onClick={() => props.onDelete(item.id)} className="btn btn-danger">delete</button>
                        <Link to={`/admin/categories/${item.id}`} className="btn btn-warning">update</Link>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default CategoryScreenAuth
