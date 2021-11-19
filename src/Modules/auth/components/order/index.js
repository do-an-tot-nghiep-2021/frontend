import { useEffect, useState } from "react";
import { allorder, removeorder } from "../../../../Api/order";
import OrderScreenAuth from "../../screens/order/list";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";

const ListOrderComponent = () => {
  const [Orders, setOrders] = useState([]);
  useEffect( async () => {
    if (SetUser.getUser()) {
      const data = {
        token: TokenAccount.getToken(),
        user: SetUser.getUser(),
      }
      console.log(data)
      const respons = await allorder(data);
      setOrders(respons.data)
    }
  }, []);

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
