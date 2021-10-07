import { Link } from "react-router-dom";

const ListProductScreen = (props) => {
  return (
    <>
      {props.data.map((item, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{item.name}</td>
          <td>
            <img
              src={item.image}
              width="150"
              height="100"
              className="rounded"
              style={{ objectFit: "cover" }}
            />
          </td>
          <td>{item.price}</td>
          <td>{item.description}</td>
          <td>{item.point}</td>
          <td>{item.cate_id}</td>
          <td>
            <button
              onClick={() => props.onDelete(item.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <Link to={`/admin/products/${item.id}`} className="btn btn-warning">
              update
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ListProductScreen;
