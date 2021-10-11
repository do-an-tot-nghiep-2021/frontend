import { Link } from "react-router-dom";

const TypesScreenAuth = (props) => {
  return (
    <>
      {props.data.map((items, index) => (
        <tr key={index}>

            <td scope="col">{index + 1}</td>
             <td scope="col">{items.name}</td>
            <td>
                <button
                onClick={() => props.onDelete(items.id)}
                className="btn btn-danger"
                >
                delete
                </button>
                <Link
                to={`/admin/types/${items.id}`}
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

export default  TypesScreenAuth;
