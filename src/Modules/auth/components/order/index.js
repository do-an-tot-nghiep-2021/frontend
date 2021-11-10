import { useEffect, useState } from "react";
import { allorder, removeorder } from "../../../../Api/order";
import { Link } from "react-router-dom";
import OrderScreenAuth from "../../screens/order/list";

const ListOrderComponent = () => {
  const [Orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await allorder();
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  // console.log(Toppings);
  const onHandleDelete = async (id) => {
    try {
      await removeorder(id);
      const newOrders = Orders.filter((items) => items.id !== id);
      setOrders(newOrders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to="/admin/orders/create" className="btn btn-primary mb-2">
        Create
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col" width="150">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <OrderScreenAuth data={Orders} onDelete={onHandleDelete} />
        </tbody>
      </table>
    </>
  );
};
export default ListOrderComponent;
