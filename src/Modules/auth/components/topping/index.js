import { useEffect, useState } from "react";
import { alltopping, removetopping } from "../../../../Api/topping";
import { Link } from "react-router-dom";
import ToppingScreenAuth from "../../screens/topping/list";

const ListToppingComponent = () => {
  const [Toppings, setToppings] = useState([]);
  useEffect(() => {
    const getToppings = async () => {
      try {
        const { data } = await alltopping();
        setToppings(data);
      } catch (error) {
        console.log(error);
      }
    };
    getToppings();
  }, []);

  // console.log(Toppings);
  const onHandleDelete = async (id) => {
    try {
      await removetopping(id);
      const newToppings = Toppings.filter((items) => items.id !== id);
      setToppings(newToppings);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to="/admin/toppings/create" className="btn btn-primary mb-2">
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
          <ToppingScreenAuth data={Toppings} onDelete={onHandleDelete} />
        </tbody>
      </table>
    </>
  );
};
export default ListToppingComponent;
