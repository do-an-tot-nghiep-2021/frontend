import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';

const ListProductScreen = (props) => {

  return (
    <>
      {props.data.map((item, index) => (
        <tr key={index}>
          <th scope="row">
            {index + 1}
          </th>
          <td>
            {item.name}
          </td>
          <td>
            <img
              src={item.image}
              width="150"
              height="100"
              className="rounded"
              style={{ objectFit: "cover" }}
            />
          </td>
          <td>
            <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
          </td>
          <td>
            {item.category?.name || 'N/A'}
          </td>

          <td>
            {item.product_topping.map((item,index)=>(
              <span style={{border: '1px solid gray',
                      fontSize: '13px',
                      backgroundColor: '#80808059', 
                      borderRadius: '5px', 
                      padding: '2px', 
                      marginRight: '3px'}}
                    key={index}>{item.name}
              </span>
            ))}
          </td>

          <td>
            {item.product_type.map((item,index)=>(
              <span style={{border: '1px solid gray', 
                          fontSize: '13px',
                          backgroundColor: '#80808059',
                          borderRadius: '5px', 
                          padding: '2px', 
                          marginRight: '3px'}} 
                    key={index}>{item.name}
              </span>
            ))}
          </td>

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
