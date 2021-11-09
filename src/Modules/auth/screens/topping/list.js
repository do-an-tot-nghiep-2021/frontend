import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';

const ToppingScreenAuth = (props) => {
  return (
    <>
      {props.data.map((item, index) => (
        <tr key={index}>

            <td scope="col">{index + 1}</td>
             <td scope="col">{item.name}</td>
            <td scope="col"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></td>
            <td scope="col">{item.status == 1 ? 'Còn hàng' : 'Hết hàng'}</td>
            <td>
                <button
                onClick={() => props.onDelete(item.id)}
                className="btn btn-danger"
                >
                delete
                </button>
                <Link
                to={`/admin/toppings/${item.id}`}
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

export default  ToppingScreenAuth
    ;
