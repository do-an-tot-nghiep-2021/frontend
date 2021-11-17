import { useEffect, useState } from "react";
import { allcategory, removecategory } from "../../../../Api/category";
import CategoryScreenAuth from "../../screens/category/list";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { TokenAccount, SetUser } from "../../../../hooks/useAccount";

const CategoryListAuth = () => {
  const [Categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await allcategory();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const onHandleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Bạn có muốn xóa building này?',
        showCancelButton: true,
        confirmButtonText: 'Xóa!',
      }).then((result) => {
        if (result.isConfirmed) {
          const item = {
            id: id,
            token: TokenAccount.getToken(),
            user: SetUser.getUser()
          }
          removecategory(item)
          const newCategories = Categories.filter((item) => item.id !== id);
          Swal.fire('Thành công!', '', 'success')
          setCategories(newCategories);
        }
      })

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to="/admin/categories/create" className="btn btn-primary mb-2">
        Create
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col" width="200">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <CategoryScreenAuth data={Categories} onDelete={onHandleDelete} />
        </tbody>
      </table>
    </>
  );
};

export default CategoryListAuth;
