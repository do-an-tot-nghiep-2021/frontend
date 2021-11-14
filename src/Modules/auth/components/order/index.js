import { useEffect, useState } from "react";
import { allorder, removeorder } from "../../../../Api/order";
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
  console.log(Orders)

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
      <OrderScreenAuth data={Orders} onDelete={onHandleDelete} />
    </>
  );
};
export default ListOrderComponent;
