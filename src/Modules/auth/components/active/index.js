import { useEffect, useState } from "react";
import { allactive, removeactive } from "../../../../Api/active";
import { Link } from "react-router-dom";
import ActiveScreenAuth from "../../screens/active/list";

const ListActiveComponent = () => {
  const [Actives, setActives] = useState([]);
  useEffect(() => {
    const getActives = async () => {
      try {
        const { data } = await allactive();
        setActives(data);
      } catch (error) {
        console.log(error);
      }
    };
    getActives();
  }, []);

  // console.log(Toppings);
  const onHandleDelete = async (id) => {
    try {
      await removeactive(id);
      const newActives = Actives.filter((items) => items.id !== id);
      setActives(newActives);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to="/admin/actives/create" className="btn btn-primary mb-2">
        Create
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col" width="150">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <ActiveScreenAuth data={Actives} onDelete={onHandleDelete} />
        </tbody>
      </table>
    </>
  );
};
export default ListActiveComponent;
