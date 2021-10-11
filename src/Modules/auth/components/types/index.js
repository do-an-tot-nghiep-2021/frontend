import { useEffect, useState } from "react";
import { all, remove } from "../../../../Api/types";
// import ListProductScreen from "../../screens/toppings/list";
import { Link } from "react-router-dom";
import TypesScreenAuth from "../../screens/types/list";

const ListTypesComponent = () => {
  const [Types, setTypes] = useState([]);
  useEffect(() => {
    const getTypes = async () => {
      try {
        const { data } = await all();
        setTypes(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTypes();
  }, []);

  console.log(Types);
  const onHandleDelete = async (id) => {
    try {
      await remove(id);
      const newTypes = Types.filter((items) => items.id !== id);
      setTypes(newTypes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to="/admin/types/create" className="btn btn-primary mb-2">
        Create
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
         
            <th scope="col" width="150">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <ListProductScreen data={Toppings} onDelete={onHandleDelete} /> */}
          <TypesScreenAuth data={Types} onDelete={onHandleDelete} />
        </tbody>
      </table>
    </>
  );
};
export default ListTypesComponent;
