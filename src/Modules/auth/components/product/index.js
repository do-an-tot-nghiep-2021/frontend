import { useEffect, useState } from "react";
import { allproduct, removeproduct } from "../../../../Api/product";
import ListProductScreen from "../../screens/product/list";
import { Link } from "react-router-dom";

const ListProductComponent = () => {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await allproduct();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const onHandleDelete = async (id) => {
    try {
      await removeproduct(id);
      const newProducts = Products.filter((item) => item.id !== id);
      setProducts(newProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to="/admin/products/create" className="btn btn-primary mb-2">
        Create
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Topping</th>
            <th scope="col">Type</th>
            <th scope="col" width="100">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <ListProductScreen data={Products} onDelete={onHandleDelete} />
        </tbody>
      </table>
    </>
  );
};
export default ListProductComponent;
