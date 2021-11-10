import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
const OrderScreenAuth = (props) => {
  return (
    <>
      {props.data.map((items, index) => (
        <tr key={index}>

            <td scope="col">{index + 1}</td>
             <td scope="col">{items.name}</td>
             <td scope="col"><NumberFormat value={items.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></td>
            <td scope="col">{items.status == 1 ? 'chưa xác nhận' : 'đã xác nhận'}</td>
            <td>
                <button
                onClick={() => props.onDelete(items.id)}
                className="btn btn-danger"
                >
                delete
                </button>
                <Link
                to={`/admin/orders/${items.id}`}
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

export default  OrderScreenAuth
    ;
