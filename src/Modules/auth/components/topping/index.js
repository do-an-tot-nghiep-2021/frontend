import { useEffect, useState } from "react";
import { all, remove } from "../../../../Api/topping";
// import ListProductScreen from "../../screens/toppings/list";
import { Link } from "react-router-dom";
import ToppingScreenAuth from "../../screens/topping/list";

const ListToppingComponent = () => {
  const [Toppings, setToppings] = useState([]);
  useEffect(() => {
    const getToppings = async () => {
      try {
        const { data } = await all();
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
      await remove(id);
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
            <th scope="col" width="150">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <ListProductScreen data={Toppings} onDelete={onHandleDelete} /> */}
          <ToppingScreenAuth data={Toppings} onDelete={onHandleDelete} />
        </tbody>
      </table>
    </>
  );
};
export default ListToppingComponent;
