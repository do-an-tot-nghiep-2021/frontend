import { Link } from "react-router-dom"
const ListUserScreen = (props) => {
    return (
        <>
            {props.data.map((items, index) => (
                <tr key={index}>
                    <td scope="col">{index + 1}</td>
                    <td scope="col"><img src={items.image} width="50" style={{ borderRadius: "7px", objectFit: "cover", height: "50px" }} /></td>
                    <td scope="col">{items.name}</td>
                    <td scope="col">{items.email}</td>
                    <td scope="col">{items.phone}</td>
                    <td scope="col">{items.role == 10 ? "admin" : "user"}</td>
                    <td>
                        <Link to={`/admin/types/${items.id}`} className="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">
                            <i class="la la-edit"></i>
                        </Link>
                        <a className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete" onClick={() => props.onDelete(items.id)}>
                            <i class="la la-trash"></i>
                        </a>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default ListUserScreen
